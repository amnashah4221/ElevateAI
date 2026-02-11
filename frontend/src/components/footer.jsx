import React from "react";

import { LuSparkles } from "react-icons/lu";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = ()=>{

    return(
        <>
         <footer className="py-3 mt-2" style={{backgroundColor: "none"}}>
        <Container>
          <Row>
            <Col md={6} className="d-flex align-items-center gap-2 text-light">
              <div className="logobox d-flex justify-content-center align-items-center">
                <LuSparkles className="logo" />
              </div>
              <span>© 2024 ElevateAI. All rights reserved.</span>
            </Col>

            <Col md={6} className="d-flex justify-content-end gap-3 align-items-center">
              <Link to="/privacy" className="link" onClick={() => window.scrollTo(0, 0)}>
                Privacy
              </Link>
              <Link to="/terms" className="link" onClick={() => window.scrollTo(0, 0)}>
                Terms
              </Link>
              <Link to="/contact"className="link" onClick={() => window.scrollTo(0, 0)}>
                Contact
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>
        </>
    )
}
export default Footer;