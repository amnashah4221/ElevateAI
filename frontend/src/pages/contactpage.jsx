import React, { useState } from "react";
import {  Container, Button, Form, Row, Col } from "react-bootstrap";
import Footer from "../components/footer";
import SimpleNavbar from "../components/simplenavbar";
import "./footerlinks.css";
import { toast } from "react-toastify";
import axios from "axios";

const Contactpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = ()=> {
    const newErrors = {};

    if(!name.trim()) newErrors.name = "Name is required";
    else if (name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

     const emailRegex = /\S+@\S+\.\S+/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if(!subject.trim()) newErrors.subject = "Subject is required";

    if(!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!validate()) return;

    try{
      await axios.post(
        "http://localhost:5000/api/contact/contact",
        {name, email, subject, message}, 
        {withCredentials: true}
      )

      toast.success("Message Sent");
      setEmail("");
      setName("");
      setSubject("");
      setMessage("");
    }
    catch(error){
      toast.error(error.response?.data?.message || "Server Error")
    }
  }
  
  return (
    <>
    <SimpleNavbar/>
      <div style={{ marginTop: "80px", backgroundColor: "#111621" }} className="py-5">
        <Container className="d-flex justify-content-center text-center">
          <div className="card p-4" style={{ background: "none" }}>
            <h1 style={{fontSize: "44px", fontWeight: "bolder", marginBottom: "20px", color: "#f0f2f5"}}>
              {" "}Get in Touch{" "}
            </h1>
            <p style={{ fontSize: "20px", marginBottom: "20px", color: "#c4c6cb", padding: "0% 10%"}}>
              Have questions about ElevateAI? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </div>

      <div style={{  backgroundColor: "#111621", marginTop: "-40px", marginBottom:"40px"}}>
        <Container className="d-flex justify-content-center">
          <div className="p-4 w-100" style={{ maxWidth: "800px", border: "1px solid #747475",  borderRadius: "15px",
              backgroundColor: "#121825", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)", color: "#c4c6cb"}}>
            <Form onSubmit={handleSubmit}>
               <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className="bg-dark text-light border-secondary"/>
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value ={email}
                    onChange={(e)=> setEmail(e.target.value)}
                      className="bg-dark text-light border-secondary"/>
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" value={subject}
                onChange={(e)=> setSubject(e.target.value)}
                  className="bg-dark text-light border-secondary"/>
                  {errors.subject && <small className="text-danger">{errors.subject}</small>}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Write your message..." value={message}
                onChange={(e)=> setMessage(e.target.value)}
                  className="bg-dark text-light border-secondary"/>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="px-5 py-2 shine-btn"
                  style={{ borderRadius: "25px", background: "linear-gradient(to right, #5778f3, #8367ef)",
                    border: "none"  }}>
                  Send Message <span className="shine"></span>
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Contactpage;
