import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../Modal/TaskModal";
import PropTypes from "prop-types";
import Spinner from "../../Spinner/Spinner";
import URL from "../../../Utils/Constant";

class SingleTask extends React.Component {
  state = {
    singleTask: "",
    isEdit: false,
    loading: false,
    errorMessage: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`${URL}/task/${id}`)
      .then((res) => res.json())
      .then((singleTask) => {
        if (singleTask.error) throw singleTask.error;
        this.setState({ singleTask });
      })
      .catch((err) => {
        console.error("error", err);
        this.props.history.push("/error/500");
      });
  }

  handleToggleEditTask = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleEditTask = (singleTask) => {
    this.setState({ loading: true });
    fetch(`${URL}/task/${singleTask._id}`, {
      method: "PUT",
      body: JSON.stringify(singleTask),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
          isEdit: false,
        });
      })
      .catch((err) => {
        this.setState({
          singleTask: this.state.singleTask,
        });
        console.log(err.message);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleRemoveTask = () => {
    this.setState({ loading: true, errorMessage: null });
    const { id } = this.props.match.params;
    fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("delete error", err.message);
        this.setState({
          loading: false,
          errorMessage: err.message,
        });
      });
  };

  render() {
    const { isEdit, singleTask, loading, errorMessage } = this.state;
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
          className="text-light bg-light mx-auto"
          style={{
            width: "700px",
            height: "300px",
            borderRadius: "10px",
            marginTop: "150px",
            boxShadow: "4px 1px 20px  black",
          }}
        >
          <Card.Title className="d-flex  text-dark ml-4 mt-2">
            <h4>{title}</h4>
            <span className="text-danger ml-auto mr-2">{scheduledDate}</span>
            <span className="text-success mr-4">{status}</span>
          </Card.Title>
          <Card.Title className="text-dark ml-4">{description}</Card.Title>
          <Card.Body>
            <Card.Text className="text-dark">
              Scheduled task for:
              <span className="text-info font-weight-bold">
                {scheduledDate}
              </span>
            </Card.Text>
            <Card.Text className="text-dark">
              Created:
              <span className="text-info font-weight-bold">{createdDate}</span>
            </Card.Text>
            <Card.Text className="text-dark">
              Updated:
              <span className="text-info font-weight-bold">{updatedDate}</span>
            </Card.Text>
          </Card.Body>

          <Card.Footer className="d-flex">
            <Button
              variant="warning"
              className="ml-auto mr-1"
              onClick={this.handleToggleEditTask}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="mx-1"
              onClick={this.handleRemoveTask}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Footer>
        </Card>
        {isEdit && (
          <TaskModal
            onHide={this.handleToggleEditTask}
            onSubmit={this.handleEditTask}
            editableTask={editableTask}
          />
        )}
        {loading && <Spinner />}
      </>
    );
  }
}
SingleTask.propTypes = {
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

export default SingleTask;
