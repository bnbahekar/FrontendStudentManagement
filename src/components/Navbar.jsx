import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { message } = useContext(AppContext);

  return (
    <>
      <div className="nav">
        <h2>Subject Manager</h2>
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/history">History</Link>
      </div>

      {message && <div className="message">{message}</div>}
    </>
  );
}