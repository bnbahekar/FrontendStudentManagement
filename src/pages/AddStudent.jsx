import StudentForm from "../components/StudentForm";
import { createStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AddStudent() {
  const nav = useNavigate();
  const { setMessage, addHistory } = useContext(AppContext);

  const submit = async (data) => {
    try {
      await createStudent(data);
      setMessage(`Added: ${data.name} (Roll: ${data.rollNo})`);

      addHistory({
        type: "ADD",
        message: `${data.name} (Roll: ${data.rollNo})`,
        time: new Date().toLocaleString()
      });

      nav("/students");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding student");
    }
  };

  return <StudentForm onSubmit={submit} />;
}