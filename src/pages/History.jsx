import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function History() {
  const { history } = useContext(AppContext);

  return (
    <div className="container">
      <h2>Activity History</h2>

      <ul>
        {history.map((h, i) => (
<li key={i}>
  <strong>[{h.type}]</strong> {h.message}
  <br />
  <small>{h.time}</small>
</li>
        ))}
      </ul>
    </div>
  );
}
 