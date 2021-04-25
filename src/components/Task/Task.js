import React from "react";
import styles from "./Task.module.css";
import { memo } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faInfo,
  faCheckDouble,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

const Task = ({
  task,
  handleDeleteTask,
  handleToggleChecked,
  isCheckedAnyTask,
  completed,
  getEditableTask,
  getTaskInfo,
  toggleTaskStatus,
  ...props
}) => {
  const cls = [styles.content];
  if (completed) {
    cls.push(styles.checkedTask);
  }

  const clscheck = [];
  if (!completed) {
    clscheck.push(styles.unchecked);
  } else {
    clscheck.push(styles.checked);
  }

  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className=" d-flex my-3 py-0">
      <Button
        variant="light"
        className={`${styles.completeBtn}`}
        onClick={() => handleToggleChecked(task._id)}
      >
        <FontAwesomeIcon icon={faCheck} className={clscheck.join(" ")} />
      </Button>
      <Card
        className={cls.join(" ")}
        onDoubleClick={() => props.history.push(`/task/${task._id}`)}
      >
        <Card.Text className="d-inline-flex">
          <span className="mr-auto ml-3">{task.title}</span>
          <Button
            variant="info"
            disabled={isCheckedAnyTask}
            onClick={() => toggleTaskStatus(task)}
          >
            {task.status === "active" ? (
              <FontAwesomeIcon icon={faHourglassHalf} />
            ) : (
              <FontAwesomeIcon icon={faCheckDouble} />
            )}
          </Button>
          <Button
            variant="warning"
            className="mx-1"
            disabled={isCheckedAnyTask}
            onClick={() => getEditableTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => handleDeleteTask(task._id)}
            disabled={isCheckedAnyTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          <Button
            variant="dark"
            className="mx-1"
            disabled={isCheckedAnyTask}
            onClick={() => getTaskInfo(task)}
          >
            <FontAwesomeIcon icon={faInfo} />
          </Button>
        </Card.Text>
      </Card>
    </Col>
  );
};
Task.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleDeleteTask: PropTypes.func.isRequired,
  handleToggleChecked: PropTypes.func.isRequired,
  isCheckedAnyTask: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  getEditableTask: PropTypes.func.isRequired,
};

export default withRouter(memo(Task));
