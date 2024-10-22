import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/dataSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData()); // Dispatch the fetchData thunk
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "loading") {
    return <div>error:{error}</div>;
  }
  console.log(items);
  return (
    <>
      <div>
        <h1>TASK MANAGER</h1>
        <input type="text" name="task" />
        <button>Submit</button>
      </div>
      <div>TASK</div>
    </>
  );
}
