import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../state/ProjectsContext.jsx";

export default function AddEditProject({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { projects, addProject, editProject, removeProject } = useProjects();
  const existing = projects.find(p => p.id === id);

  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (mode === "edit" && existing) {
      setForm({ title: existing.title, description: existing.description || "" });
    }
  }, [mode, existing]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (mode === "add") {
      await addProject(form);
      nav("/");
    } else {
      await editProject(id, { title: form.title, description: form.description });
      nav(`/projects/${id}`);
    }
  };

  const del = async () => {
    if (window.confirm("Delete this project?")) {
      await removeProject(id);
      nav("/");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 640, display: "grid", gap: 12 }}>
      <h2>{mode === "add" ? "Add Project" : "Edit Project"}</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
      <textarea placeholder="Description (optional)" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{mode === "add" ? "Create" : "Save"}</button>
        {mode === "edit" && <button type="button" onClick={del} style={{ background: "crimson", color: "white" }}>Delete</button>}
      </div>
    </form>
  );
}
