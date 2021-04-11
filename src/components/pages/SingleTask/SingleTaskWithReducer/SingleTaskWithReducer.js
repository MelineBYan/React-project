import React, { useEffect, useReducer } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../../Modal/TaskModal";
import PropTypes from "prop-types";
import Spinner from "../../../Spinner/Spinner";
import {
  URL,
  SET_SINGLETASK,
  BEFORE_AFTER_FETCH,
  TOGGLE_EDIT,
} from "../../../../Utils/Constants";

const SingleTaskWithReducer = (props) => {
  const initialState = {
    singleTask: null,
    edit: false,
    loading: false,
    errorMessage: null,
  };
  const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SINGLETASK: {
        return { ...state, singleTask: action.task };
      }
      case BEFORE_AFTER_FETCH: {
        return {
          ...state,
          loading: !state.loading,
          errorMessage: action.error,
        };
      }

      case TOGGLE_EDIT: {
        return {
          ...state,
          edit: !state.edit,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const handleEditTask = (singleTask) => {
    dispatch({ type: BEFORE_AFTER_FETCH, error: null });
    fetch(`${URL}/task/${singleTask._id}`, {
      method: "PUT",
      body: JSON.stringify(singleTask),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        dispatch({ type: SET_SINGLETASK, task: data });
        dispatch({ type: TOGGLE_EDIT });
        dispatch({ type: BEFORE_AFTER_FETCH, error: null });
      })
      .catch((error) => {
        dispatch({ type: BEFORE_AFTER_FETCH, error: error.message });
      });
  };

  const handleRemoveTask = () => {
    dispatch({ type: BEFORE_AFTER_FETCH, error: null });
    const { id } = props.match.params;
    fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        props.history.push("/");
      })
      .catch((error) => {
        dispatch({
          type: BEFORE_AFTER_FETCH,
          error: "Failed to delete task",
        });
      });
  };

  useEffect(() => {
    const { id } = props.match.params;
    fetch(`${URL}/task/${id}`)
      .then((res) => res.json())
      .then((task) => {
        if (task.error) throw task.error;
        dispatch({ type: SET_SINGLETASK, task });
      })
      .catch((err) => {
        console.error("error", err.message);
        props.history.push("/error/500");
      });
  }, []);
  const { singleTask, edit, loading, errorMessage } = state;
  if (!singleTask) return <Spinner />;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: "100px",
          color: "maroon",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {errorMessage}
      </div>
      <Card
        className="text-light mx-auto"
        style={{
          backgroundColor: "rgba(25, 25, 112, .9)",
          width: "700px",
          height: "300px",
          borderRadius: "10px",
          marginTop: "40px",
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
            onClick={() => dispatch({ type: TOGGLE_EDIT })}
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
          onHide={() => dispatch({ type: TOGGLE_EDIT })}
          onSubmit={handleEditTask}
          editableTask={{ ...singleTask, date: new Date(singleTask.date) }}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
SingleTaskWithReducer.propTypes = {
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
export default SingleTaskWithReducer;
