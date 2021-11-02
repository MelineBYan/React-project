import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../../Modal/TaskModal";
import styles from "./singleTaskWithRedux.module.css";
import PropTypes from "prop-types";
import Spinner from "../../../Spinner/Spinner";
import {
  setSingleTask,
  updateTask,
  removeOneTask,
  toggleEdit,
  resetData,
  resetGlobalData,
} from "../../../../Redux/actions";

const SingleTaskWithRedux = (props) => {
  const {
    singleTask,
    edit,
    errorMessage,
    loading,
    setTask,
    editTask,
    removeTask,
    toggleEdit,
    resetState,
  } = props;

  const { history, match } = props;
  const { id } = match.params;
  useEffect(() => {
    setTask(props);
    return function () {
      resetState();
    };
  }, []);

  if (!singleTask) return <Spinner />;
  return (
    <>
      <Card
        className={`text-light mx-auto mb-3 ${styles.taskContainer}`}
        style={{
          backgroundColor: "rgba(25, 25, 112, .9)",
          // width: "700px",
          height: "300px",
          borderRadius: "10px",
          marginTop: "100px",
          boxShadow: "4px 4px 30px  black",
        }}
      >
        <Card.Title className="d-flex  text-light ml-4 mt-2">
          <h4>{singleTask.title}</h4>
          <span className="text-danger ml-auto mr-2">{`${new Date(
            singleTask.date
          ).getDate()} ${new Date(singleTask.date).toLocaleString("default", {
            month: "long",
          })}`}</span>
          <span className="text-success mr-4">{singleTask.status}</span>
        </Card.Title>
        <Card.Title className="text-light ml-4">
          {singleTask.description}
        </Card.Title>
        <Card.Body>
          <Card.Text className="text-light">
            Scheduled task for:
            <span className="ml-2 text-info font-weight-bold">
              {`${new Date(singleTask.date).getDate()} ${new Date(
                singleTask.date
              ).toLocaleString("default", { month: "long" })}`}
            </span>
          </Card.Text>
          <Card.Text className="text-light">
            Created:
            <span className="ml-2 text-info font-weight-bold">
              {new Date(singleTask.created_at).toString().slice(0, 10)}
            </span>
          </Card.Text>
          <Card.Text className="text-light">
            Updated:
            <span className="ml-2 text-info font-weight-bold">
              {new Date(singleTask.updated_at).toString().slice(0, 10)}
            </span>
          </Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex">
          <Button
            variant="warning"
            className="ml-auto mr-1"
            onClick={toggleEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mx-1"
            onClick={() => removeTask(id, history)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Footer>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "100px",
          color: "maroon",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {errorMessage}
      </div>
      <Button variant="info" className="d-flex mx-auto mt-4">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Go Back
        </Link>
      </Button>
      {edit && (
        <TaskModal
          onHide={toggleEdit}
          onSubmit={(editable) => editTask(editable, props.location.pathname)}
          editableTask={{ ...singleTask, date: new Date(singleTask.date) }}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
SingleTaskWithRedux.propTypes = {
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
  singleTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  edit: PropTypes.bool.isRequired,
  editTask: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  setTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { singleTask, edit, errorMessage } = state.singleTaskReducer;
  return {
    singleTask,
    edit,
    errorMessage,
    loading: state.globalReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTask: (props) => dispatch((dispatch) => setSingleTask(dispatch, props)),
    editTask: (task, path) =>
      dispatch((dispatch) => updateTask(dispatch, task, path)),
    removeTask: (id, history) =>
      dispatch((dispatch) => removeOneTask(dispatch, id, history)),
    toggleEdit: () => dispatch(toggleEdit()),
    resetState: () => {
      dispatch(resetData());
      dispatch(resetGlobalData());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTaskWithRedux);
