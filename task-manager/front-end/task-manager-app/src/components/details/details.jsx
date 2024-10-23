import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataById } from "../../redux/dataSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateTask } from "../../redux/dataSlice";
export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedTask, status, error } = useSelector((state) => state.data);
  const [task, setTask] = useState("");
  useEffect(() => {
    dispatch(getDataById(id));
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
          <h1>{selectedTask.task.name}</h1>
        ) : null}
      </div>
      <div>
        <form onSubmit="">
          <p>Task: </p>
          <input
            type="text"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <p>Complete: </p>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
          ></input>
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
