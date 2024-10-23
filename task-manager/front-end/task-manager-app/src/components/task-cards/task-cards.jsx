import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteTask } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
export default function TaskCard({ item, id }) {
  const dispatch = useDispatch();
  const handleOnclick = (id) => {
    console.log("entre");
    dispatch(deleteTask(id));
  };
  return (
    <div>
      <Link to={`/details/${id}`} id={id}>
        <p>{item}</p>
      </Link>
      <FaRegTrashCan onClick={() => handleOnclick(id)} />
    </div>
  );
}
