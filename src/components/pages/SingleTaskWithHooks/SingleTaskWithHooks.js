import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { singleTaskContext } from "../../../Context/Context";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../Modal/TaskModal";
import PropTypes from "prop-types";
import Spinner from "../../Spinner/Spinner";
import URL from "../../../Utils/Constant";

const SingleTaskWithHooks = (props) => {
  const context = useContext(singleTaskContext);
  const {
    singleTask,
    loading,
    errorMessage,
    edit,
    setSingleTask,
    handleRemoveTask,
    handleToggleEditTask,
    handleEditTask,
  } = context;
  useEffect(() => {
    const { id } = props.match.params;
    fetch(`${URL}/task/${id}`)
      .then((res) => res.json())
      .then((singleTask) => {
        if (singleTask.error) throw singleTask.error;
        setSingleTask(singleTask);
      })
      .catch((err) => {
        console.error("error", err);
        props.history.push("/error/500");
      });
  }, []);

  const {
    title,
    description,
    date,
    status,
    created_at,
    updated_at,
  } = singleTask;
  const scheduledDate = `${new Date(date).getDate()} ${new Date(
    date
  ).toLocaleString("default", { month: "long" })}`;

  const createdDate = new Date(created_at).toString().slice(0, 10);
  const updatedDate = new Date(updated_at).toString().slice(0, 10);
  const editableTask = { ...singleTask, date: new Date(singleTask.date) };
  if (!singleTask) return <Spinner />;
  return (
    <>
      <div className="mb-5 text-danger">{errorMessage}</div>
      <Card
        className="text-light mx-auto"
        style={{
          backgroundColor: "rgba(25, 25, 112, .9)",
          width: "700px",
          height: "300px",
          borderRadius: "10px",
          marginTop: "150px",
          boxShadow: "4px 4px 30px  black",
        }}
      >
        <Card.Title className="d-flex  text-light ml-4 mt-2">
          <h4>{title}</h4>
          <span className="text-danger ml-auto mr-2">{scheduledDate}</span>
          <span className="text-success mr-4">{status}</span>
        </Card.Title>
        <Card.Title className="text-light ml-4">{description}</Card.Title>
        <Card.Body>
          <Card.Text className="text-light">
            Scheduled task for:
            <span className="ml-2 text-info font-weight-bold">
              {scheduledDate}
            </span>
          </Card.Text>
          <Card.Text className="text-light">
            Created:
            <span className="ml-2 text-info font-weight-bold">
              {createdDate}
            </span>
          </Card.Text>
          <Card.Text className="text-light">
            Updated:
            <span className="ml-2 text-info font-weight-bold">
              {updatedDate}
            </span>
          </Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex">
          <Button
            variant="warning"
            className="ml-auto mr-1"
            onClick={handleToggleEditTask}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mx-1"
            onClick={handleRemoveTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Footer>
      </Card>

      <Button variant="info" className="d-flex mx-auto mt-4">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Go Back
        </Link>
      </Button>
      {edit && (
        <TaskModal
          onHide={handleToggleEditTask}
          onSubmit={handleEditTask}
          editableTask={editableTask}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
SingleTaskWithHooks.propTypes = {
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
};
export default withRouter(SingleTaskWithHooks);
