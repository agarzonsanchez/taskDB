import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdCheckbox } from "react-icons/io";
import { deleteTask } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import "./task-card.css";
export default function TaskCard({ item, id, completed }) {
  console.log(completed);
  const dispatch = useDispatch();
  const handleOnclick = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="card-item">
      <div className="task-item">
        <Link to={`/details/${id}`} id={id}>
          <p>{item}</p>
        </Link>
      </div>
      <div className="task-items">
        <FaRegTrashCan onClick={() => handleOnclick(id)} />
        <IoMdCheckbox color={completed ? "green" : "red"} />
      </div>
    </div>
  );
}
