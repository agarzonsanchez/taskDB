import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataById } from "../../redux/dataSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedTask, status, error } = useSelector((state) => state.data);

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
          <p>{selectedTask.task.name}</p>
        ) : null}
      </div>
      <div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
