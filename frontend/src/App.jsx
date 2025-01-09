import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
