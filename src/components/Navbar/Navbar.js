import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import styles from "./Navbar.module.css";

class HeaderBar extends React.Component {
  state = {
    width: window.innerWidth,
    clickMenuBars: false,
  };
  handleResize = () => {
    const clickMenuBars = this.state.width > 600 ? "false" : "true";
    this.setState({
      width: window.innerWidth,
      clickMenuBars,
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { width, clickMenuBars } = this.state;
    let cls = ["ml-auto"];
    width < 600 && cls.push("flex-column");

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
            onClick={() => this.setState({ clickMenuBars: true })}
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
  }
}

export default HeaderBar;
