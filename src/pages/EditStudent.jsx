import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent, updateStudent } from "../api/studentApi";
import StudentForm from "../components/StudentForm";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function EditStudent() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
    const { setMessage, addHistory } = useContext(AppContext);

  useEffect(() => {
    getStudent(id).then(r => setData(r.data.data));
  }, []);


const submit = async (form) => {
  try {
    const oldName = data.name;
    const oldRoll = data.rollNo;

    await updateStudent(id, form);

    setMessage(`Updated: ${oldName} → ${form.name}`);

    addHistory({
      type: "UPDATE",
      message: `${oldName} → ${form.name} (Roll: ${oldRoll} → ${form.rollNo})`,
      time: new Date().toLocaleString()
    });

    nav("/students");
  } catch (err) {
    setMessage("Update failed");
  }
};

  return data ? <StudentForm initialData={data} onSubmit={submit} /> : "Loading";
}