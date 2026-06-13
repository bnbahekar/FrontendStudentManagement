import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { message } = useContext(AppContext);

  return (
    <>
      <div className="nav">

        <h2>Student Manager</h2>
           <Link to="/students">Students</Link>
                   <Link to="/">Subjects</Link>

<Link to="/health">Health</Link>
        <Link to="/history">History</Link>
      </div>

      {message && <div className="message">{message}</div>}
    </>
  );
}