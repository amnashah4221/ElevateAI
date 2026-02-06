import MainNavbar from "../components/mainnavbar";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaAward,
  FaBullseye,
  FaChartLine,
  FaTrophy,
  FaDumbbell,
  FaBriefcase,
  FaPlus,
} from "react-icons/fa";
import { FaEdit, FaCalendarAlt, FaClock } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profilepage = () => {
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

      <div
        style={{
          minHeight: "100vh",
          marginTop: "100px",
          backgroundColor: "#111621",
        }}
        className="py-5"
      >
        <Container className="d-flex justify-content-center mb-4">
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
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  A
                </div>
                <div>
                  <h3 className="mb-0" style={{ fontWeight: "700" }}>
                    Amnashah4221
                  </h3>
                  <p
                    style={{
                      color: "#747475",
                      fontStyle: "italic",
                      marginBottom: "0",
                    }}
                  >
                    No bio added yet
                  </p>
                </div>
              </div>

              <div className="text-center" style={{ minWidth: "150px" }}>
                <div style={{ width: 80, height: 80, margin: "0 auto 10px" }}>
                  <CircularProgressbar
                    value={15}
                    text={`15%`}
                    styles={buildStyles({
                      textSize: "22px",
                      pathColor: `#ff4d4d`,
                      textColor: "#fff",
                      trailColor: "#1a212d",
                    })}
                  />
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#747475",
                    marginBottom: "10px",
                  }}
                >
                  Complete your profile
                </p>
                <button
                  className="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center w-100"
                  style={{
                    borderRadius: "20px",
                    borderColor: "#2d343f",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaEdit className="me-2" /> Edit Profile
                </button>
              </div>
            </div>

            <hr style={{ borderTop: "1px solid #2d343f", margin: "20px 0" }} />
            <div
              className="d-flex gap-4"
              style={{ color: "#747475", fontSize: "0.85rem" }}
            >
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2" /> Created: Feb 5, 2026, 08:56
                PM
              </div>
              <div className="d-flex align-items-center">
                <FaClock className="me-2" /> Updated: Feb 5, 2026, 08:56 PM
              </div>
            </div>
          </div>
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

        <Container className="d-flex justify-content-center mb-4">
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
            <div className="d-flex align-items-center  justify-content-between mb-4 px-2">
              <div className="d-flex align-items-center">
                <FaBriefcase
                  style={{
                    color: "#3b82f6",
                    fontSize: "1.4rem",
                    marginRight: "12px",
                  }}
                />
                <h4
                  className="mb-0"
                  style={{ fontWeight: "600", fontSize: "1.25rem" }}
                >
                  Target Roles
                </h4>
              </div>
              <button
                className="btn btn-link text-decoration-none p-0"
                style={{
                  color: "#3b82f6",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <FaPlus size={12} className="me-1" /> Add Role
              </button>
            </div>
            <div className="text-center py-4">
              <p
                style={{
                  color: "#747475",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
              >
                No target roles added yet. Add roles to get tailored
                recommendations.
              </p>
            </div>
          </div>
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
