import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../../Modal/TaskModal";
import Spinner from "../../Spinner/Spinner";
import URL from "../../../Utils/Constant";

class SingleTask extends React.Component {
  state = {
    singleTask: "",
    isEdit: false,
    loading: false,
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
        console.error("error", err.message);
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
      .catch((err) => console.log(err.message))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleRemoveTask = () => {
    this.setState({ loading: true });
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
        console.log(err.message);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { isEdit, singleTask, loading } = this.state;
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
        <Card
          className="text-light bg-light mx-auto"
          style={{
            width: "700px",
            height: "240px",
            borderRadius: "10px",
            marginTop: "150px",
            boxShadow: "4px 1px 20px  black",
          }}
        >
          <Card.Title className="d-flex  text-dark ml-4 ">
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

export default SingleTask;
