import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import {
  FaEdit,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaTrashAlt
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

const Profilesection = () => {
  const [userData, setUserData] = useState({});
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    bio: "",
    experienceLevel: "",
    targetRoles: [],
    profilePic: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // --- Helper: Format Date ---
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

  // --- API: Fetch Profile ---
  const fetchFullProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/getProfile",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserData(data);
    } catch (error) {
      toast.error("Could not load profile details");
    }
  };

  useEffect(() => {
    fetchFullProfile();
  }, []);

  useEffect(() => {
    const fetchExperienceLevel = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/getexplevel",
        );
        setExperienceOptions(data.levels);
      } catch (error) {
        console.error("Failed to load experience levels", error);
      }
    };
    fetchExperienceLevel();
  }, []);
  // --- Logic: Profile Completion ---
  const completionValue = (() => {
    const fields = [
      userData.name,
      userData.bio && userData.bio !== "No bio added yet",
      userData.profilePic,
      userData.targetRoles?.length > 0,
      userData.experienceLevel,
    ];
    return (
      Math.round((fields.filter(Boolean).length / fields.length) * 100) || 0
    );
  })();

  // --- Handlers: Modal & Input ---
  const handleShow = () => {
    setEditData({
      name: userData.name || "",
      bio: userData.bio || "",
      experienceLevel: userData.experienceLevel || "Entry Level (0-2 years)",
      targetRoles: userData.targetRoles || [],
      profilePic: userData.profilePic || "",
    });
    setShowModal(true);
  };

  const addRole = () => {
    if (
      currentInput.trim() &&
      !editData.targetRoles.includes(currentInput.trim())
    ) {
      setEditData({
        ...editData,
        targetRoles: [...editData.targetRoles, currentInput.trim()],
      });
      setCurrentInput("");
    }
  };

  const removeRole = (roleToRemove) => {
    setEditData({
      ...editData,
      targetRoles: editData.targetRoles.filter((r) => r !== roleToRemove),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setEditData({ ...editData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/updateprofile",
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserData(data);
      setShowModal(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const getImageSrc = (pic) => {
    if (!pic) return null;

    if (pic.startsWith("data:image")) {
      return pic; // base64 image
    }

    if (pic.startsWith("http")) {
      return pic; // full URL
    }

    return `http://localhost:5000/${pic}`; // backend path
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (newPassword != confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    if (newPassword.length < 8) {
      return toast.error("New password must be at least 8 characters");
    }

    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(
        "http://localhost:5000/api/auth/changepassword",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message || "Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is permanent and cannot be undone!",
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("accessToken");

        const { data } = await axios.delete(
          "http://localhost:5000/api/auth/deleteaccount",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        toast.success(data.message || "Account deleted successfully");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setTimeout(() => {
          window.location.href("/login");
        }, 2000);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to delete account. Please try again.",
        );
      }
    }
  };

  return (
    <>
      {/* Main Profile Card */}
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
                borderRadius: "50%",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              }}
            >
              {userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                userData.name?.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h2 className="mb-1 fw-bold" style={{ letterSpacing: "-0.5px" }}>
                {userData.name || "User"}
              </h2>
              <p
                className="fst-italic mb-2"
                style={{ color: "#b0b3b8", fontSize: "1.1rem" }}
              >
                {userData.bio || "No bio added yet"}
              </p>

              <div
                className="d-flex align-items-center"
                style={{ color: "#747475", fontSize: "0.95rem" }}
              >
                <span className="me-2" style={{ opacity: 0.8 }}>
                  💼
                </span>
                <span>{userData.experienceLevel || "Experience not set"}</span>
              </div>
            </div>
          </div>

          <div
            className="d-flex flex-column align-items-center align-items-md-end"
            style={{ minWidth: "160px" }}
          >
            <div
              className="position-relative mb-3"
              style={{ width: 90, height: 90 }}
            >
              <CircularProgressbar
                value={completionValue}
                text={`${completionValue}%`}
                styles={buildStyles({
                  textSize: "22px",
                  pathColor: completionValue < 50 ? "#ff4d4d" : "#007bff",
                  textColor: "#fff",
                  trailColor: "#1a212d",
                  strokeLinecap: "round",
                })}
              />
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

        <div
          className="d-flex flex-wrap gap-4 small"
          style={{ color: "#747475" }}
        >
          <span>
            <FaCalendarAlt className="me-2" /> Created:{" "}
            {formatDate(userData.createdAt)}
          </span>
          <span>
            <FaClock className="me-2" /> Updated:{" "}
            {formatDate(userData.updatedAt)}
          </span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        contentClassName="bg-dark text-white border-secondary rounded-4 shadow"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-0 px-4 pt-4"
        >
          <Modal.Title className="fw-bold">Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4">
          <div className="text-center mb-4">
            <div
              className="position-relative d-inline-block"
              onClick={() => document.getElementById("fileInput").click()}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "#2d343f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  overflow: "hidden",
                  border: "3px solid #2575fc",
                }}
              >
                {editData.profilePic ? (
                  <img
                    src={getImageSrc(editData.profilePic)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  editData.name?.charAt(0)
                )}
              </div>
              <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1 px-2 small">
                <FaPlus size={10} />
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label className="small">Full Name</Form.Label>
                <Form.Control
                  className="bg-dark text-white border-secondary shadow-none"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="small ">Experience Level</Form.Label>
                <Form.Select
                  className="bg-dark text-white border-secondary shadow-none"
                  value={editData.experienceLevel}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      experienceLevel: e.target.value,
                    })
                  }
                >
                  {experienceOptions.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small ">Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className="bg-dark text-white border-secondary shadow-none"
                value={editData.bio}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small ">Target Roles</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Press Enter to add role"
                  className="bg-dark text-white border-secondary shadow-none"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addRole()}
                />
                <Button variant="primary" onClick={addRole}>
                  <FaPlus />
                </Button>
              </div>
            </Form.Group>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {editData.targetRoles.map((role, idx) => (
                <Badge
                  key={idx}
                  bg="secondary"
                  className="p-2 fw-normal d-flex align-items-center gap-2"
                >
                  {role}{" "}
                  <FaTimes
                    onClick={() => removeRole(role)}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
              ))}
            </div>
          </Form>
          <Modal.Footer className="border-0 px-4 pb-4">
            <Button
              variant="primary"
              className="w-100 rounded-pill fw-bold py-2 shine-btn"
              onClick={handleSave}
            >
              Save Changes <span className="shine"></span>
            </Button>
          </Modal.Footer>

          <div className="p-2 w-100 shadow-lg mt-4">
            <h4 className="fw-bold mb-4">Change Password</h4>

            <Form onSubmit={handlePasswordUpdate}>
              <Form.Group className="mb-4" controlId="currentPassword">
                <Form.Label className="small">Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="bg-dark text-white shadow-none border-secondary shadow-none"
                  style={{
                    border: "1px solid #2d343f",
                    borderRadius: "8px",
                    padding: "10px 15px",
                  }}
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="newPassword" className="mb-3 mb-md-0">
                    <Form.Label className="small">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="bg-dark text-white shadow-none border-secondary shadow-none"
                      style={{
                        border: "1px solid #2d343f",
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label className="small">
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="bg-dark text-white border-secondary shadow-none"
                      style={{
                        border: "1px solid #2d343f",
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold py-2 shadow-sm border-0 mt-2 shine-btn"
                style={{ borderRadius: "15px", backgroundColor: "#3b82f6" }}
              >
                Update Password <span className="shine"></span>
              </Button>
            </Form>
          </div>

          {/* 3. DANGER ZONE (Delete Account Section) */}
          <div
  className="p-2 w-100 shadow-lg mt-4" // Padding p-2 se p-4 kar di hai behtar look ke liye
  style={{
    maxWidth: "850px",
    borderRadius: "20px",// Consis, // Halka red border warning ke liye
    color: "#fff",
  }}
>
  <div className="d-flex align-items-center mb-3">
    <h4 className="fw-bold mb-0 text-danger">Danger Zone</h4>
  </div>

  <div
    className="p-2 rounded-3"
  >
    <div className="mb-3 text-center text-md-start">
      <p className="small mb-0">
        Once you delete your account, there is no going back. Please be certain before proceeding.
      </p>
    </div>

     <Button
      className="fw-bold py-2 w-100 bg-dark" 
      style={{
        borderRadius: "12px",
        border: "1px solid #dc3545",
        color: "#dc3545",
        fontSize: "0.95rem",
      }}
      onClick={handleDeleteAccount}
    >
      <FaTrashAlt className="me-2" /> Delete My Account
    </Button>
  </div>
</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profilesection;
