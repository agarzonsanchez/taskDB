import { Link } from "react-router-dom";

export default function TaskCard({ item, id }) {
  return (
    <Link to={`/details/${id}`} id={id}>
      <p>{item}</p>
    </Link>
  );
}
