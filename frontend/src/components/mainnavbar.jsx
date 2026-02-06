import React from "react";
import Logo from "./logo";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import "./mainnavbar.css";

const MainNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="nav-container">
        <div className="nav-pill-wrapper">
          <div className="d-flex align-items-center justify-content-between w-100 px-lg-2">
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center"
            >
              <Logo />
            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls="main-nav"
              className="custom-toggler border-0 shadow-none"
            />
          </div>

          <Navbar.Collapse id="main-nav" className="w-100">
            <Nav className="mx-auto nav-links-container py-3 py-lg-0">
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-item active-link" : "nav-item"
                }
              >
                <LayoutGrid size={20} /> Dashboard
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/myresumes"
                className={({ isActive }) =>
                  isActive ? "nav-item active-link" : "nav-item"
                }
              >
                <FileText size={20} /> My Resumes
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/analytics"
                className={({ isActive }) =>
                  isActive ? "nav-item active-link" : "nav-item"
                }
              >
                <BarChart3 size={20} /> Analytics
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/interview"
                className={({ isActive }) =>
                  isActive ? "nav-item active-link" : "nav-item"
                }
              >
                <MessageSquare size={20} /> Interview Prep
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-item active-link" : "nav-item"
                }
              >
                <User size={20} /> Profile
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/logout"
                className="d-lg-none text-danger mt-2 border-top pt-3 fw-bold"
              >
                <LogOut size={20} /> Logout
              </Nav.Link>
            </Nav>

            <div
              className="logout-section d-none d-lg-flex border-start ps-3 border-secondary me-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <LogOut size={22} className="text-secondary cursor-pointer" />
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
