import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import notFound from "../../../assets/images/error-404.jpg";
import server from "../../../assets/images/error-500.png";

class Error extends React.Component {
  render() {
    const { type } = this.props.match.params;
    const errorImage = type === "404" ? notFound : server;
    const errorMessage =
      type === "404"
        ? "Sorry, but this page doesn't exist."
        : "We have an internal server error.";

    return (
      <Container>
        <Row className="d-flex flex-column bg-light text-muted align-content-center mt-5 rounded">
          <h1 className="mx-auto">{type}</h1>
          <div>{errorMessage}</div>
        </Row>

        <Row className="justify-content-center mt-2 mb-3">
          <img src={errorImage} alt="" />
        </Row>
        <Row>
          <div className="mx-auto">
            Maybe you would like to go back to our <Link to="/">homepage</Link>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Error);
