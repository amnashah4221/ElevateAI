import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { IoMdArrowForward } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import React, { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
  const validate = ()=>{
    const newErrors = {};
    if(!email) newErrors.email ="Email is required";

    if(!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!validate()) return;

    try{
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {email, password},
        {withCredentials: true}
      );
      localStorage.setItem("accessToken", response.data.token);
      toast.success("Login Successful!");
      navigate('/dashboard');
    }
    catch(error){
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <div style={{minHeight: "100vh",display: "flex", flexDirection: "column",justifyContent: "center",
        alignItems: "center", paddingTop: "50px", paddingBottom: "50px" 
      }}>
        <Container className="d-flex flex-column align-items-center">
          <Logo />
          <h1 className="text-center mt-3 text-white">Welcome Back</h1>
          <p className="text-center mb-4" style={{color:"#c4c6cb"}}>Sign in to continue your account</p>
        </Container>

        <div
          style={{
            backgroundColor: "#111621", display:"flex", justifyContent: "center", alignItems:"center",
            width: "100%"
          }}
        >
          <Container className="d-flex justify-content-center" >
            <div
              className="p-4 w-100"
              style={{
                maxWidth: "400px", width: "100%",border: "1px solid #747475",  borderRadius: "15px",
              backgroundColor: "#121825", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)", color: "#c4c6cb"
              }}
            >
              <Form onSubmit={handleSubmit}>
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
                          isInvalid={!!errors.email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="bg-dark text-white border-secondary"
                      />
                      <Form.Control.Feedback type="invalid">
  {errors.email}
</Form.Control.Feedback>

                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                          <div className="d-flex align-items-center gap-2 mb-1">
                    <MdLockOutline />
                    <Form.Label>Password</Form.Label>
                  </div>
                  <div style={{position: "relative"}}>
                       <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                          isInvalid={!!errors.password}
                        onChange={(e)=>setPassword(e.target.value)}
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
               
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="px-5 py-2 shine-btn"
                    style={{
                      borderRadius: "25px",
                      background: "linear-gradient(to right, #5778f3, #8367ef)",
                      border: "none"
                    }}
                  >
                    Sign In <IoMdArrowForward />{" "}
                    <span className="shine"></span>
                  </Button>
                </div>
              </Form>
              <p className="text-center mt-3" style={{color: "c4c6cb", fontSize: "13px"}}>
                Don't have an account?{" "}
                <Link to="/signup" className="fw-semibold " style={{textDecoration: "none", color: "#5778f3"}}>
                  Sign up free
                </Link>
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Login;
