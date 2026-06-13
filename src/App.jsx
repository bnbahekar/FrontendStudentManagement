import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubjectList from "./pages/SubjectList";
import AddSubject from "./pages/AddSubject";
import EditSubject from "./pages/EditSubject";
import ViewSubject from "./pages/ViewSubject";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ViewStudent from "./pages/ViewStudent";
import StudentSearch from "./pages/StudentSearch";
import Health from "./pages/Health";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SubjectList />} />
        <Route path="/add" element={<AddSubject />} />
        <Route path="/edit/:id" element={<EditSubject />} />
        <Route path="/view/:id" element={<ViewSubject />} />
<Route path="/history" element={<History />} />
<Route path="/students" element={<StudentList />} />
<Route path="/students/add" element={<AddStudent />} />
<Route path="/students/edit/:id" element={<EditStudent />} />
<Route path="/students/view/:id" element={<ViewStudent />} />
<Route path="/students/search" element={<StudentSearch />} />
<Route path="/health" element={<Health />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;