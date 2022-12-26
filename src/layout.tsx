import React from "react";
import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { State } from "./enum/state";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/product"}
              state={{ productState: State.ADD }}
            >
              Add Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
