import MainNavbar from "../components/mainnavbar";
import { Container, Row, Col, ToastContainer } from "react-bootstrap";
import {
  FaAward,
  FaBullseye,
  FaChartLine,
  FaTrophy,
  FaDumbbell,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Targetroles from "../components/targetRoles";
import Profilesection from "../components/profileSection";
import { useEffect, useState } from "react";
import axios from "axios";

const Profilepage = () => {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name: userData.name || "Username",
    bio: userData.bio || "",
    experienceLevel: userData.experienceLevel || "Entry Level (0-2 years)",
    targetRoles: userData.targetRoles || []
  })

  const [newRole, setNewRole] = useState("");
  const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const response = await axios.get(
          "http://localhost:5000/api/auth/getProfile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = response.data;
        setUserData({
          name: data.name || "User",
          bio: data.bio || "No bio added yet",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      } catch (error) {
        console.error("Error fetching full profile", error);
        toast.error("Could not load profile details");
      }
    };
    fetchFullProfile();
  }, []);

  const calculateCompletion = () => {
    const fields = [
      userData.name,
      userData.bio && userData.bio !== "No bio added yet",
      userData.profilePic,
      userData.targetRoles && userData.targetRoles.length > 0,
    ];
    const filledFields = fields.filter(Boolean).length;

    return Math.round((filledFields / fields.length) * 100);
  };

  const completionValue = calculateCompletion();

  const achievements = [
    {
      icon: <FaBullseye color="#ff4d4d" />,
      title: "First Analysis",
      desc: "Complete your first resume analysis",
    },
    {
      icon: <FaChartLine color="#5bc0de" />,
      title: "Score Climber",
      desc: "Improve your score by 10+ points",
    },
    {
      icon: <FaTrophy color="#f1b31c" />,
      title: "Elite Score",
      desc: "Reach 90+ ATS score",
    },
    {
      icon: <FaDumbbell color="#a67c52" />,
      title: "Practice Pro",
      desc: "Practice 50 interview questions",
    },
  ];

  return (
    <>
      <MainNavbar />
      <ToastContainer theme="dark" position="top-right" />
      <div
        style={{
          minHeight: "100vh",
          marginTop: "100px",
          backgroundColor: "#111621",
        }}
        className="py-5"
      >
        <Container className="d-flex justify-content-center mb-4">
         <Profilesection/>
        </Container>
        <Container className="d-flex justify-content-center mb-4">
          <Row className="w-100 g-3" style={{ maxWidth: "850px" }}>
            {[
              { label: "Highest ATS Score", value: "—" },
              { label: "Resumes Analyzed", value: "0" },
              { label: "Questions Practiced", value: "0" },
            ].map((item, index) => (
              <Col key={index} xs={12} md={4}>
                <div
                  className="text-center p-4"
                  style={{
                    backgroundColor: "#121825",
                    border: "1px solid #2d343f",
                    borderRadius: "20px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#fff",
                      marginBottom: "5px",
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#747475",
                      fontWeight: "500",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        //Targetroles
        <Container className="d-flex justify-content-center mb-4">
          <Targetroles />
        </Container>
        <Container className="d-flex justify-content-center">
          <div
            className="p-4 w-100"
            style={{
              maxWidth: "850px",
              border: "1px solid #2d343f",
              borderRadius: "20px",
              backgroundColor: "#121825",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
              color: "#fff",
            }}
          >
            <div className="d-flex align-items-center mb-4 px-2">
              <FaAward
                style={{
                  color: "#f1b31c",
                  fontSize: "1.4rem",
                  marginRight: "12px",
                }}
              />
              <h4
                className="mb-0"
                style={{ fontWeight: "600", fontSize: "1.25rem" }}
              >
                Achievements{" "}
              </h4>
            </div>

            <Row className="g-3">
              {achievements.map((item, index) => (
                <Col key={index} xs={12} md={6}>
                  <div
                    className="d-flex align-items-center p-3"
                    style={{
                      backgroundColor: "#1a212d",
                      border: "1px solid #232a37",
                      borderRadius: "15px",
                      height: "100%",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <div
                      className="me-3 fs-3 d-flex align-items-center justify-content-center"
                      style={{ minWidth: "40px" }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "1rem",
                          color: "#e0e0e0",
                          marginBottom: "2px",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          fontSize: "0.95rem",
                          color: "#747475",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Profilepage;
