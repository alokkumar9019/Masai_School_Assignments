import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { useProjects } from "../state/ProjectsContext.jsx";

const pageSize = 6;

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects, loadTasks, addTask, editTask, removeTask } = useProjects();
  const project = projects.find(p => p.id === id);

  const [newTask, setNewTask] = useState({ title: "", priority: "medium" });
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ priority: "all", completed: "all", sort: "createdAtDesc" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (project && !project.tasks) loadTasks(id);
  }, [project, id, loadTasks]);

  // debounced search state
  const [search, setSearch] = useState("");
  const debounced = useMemo(() => debounce((v)=>setSearch(v), 300), []);
  useEffect(() => () => debounced.cancel(), [debounced]);

  if (!project) return <p>Project not found.</p>;
  const tasks = project.tasks || [];

  const filtered = useMemo(() => {
    let list = tasks.slice();

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }
    // filter by priority
    if (filters.priority !== "all") list = list.filter(t => t.priority === filters.priority);
    // filter by completed
    if (filters.completed !== "all") {
      const isDone = filters.completed === "done";
      list = list.filter(t => !!t.completed === isDone);
    }
    // sort
    if (filters.sort === "createdAtDesc") list.sort((a,b)=>b.createdAt - a.createdAt);
    if (filters.sort === "createdAtAsc") list.sort((a,b)=>a.createdAt - b.createdAt);
    if (filters.sort === "priorityAsc") {
      const order = { low: 1, medium: 2, high: 3 };
      list.sort((a,b)=>order[a.priority]-order[b.priority]);
    }
    if (filters.sort === "priorityDesc") {
      const order = { low: 1, medium: 2, high: 3 };
      list.sort((a,b)=>order[b.priority]-order[a.priority]);
    }
    return list;
  }, [tasks, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  const submitTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    await addTask(id, { title: newTask.title, completed: false, priority: newTask.priority });
    setNewTask({ title: "", priority: "medium" });
    setPage(1);
  };

  const toggle = async (t) => {
    await editTask(id, t.id, { completed: !t.completed });
  };

  const updateTitle = async (t, newTitle) => {
    await editTask(id, t.id, { title: newTitle });
  };

  const del = async (t) => {
    if (window.confirm("Delete task?")) {
      await removeTask(id, t.id);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h2 style={{ marginBottom: 4 }}>{project.title}</h2>
        <small>Created: {new Date(project.createdAt).toLocaleString()}</small>
        {project.description && <p style={{ marginTop: 8 }}>{project.description}</p>}
      </div>

      <form onSubmit={submitTask} style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 160px 120px" }}>
        <input placeholder="New task title" value={newTask.title} onChange={e=>setNewTask(s=>({...s,title:e.target.value}))}/>
        <select value={newTask.priority} onChange={e=>setNewTask(s=>({...s,priority:e.target.value}))}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button>Add Task</button>
      </form>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Search tasks (debounced)"
          value={query}
          onChange={(e)=> { setQuery(e.target.value); debounced(e.target.value); }}
          style={{ flex: 1, minWidth: 220 }}
        />
        <select value={filters.priority} onChange={e=>{ setFilters(s=>({...s, priority:e.target.value})); setPage(1); }}>
          <option value="all">All priorities</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <select value={filters.completed} onChange={e=>{ setFilters(s=>({...s, completed:e.target.value})); setPage(1); }}>
          <option value="all">All statuses</option>
          <option value="todo">todo</option>
          <option value="done">done</option>
        </select>
        <select value={filters.sort} onChange={e=>setFilters(s=>({...s, sort:e.target.value}))}>
          <option value="createdAtDesc">Newest</option>
          <option value="createdAtAsc">Oldest</option>
          <option value="priorityDesc">Priority ↓</option>
          <option value="priorityAsc">Priority ↑</option>
        </select>
      </div>

      <ul className="task-list" style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {pageItems.map(t => (
          <li key={t.id} className="task-item" style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={!!t.completed} onChange={()=>toggle(t)} />
            <InlineEditableText text={t.title} onSave={(v)=>updateTitle(t, v)} />
            <span style={{ padding: "2px 8px", borderRadius: 999, border: "1px solid #ddd", justifySelf: "start" }}>{t.priority}</span>
            <button onClick={()=>del(t)} style={{ background: "crimson", color: "white" }}>Delete</button>
          </li>
        ))}
      </ul>

      <Pagination className="pagination"  page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

function InlineEditableText({ text, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(text);
  useEffect(()=>setVal(text), [text]);
  if (!editing) {
    return <span onDoubleClick={()=>setEditing(true)} title="Double click to edit">{text}</span>;
  }
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSave(val); setEditing(false); }} style={{ display:"flex", gap: 6 }}>
      <input value={val} onChange={e=>setVal(e.target.value)} autoFocus onBlur={()=>setEditing(false)} />
      <button>Save</button>
    </form>
  );
}

function Pagination({ page, totalPages, onPage }) {
  return (
    <div  style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button disabled={page<=1} onClick={()=>onPage(page-1)}>Prev</button>
      <span>Page {page} / {totalPages}</span>
      <button disabled={page>=totalPages} onClick={()=>onPage(page+1)}>Next</button>
    </div>
  );
}
