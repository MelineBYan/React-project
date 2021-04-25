import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setClick, handleResize, resetNavbarData } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import styles from "./Navbar.module.css";

const HeaderBar = (props) => {
  const { state, setClick, handleResize, resetNavbarData } = props;
  const { width, clickMenuBars } = state;

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        handleResize(window.innerWidth)
      );
      resetNavbarData();
    };
  }, []);

  let cls = ["ml-auto"];
  width < 600 && cls.push("flex-column justify-content-center");
  const navItems = [
    {
      to: "/",
      value: "Home",
    },
    {
      to: "/contact",
      value: "Contact",
    },
    {
      to: "/about",
      value: "About",
    },
  ];

  const navItemsJSX = navItems.map((navItem, idx) => (
    <NavLink
      key={idx}
      to={navItem.to}
      className="nav-link"
      activeClassName={styles.active}
      exact={true}
    >
      {navItem.value}
    </NavLink>
  ));
  return (
    <Navbar bg="dark">
      <Link to="/" style={{ textDecoration: "none" }}>
        <FontAwesomeIcon
          icon={faTasks}
          style={{
            fontSize: "25px",
            color: "#007bff",
          }}
        />
        {width > 600 && <span className="text-primary h4 p-3">ToDo App</span>}
      </Link>
      {width > 600 || (width < 600 && clickMenuBars === true) ? (
        <Nav className={cls.join(" ")}>{navItemsJSX}</Nav>
      ) : (
        <Button
          variant="outline-dark"
          onClick={setClick}
          className="bg-dark ml-auto"
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{
              fontSize: "25px",
              color: "#007bff",
            }}
          />
        </Button>
      )}
    </Navbar>
  );
};

const mapStateToDispatch = (state) => {
  return {
    state: state.navbarReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleResize: (size) => dispatch(handleResize(size)),
    setClick: () => dispatch(setClick()),
    resetNavbarData: () => dispatch(resetNavbarData()),
  };
};

export default connect(mapStateToDispatch, mapDispatchToProps)(HeaderBar);
