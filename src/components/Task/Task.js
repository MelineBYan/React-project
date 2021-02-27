import React from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, handleDeleteTask }) => {
  return (
    <Col
      xs={12}
      sm={12}
      md={6}
      lg={4}
      className="col-5 d-flex  px-3 py-1 mt-2 ml-3 "
    >
      <Form.Check type="checkbox" className="bg-secondary"></Form.Check>
      <Card className="bg-warning" style={{ width: "18rem" }}>
        <Card.Title>{task.title}</Card.Title>
      </Card>
      <Button
        type="button"
        variant="danger"
        onClick={(e) => handleDeleteTask(task._id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button variant="primary">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Col>
  );
};

export default Task;
