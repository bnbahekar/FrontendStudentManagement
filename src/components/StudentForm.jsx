import { useState } from "react";

export default function StudentForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || { rollNo: "", name: "", city: "", email: "" }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
}