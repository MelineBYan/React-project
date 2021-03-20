import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./Navbar.module.css";

const HeaderBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <Link to="/" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon
            icon={faTasks}
            style={{
              fontSize: "25px",
              color: "#007bff",
            }}
          />
          <span className="text-primary h4 p-3">ToDo App</span>
        </Link>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <NavLink
          to="/"
          className="nav-link"
          activeClassName={styles.active}
          exact
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className="nav-link"
          activeClassName={styles.active}
          exact
        >
          Contacts
        </NavLink>
        <NavLink
          to="/about"
          className="nav-link"
          activeClassName={styles.active}
          exact
        >
          About
        </NavLink>
      </Nav>
    </Navbar>
  );
};
export default HeaderBar;
