import { useEffect, useState, useContext } from "react";
import { getSubjects, deleteSubject } from "../api/subjectApi";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  //*  FIX: useContext inside component
  const { setMessage, addHistory } = useContext(AppContext);

  const loadData = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data.data);
    } catch (err) {
      setMessage("Failed to load subjects");
    }
  };

const handleDelete = async (subject) => {
  try {
  await deleteSubject(subject.subjectId);

   setMessage(`Deleted: ${subject.subjectName} (${subject.subjectCode})`);

    //*  USE FULL DETAILS
    addHistory({
      type: "DELETE",
        message: `${subject.subjectName} (${subject.subjectCode})`,
      time: new Date().toLocaleString()
    });


    loadData();
  } catch (err) {
    setMessage(err.response?.data?.message || "Delete failed");
  }
};

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Subjects</h2>

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
    <Link to={`/view/${s.subjectId}`}>View</Link>
    <Link to={`/edit/${s.subjectId}`}>Edit</Link>
    <button onClick={() => handleDelete(s)}>Delete</button>
  </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}