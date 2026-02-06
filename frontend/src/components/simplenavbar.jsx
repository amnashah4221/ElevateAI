import React from "react";
import Logo from "./logo";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
const SimpleNavbar = () => {


    return(
        <>
        <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container className="d-flex justify-content-between align-items-center">
         <Logo/>

          <Button as={Link} to="/" variant="dark"className="d-flex align-items-center gap-1">
            <IoMdArrowBack /> Back to Home
          </Button>
        </Container>
      </Navbar>
        </>

    )
}

export default SimpleNavbar;