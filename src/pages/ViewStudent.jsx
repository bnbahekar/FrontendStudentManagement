import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudent } from "../api/studentApi";

export default function ViewStudent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getStudent(id).then(r => setData(r.data.data));
  }, []);

  return data ? (
    <div className="card">
      <h2>{data.name}</h2>
      <p>Roll: {data.rollNo}</p>
      <p>City: {data.city}</p>
      <p>Email: {data.email}</p>
    </div>
  ) : "Loading";
}