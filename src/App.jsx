import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubjectList from "./pages/SubjectList";
import AddSubject from "./pages/AddSubject";
import EditSubject from "./pages/EditSubject";
import ViewSubject from "./pages/ViewSubject";
import Navbar from "./components/Navbar";
import History from "./pages/History";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;