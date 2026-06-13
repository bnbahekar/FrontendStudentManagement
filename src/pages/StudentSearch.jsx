import { useState } from "react";
import { searchStudents } from "../api/studentApi";

export default function StudentSearch() {
  const [query, setQuery] = useState({});
  const [data, setData] = useState([]);

  const search = async () => {
    const res = await searchStudents(query);
    setData(Array.isArray(res.data.data) ? res.data.data : [res.data.data]);
  };

  return (
    <div className="container">
      <h2>Search Students</h2>

      <input placeholder="Roll No" onChange={e => setQuery({ rollNo: e.target.value })} />
      <input placeholder="Name" onChange={e => setQuery({ name: e.target.value })} />
      <input placeholder="City" onChange={e => setQuery({ city: e.target.value })} />

      <button onClick={search}>Search</button>

      <ul>
        {data.map(s => <li key={s.studentId}>{s.name} ({s.rollNo})</li>)}
      </ul>
    </div>
  );
}
 