import { useEffect, useState, useContext } from "react";
import { getStudents, deleteStudent, searchStudents } from "../api/studentApi";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState({
    rollNo: "",
    name: "",
    city: "",
    joinDate: ""
  });

  const { setMessage, addHistory } = useContext(AppContext);

  // 🔹 Load all initially
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const res = await getStudents();
    setStudents(res.data.data);
  };

  // 🔹 Live search (trigger when query changes)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async () => {
    try {
      // If all empty → load all
      if (!query.rollNo && !query.name && !query.city && !query.joinDate) {
        return loadAll();
      }

const cleanQuery = Object.fromEntries(
  Object.entries(query).filter(([_, v]) => v !== "")
);

const res = await searchStudents(cleanQuery);
      const data = res.data.data;

      // handle single object vs list
      setStudents(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setStudents([]);
    }
  };

  // 🔹 Delete
  const handleDelete = async (student) => {
    try {
      await deleteStudent(student.studentId);

      setMessage(`Deleted: ${student.name} (Roll: ${student.rollNo})`);

      addHistory({
        type: "DELETE",
        message: `${student.name} (Roll: ${student.rollNo})`,
        time: new Date().toLocaleString()
      });

      handleSearch(); // refresh
    } catch (err) {
      setMessage("Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Students</h2>

      {/* 🔍 SEARCH BAR */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Roll No"
          onChange={(e) => setQuery({ ...query, rollNo: e.target.value })}
        />
        <input
          placeholder="Name"
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
        />
        <input
          placeholder="City"
          onChange={(e) => setQuery({ ...query, city: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setQuery({ ...query, joinDate: e.target.value })}
        />
      </div>

      <Link to="/students/add">Add Student</Link>

      {/* 📊 TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll</th>
            <th>Name</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.studentId}>
              <td>{s.studentId}</td>
              <td>{s.rollNo}</td>
              <td>{s.name}</td>
              <td>{s.city}</td>
              <td>
                <Link to={`/students/view/${s.studentId}`}>View</Link>{" "}
                <Link to={`/students/edit/${s.studentId}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && <p>No results found</p>}
    </div>
  );
}