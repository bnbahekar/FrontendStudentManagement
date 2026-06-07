import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubject, updateSubject } from "../api/subjectApi";
import SubjectForm from "../components/SubjectForm";
import { AppContext } from "../context/AppContext";

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();

  //*  FIX: hook inside component
  const { setMessage, addHistory } = useContext(AppContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    loadSubject();
  }, []);

  const loadSubject = async () => {
    try {
      const res = await getSubject(id);
      setData(res.data.data);
    } catch (err) {
      setMessage("Failed to load subject");
    }
  };

const handleSubmit = async (form) => {
  try {
const oldName = data.subjectName;
const oldCode = data.subjectCode;

    const res = await updateSubject(id, form);

setMessage(
    `Updated: ${oldName}*  ${form.subjectName} (${oldCode}*  ${form.subjectCode})`
);

    addHistory({
      type: "UPDATE",
       message: `${oldName}*  ${form.subjectName} (${oldCode}*  ${form.subjectCode})`,
      time: new Date().toLocaleString()
    });

    navigate("/");
  } catch (err) {
    setMessage(err.response?.data?.message || "Update failed");
  }
};

  return data ? (
    <SubjectForm initialData={data} onSubmit={handleSubmit} />
  ) : (
    "Loading..."
  );
}