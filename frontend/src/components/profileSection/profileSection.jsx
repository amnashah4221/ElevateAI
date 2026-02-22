import React from "react";
import { FaEdit, FaCalendarAlt, FaClock } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Profilesection = ({ userData, setShowModal, setEditData, completionValue }) => {

  const handleShow = () => {
    setEditData({ ...userData });
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getImageSrc = (pic) => {
    if (!pic) return null;
    if (pic.startsWith("data:image") || pic.startsWith("http")) return pic;
    return `http://localhost:5000/${pic}`;
  };

  return (
    <div
      className="p-4 w-100 shadow-lg"
      style={{
        maxWidth: "850px",
        border: "1px solid #2d343f",
        borderRadius: "20px",
        backgroundColor: "#121825",
        color: "#fff",
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <div
            style={{
              width: "120px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: "bold",
              marginRight: "25px",
              overflow: "hidden",
              border: "4px solid #1a212d",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            }}
          >
            {userData.profilePic ? (
              <img
                src={getImageSrc(userData.profilePic)}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              userData.name?.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2 className="mb-1 fw-bold">{userData.name || "User"}</h2>
            <p className="fst-italic mb-2" style={{ color: "#b0b3b8" }}>
              {userData.bio || "No bio added yet"}
            </p>
            <div className="d-flex align-items-center" style={{ color: "#747475", fontSize: "0.95rem" }}>
              <span className="me-2" style={{ opacity: 0.8 }}>💼</span>
              <span>{userData.experienceLevel || "Experience not set"}</span>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center" style={{ minWidth: "160px" }}>
          <div className="position-relative mb-4" style={{ width: 90, height: 90 }}>
            <CircularProgressbar
              value={completionValue}
              styles={buildStyles({
                textSize: "22px",
                pathColor: completionValue < 50 ? "#ff4d4d" : "#007bff",
                trailColor: "#1a212d",
                strokeLinecap: "round",
              })}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              {completionValue}%
            </div>

            <div
              className="text-center mt-1"
              style={{ fontSize: "0.75rem", color: "#747475", width: "100%" }}
            >
              {completionValue > 50 ? "Good progress" : "Profile incomplete"}
            </div>
          </div>

          <button
            className="btn btn-outline-light btn-sm rounded-pill px-4 py-2 border-secondary d-flex align-items-center mt-4"
            style={{
              backgroundColor: "#5778f3",
              transition: "0.3s",
              fontSize: "0.9rem",
              color: "white",
            }}
            onClick={handleShow}
          >
            <FaEdit className="me-2" /> Edit Profile
          </button>
        </div>
      </div>

      <hr className="my-4" style={{ borderColor: "#2d343f", opacity: 0.5 }} />

      <div className="d-flex flex-wrap gap-4 small" style={{ color: "#747475" }}>
        <span>
          <FaCalendarAlt className="me-2" /> Created: {formatDate(userData.createdAt)}
        </span>
        <span>
          <FaClock className="me-2" /> Updated: {formatDate(userData.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default Profilesection;