import { useEffect, useState, useCallback, useMemo, Suspense, lazy } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaAward, FaBullseye, FaChartLine, FaTrophy, FaDumbbell } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import MainNavbar from "../components/mainnavbar"; 
import Targetroles from "../components/targetRoles"; 
import Profilesection from "../components/profileSection/profileSection";

const Editmodal = lazy(() => import("../components/profileSection/editmodal"));

const Profilepage = () => {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [experienceOptions, setExperienceOptions] = useState([]);

  const fetchFullProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const [profileRes, expRes] = await Promise.all([
        axios.get("http://localhost:5000/api/auth/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/auth/getexplevel"),
      ]);

      const data = profileRes.data;
      setUserData({
        ...data,
        bio: data.bio || "No bio added yet",
        name: data.name || "User",
        targetRoles: data.targetRoles || [],
        profilePic: data.profilePic || "",
        experienceLevel: data.experienceLevel || "Entry Level (0-2 years)",
      });

      setExperienceOptions(expRes.data.levels || []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load profile details");
    }
  };

  useEffect(() => {
    fetchFullProfile();
  }, []);

  const handleShow = useCallback(() => {
    setEditData({ ...userData });
    setShowModal(true);
  }, [userData]);

  const completionValue = useMemo(() => {
    const fields = [
      userData.name,
      userData.bio && userData.bio !== "No bio added yet",
      userData.profilePic,
      userData.targetRoles?.length > 0,
      userData.experienceLevel,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100) || 0;
  }, [userData]);

  const achievements = [
    { icon: <FaBullseye color="#ff4d4d" />, title: "First Analysis", desc: "Complete your first resume analysis" },
    { icon: <FaChartLine color="#5bc0de" />, title: "Score Climber", desc: "Improve your score by 10+ points" },
    { icon: <FaTrophy color="#f1b31c" />, title: "Elite Score", desc: "Reach 90+ ATS score" },
    { icon: <FaDumbbell color="#a67c52" />, title: "Practice Pro", desc: "Practice 50 interview questions" },
  ];

  return (
    <>
      <MainNavbar />
      <div style={{ minHeight: "100vh", marginTop: "100px", backgroundColor: "#111621" }} className="py-5">
        <Container className="d-flex justify-content-center mb-4">
          <Profilesection
            userData={userData}
            setUserData={setUserData}
            showModal={showModal}
            setShowModal={setShowModal}
            editData={editData}
            setEditData={setEditData}
            completionValue={completionValue}
            handleShow={handleShow}
          />
        </Container>

        <Container className="d-flex justify-content-center mb-4">
          <Row className="w-100 g-3" style={{ maxWidth: "850px" }}>
            {[
              { label: "Highest ATS Score", value: "—" },
              { label: "Resumes Analyzed", value: "0" },
              { label: "Questions Practiced", value: "0" },
            ].map((item, index) => (
              <Col key={index} xs={12} md={4}>
                <div className="text-center p-4" style={{ backgroundColor: "#121825", border: "1px solid #2d343f", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)", height: "100%" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#fff", marginBottom: "5px" }}>{item.value}</div>
                  <div style={{ fontSize: "0.85rem", color: "#747475", fontWeight: "500" }}>{item.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="d-flex justify-content-center mb-4">
          <Targetroles 
            initialRoles={userData.targetRoles} 
            onUpdate={(newRoles) => setUserData({ ...userData, targetRoles: newRoles })}
          />
        </Container>

        <Container className="d-flex justify-content-center">
          <div className="p-4 w-100" style={{ maxWidth: "850px", border: "1px solid #2d343f", borderRadius: "20px", backgroundColor: "#121825", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)", color: "#fff" }}>
            <div className="d-flex align-items-center mb-4 px-2">
              <FaAward style={{ color: "#f1b31c", fontSize: "1.4rem", marginRight: "12px" }} />
              <h4 className="mb-0" style={{ fontWeight: "600", fontSize: "1.25rem" }}>Achievements</h4>
            </div>
            <Row className="g-3">
              {achievements.map((item, index) => (
                <Col key={index} xs={12} md={6}>
                  <div className="d-flex align-items-center p-3" style={{ backgroundColor: "#1a212d", border: "1px solid #232a37", borderRadius: "15px", height: "100%", transition: "transform 0.2s ease" }}>
                    <div className="me-3 fs-3 d-flex align-items-center justify-content-center" style={{ minWidth: "40px" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "1rem", color: "#e0e0e0", marginBottom: "2px" }}>{item.title}</div>
                      <div style={{ fontSize: "0.95rem", color: "#747475", lineHeight: "1.3" }}>{item.desc}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Editmodal
            showModal={showModal}
            setShowModal={setShowModal}
            editData={editData}
            setEditData={setEditData}
            setUserData={setUserData}
            userData={userData}
            experienceOptions={experienceOptions}
          />
        </Suspense>
      )}
    </>
  );
};

export default Profilepage;