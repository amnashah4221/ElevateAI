import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const Changepassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
    if (newPassword !== confirmPassword) {
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(data.message || "Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
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
            className="bg-dark text-white border-secondary shadow-none"
            style={{ borderRadius: "8px", padding: "10px 15px" }}
          />
        </Form.Group>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="newPassword">
              <Form.Label className="small">New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="bg-dark text-white border-secondary shadow-none"
                style={{ borderRadius: "8px", padding: "10px 15px" }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmPassword">
              <Form.Label className="small">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-dark text-white border-secondary shadow-none"
                style={{ borderRadius: "8px", padding: "10px 15px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          className="w-100 fw-bold py-2 mt-2 shine-btn"
          style={{ borderRadius: "15px", backgroundColor: "#3b82f6" }}
        >
          Update Password
          <span className="shine"></span>
        </Button>
      </Form>
    </div>
  );
};

export default Changepassword;