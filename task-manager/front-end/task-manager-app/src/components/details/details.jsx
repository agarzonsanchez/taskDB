import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataById } from "../../redux/dataSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateTask, fetchData } from "../../redux/dataSlice";
import "./details.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedTask, status, error } = useSelector((state) => state.data);
  const [task, setTask] = useState("");
  const [completed, setCompleted] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      _id: id,
      name: task || selectedTask.task.name,
      completed: completed || false,
    };
    console.log(data);
    dispatch(updateTask(data));
    setTask("");
    setCompleted(false);
    dispatch(fetchData());
    dispatch(getDataById(id));
  };
  useEffect(() => {
    // Dispatch the fetchData thunk
    dispatch(getDataById(id));
    if (selectedTask && selectedTask.task) {
      setCompleted(selectedTask.task.completed);
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        {selectedTask && selectedTask.task ? (
          <h1>{selectedTask.task.name.toUpperCase()}</h1>
        ) : (
          <p>No task found</p>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="task-form">
            <p className="task-item">Task: </p>
            <input
              type="text"
              name="task"
              value={task || ""}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="task-form">
            <p className="task-item">Complete: </p>
            <input
              type="checkbox"
              id="completed"
              name="completed check"
              value={completed}
              checked={completed}
              onChange={(e) => setCompleted(!completed)}
            ></input>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <div>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
