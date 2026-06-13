import { useState } from "react";

export default function SubjectForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || { subjectName: "", subjectCode: "" }
  );
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="subjectName"
        placeholder="Subject Name"
        value={form.subjectName}
        onChange={handleChange}
      />
      <input
        name="subjectCode"
        placeholder="Subject Code"
        value={form.subjectCode}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}