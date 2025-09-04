import React from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../state/ProjectsContext.jsx";

export default function Dashboard() {
  const { projects, loading } = useProjects();

  if (loading) return <p>Loading projects…</p>;
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Projects</h2>
      {!projects.length && <p>No projects yet. Click “Add Project”.</p>}
      <div style={{ display: "grid", gap: 8 }}>
        {projects.map(p => (
          <div key={p.id} className="project-card" style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <small>{new Date(p.createdAt).toLocaleString()}</small>
                <p style={{ marginTop: 8 }}>{p.description}</p>
              </div>
              <div className="actions" style={{ display: "flex", gap: 8 }}>
                <Link to={`/projects/${p.id}`}>Details</Link>
                <Link to={`/projects/${p.id}/edit`}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
