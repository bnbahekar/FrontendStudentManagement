import { useEffect, useState } from "react";
import { getHealth } from "../api/healthApi";

export default function Health() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHealth()
      .then((res) => {
        console.log("Health Response:", res.data); // ✅ debug
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Health Error:", err);
        setError("Failed to fetch health");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>System Health</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <h3>Status: {data.status}</h3>

          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.components || {}).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}