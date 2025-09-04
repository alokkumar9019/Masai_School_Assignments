import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth} from "./state/AuthContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import AddEditProject from "./pages/AddEditProject.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

const Private = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const Shell = ({ children }) => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="container" style={{ fontFamily: "Inter, system-ui", maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <header  style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <Link to="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: 20 }}>📌 Project Tracker</Link>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/">Dashboard</Link>
          {user && <Link to="/projects/new">Add Project</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <button onClick={() => { logout(); nav("/login"); }}>Logout</button>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects/new" element={<Private><AddEditProject mode="add" /></Private>} />
        <Route path="/projects/:id/edit" element={<Private><AddEditProject mode="edit" /></Private>} />
        <Route path="/projects/:id" element={<Private><ProjectDetails /></Private>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
