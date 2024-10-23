import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, postData } from "../redux/dataSlice";
import TaskCard from "./task-cards/task-cards";

export default function MainPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      // Dispatch the addTask action with the form data
      dispatch(postData({ name: task }));
      setTask(""); // Clear the form after submission
      //   window.location.reload();
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData()); // Dispatch the fetchData thunk
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "failed") {
    return <div>error:{error}</div>;
  }

  return (
    <>
      <div>
        <h1>TASK MANAGER</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {items.tasks && items.tasks.length > 0
        ? items.tasks.map((item) => (
            <div key={item._id}>
              <TaskCard item={item.name} id={item._id} />
            </div>
          ))
        : null}
    </>
  );
}
