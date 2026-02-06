import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { IoMdArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    else if (name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, number & special char";

    if (!role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );

      toast.success("Signup Successful!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      if (message.includes("User already exists")) {
      setErrors({ email: "This email is already registered." });
    } else {
      toast.error(message);
    }
      
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Container className="d-flex flex-column align-items-center">
        <Logo />
        <h1 className="text-center mt-3 text-white">Create Your Account</h1>
        <p className="text-center mb-4" style={{ color: "#c4c6cb" }}>
          Start optimizing your resume in minutes
        </p>
      </Container>

      <div
        style={{
          backgroundColor: "#111621",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Container className="d-flex justify-content-center">
          <div
            className="p-4 w-100"
            style={{
              maxWidth: "400px",
              border: "1px solid #747475",
              borderRadius: "15px",
              backgroundColor: "#121825",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
              color: "#c4c6cb",
            }}
          >
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2 mb-1 ">
                      <FaUser />
                      <Form.Label>Full Name</Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!errors.name}
                      className="bg-dark text-light border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Email */}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <HiOutlineMail />
                      <Form.Label>Email</Form.Label>
                    </div>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                      className="bg-dark text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Password */}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <MdLockOutline />
                      <Form.Label>Password</Form.Label>
                    </div>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                        className="bg-dark text-light border-secondary"
                        style={{ paddingRight: "40px" }}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "35px",
                          backgroundImage:"none",
                          top:"18px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#c4c6cb",
                          zIndex: 10,
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18}/>}
                      </span>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              {/* Role */}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <div className="d-flex gap-3 mt-2">
                      <FaUserCheck />
                      <Form.Label>Role</Form.Label>
                      <Form.Check
                        type="radio"
                        label="Admin"
                        name="role"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                        value="admin"
                        id="roleAdmin"
                      />
                      <Form.Check
                        type="radio"
                        label="User"
                        name="role"
                        checked={role === "user"}
                        onChange={(e) => setRole(e.target.value)}
                        value="user"
                        id="roleUser"
                      />
                    </div>
                    {errors.role && (
                      <div className="text-danger" style={{ fontSize: "0.9rem" }}>
                        {errors.role}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit */}
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4 text-secondary small">
                <span>✔ No credit card required</span>
                <span>✔ Free forever plan</span>
              </div>
              <div className="text-center mt-4">
                <Button
                  type="submit"
                  className="px-5 py-2 shine-btn"
                  style={{
                    borderRadius: "25px",
                    background: "linear-gradient(to right, #5778f3, #8367ef)",
                    border: "none",
                  }}
                >
                  Create Account <IoMdArrowForward />
                  <span className="shine"></span>
                </Button>
              </div>
            </Form>

            <p className="text-center mt-3" style={{ color: "c4c6cb", fontSize: "13px" }}>
              By signing up, you agree to our{" "}
              <Link to="/terms" className="fw-semibold" style={{ textDecoration: "none", color: "#5778f3" }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="fw-semibold" style={{ textDecoration: "none", color: "#5778f3" }}>
                Privacy Policy
              </Link>
            </p>

            <p className="text-center mt-3" style={{ color: "c4c6cb", fontSize: "13px" }}>
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold" style={{ textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
