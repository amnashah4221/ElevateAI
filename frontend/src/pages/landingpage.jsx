import React from "react";
import Footer from '../components/footer';
import { Navbar, Nav, Container,Button,Card,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { SiGoogledocs } from "react-icons/si";
import { Fa1 } from "react-icons/fa6";
import { Fa2 } from "react-icons/fa6";
import { Fa3 } from "react-icons/fa6";
import Logo from '../components/logo';
import "./landingpage.css";
const Landingpage = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
           <Logo/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto text-center">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#howitworks">How it Works</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
              <Button as={Link} to="/login"className="navlogin bg-transparent text-light"> Log In </Button>

              <Button as={Link}to="/signup"className="navsignup shine-btn text-light">
                Get Started Free <span className="shine"></span> 
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="hero-section py-5">
        <Container className="text-center">
          <div className="hero-content mx-auto">
            <h3 className="maintag d-inline-flex align-items-center gap-2 mt-5">
              <BsFillLightningChargeFill className="tag-icon" />
              AI-Powered Resume Intelligence
            </h3>

            <h1 className="mainhead">
              Land Your Dream Job with an <span className="headshine"> ATS-Optimized </span> Resume
            </h1>

            <p className="lead text-secondary hero-text mx-auto"> 
              Stop getting rejected by applicant tracking systems. Our AI
              analyzes your resume, identifies gaps, and helps you stand out to
              recruiters.
            </p>

            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
              <Button as={Link} to="/signup" className="navsignup shine-btn text-light px-4 px-md-5 py-3 fs-5">
                Start Free Analysis <span className="shine"></span>
              </Button>

              <Button as={Link} to="/login" className="navlogin fs-5 bg-transparent text-light">
                I have an account
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="features" className="py-5">
        <Container>
          <h2 className="head text-center text-white">
            Everything You Need to <span className="headshine"> Succeed</span>
          </h2>

          <p className="tagline text-center mx-auto">
            Comprehensive tools designed to maximize your chances of landing interviews
          </p>

          <Row className="g-4 mt-4">
            <Col xs={12} sm={6} lg={3}>
              <Card className="feature-card h-100 text-center border-0">
                <Card.Body className="p-4">
                  <div className="feature-icon mx-auto mb-3">
                    <SiGoogledocs />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    AI Resume Analysis
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Get instant ATS compatibility scores and actionable
                    improvement suggestions
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} lg={3}>
              <Card className="feature-card h-100 text-center border-0">
                <Card.Body className="p-4">
                  <div className="feature-icon mx-auto mb-3">
                    <GoGoal />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    Skill Gap Detection
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Identify missing skills that employers are actively looking for
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} lg={3}>
              <Card className="feature-card h-100 text-center border-0">
                <Card.Body className="p-4">
                  <div className="feature-icon mx-auto mb-3">
                    <FiMessageSquare />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    Interview Preparation
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Practice with AI-generated questions tailored to your target role
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} lg={3}>
              <Card className="feature-card h-100 text-center border-0">
                <Card.Body className="p-4">
                  <div className="feature-icon mx-auto mb-3">
                    <FaRegChartBar />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    Progress Tracking
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Monitor your improvement over time with detailed analytics
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="howitworks" className="py-5">
        <Container>
          <h2 className="head text-center mb-5 text-white">
            How it <span className="headshine">Works?</span>
          </h2>

          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="how-card text-center h-100 border-0">
                <Card.Body className="p-4">
                  <div className="how-icon mx-auto mb-3">
                    <Fa1 />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    Upload Resume
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Drop your resume and enter your target role
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="how-card text-center h-100 border-0">
                <Card.Body className="p-4">
                  <div className="how-icon mx-auto mb-3">
                    <Fa2 />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    AI Analysis
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Our AI scans and evaluates your resume instantly
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="how-card text-center h-100 border-0">
                <Card.Body className="p-4">
                  <div className="how-icon mx-auto mb-3">
                    <Fa3 />
                  </div>
                  <Card.Title className="fw-bold text-light">
                    Get Results
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    Receive actionable insights and start improving
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="pricing" className="py-5">
        <Container>
          <div className="pricecon text-center mx-auto p-4 p-md-5">
            <h2 className="fw-bold display-6 display-md-5 text-white">
              Ready to Transform Your Career?
            </h2>

            <p className="lead text-secondary mx-auto pricing-text">
              Join thousands of job seekers who've improved their resumes and landed their dream jobs.
            </p>

            <Button as={Link} to="/signup" className="navsignup shine-btn text-light px-4 px-md-5 py-3 fs-5 mt-3">
              Get Started Free <FaArrowRight /> <span className="shine"></span>
            </Button>

            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4 text-secondary small">
              <span>✔ No credit card required</span>
              <span>✔ Free forever plan</span>
            </div>
          </div>
        </Container>
      </section>

     <Footer/>
    </>
  );
};
export default Landingpage;
