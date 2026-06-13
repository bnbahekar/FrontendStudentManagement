import SubjectForm from "../components/SubjectForm";
import { createSubject } from "../api/subjectApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AddSubject() {
  const navigate = useNavigate();

  // ✅ FIX: hook inside component
  const { setMessage, addHistory } = useContext(AppContext);

  const handleSubmit = async (data) => {
  try {
    const res = await createSubject(data);

setMessage(`Added: ${data.subjectName} (${data.subjectCode})`);

    addHistory({
      type: "ADD",
  message: `${data.subjectName} (${data.subjectCode})`,
      time: new Date().toLocaleString()
    });

    navigate("/");
  } catch (err) {
    setMessage(err.response?.data?.message || "Error adding subject");
  }
};

  return <SubjectForm onSubmit={handleSubmit} />;
}