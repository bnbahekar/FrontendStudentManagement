import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubject } from "../api/subjectApi";

export default function ViewSubject() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getSubject(id).then((res) => setData(res.data.data));
  }, []);

  return data ? (
    <div className="card">
   <h2>{data.subjectName}</h2>
<p>Code: {data.subjectCode}</p>
<p>ID: {data.subjectId}</p>
    </div>
  ) : (
    "Loading..."
  );
}