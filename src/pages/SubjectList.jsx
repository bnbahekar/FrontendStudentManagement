import { useEffect, useState, useContext } from "react";
import { getSubjects, deleteSubject, searchSubjects } from "../api/subjectApi";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  const [query, setQuery] = useState({
    name: "",
    code: ""
  });

  const { setMessage, addHistory } = useContext(AppContext);

  // Load all initially
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const res = await getSubjects();
    setSubjects(res.data.data);
  };

  // Live search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async () => {
    try {
      if (!query.name && !query.code) {
        return loadAll();
      }

      const res = await searchSubjects(query);
      const data = res.data.data;

      setSubjects(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setSubjects([]);
    }
  };

  const handleDelete = async (subject) => {
    try {
      await deleteSubject(subject.subjectId);

      setMessage(`Deleted: ${subject.subjectName} (${subject.subjectCode})`);

      addHistory({
        type: "DELETE",
        message: `${subject.subjectName} (${subject.subjectCode})`,
        time: new Date().toLocaleString()
      });

      handleSearch();
    } catch (err) {
      setMessage("Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Subjects</h2>

      {/* 🔍 SEARCH BAR */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Subject Name"
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
        />
        <input
          placeholder="Subject Code"
          onChange={(e) => setQuery({ ...query, code: e.target.value })}
        />
      </div>

      <Link to="/add">Add Subject</Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s.subjectId}>
              <td>{s.subjectId}</td>
              <td>{s.subjectName}</td>
              <td>{s.subjectCode}</td>
              <td>
                <Link to={`/view/${s.subjectId}`}>View</Link>{" "}
                <Link to={`/edit/${s.subjectId}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {subjects.length === 0 && <p>No results found</p>}
    </div>
  );
}