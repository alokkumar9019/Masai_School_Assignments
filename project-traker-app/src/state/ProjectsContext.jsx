import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getProjects, createProject, updateProject, deleteProject,
  getTasks, createTask, updateTask, deleteTask, subscribe
} from "../api/firebase.js";

const ProjectsCtx = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await getProjects();
      setProjects(list);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const unsub = subscribe("projects", (msg) => {
      const { data } = msg;
      if (!data) return;
      if (data.path === "/") {
        const obj = data.data || {};
        const list = Object.entries(obj).map(([id, p]) => ({ id, ...p }));
        setProjects(list);
      } else {
        getProjects().then(setProjects);
      }
    });
    return unsub;
  }, []);

  const loadTasks = async (projectId) => {
    const ts = await getTasks(projectId);
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, tasks: ts } : p)
    );
  };

  const addProject = async (payload) => {
    const p = await createProject(payload);
    setProjects(prev => [{ ...p }, ...prev]);
  };
  const editProject = async (id, patch) => {
    await updateProject(id, patch);
  };
  const removeProject = async (id) => {
    await deleteProject(id);
  };

  const addTask = async (projectId, payload) => {
    const t = await createTask(projectId, payload);
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, tasks: [t, ...(p.tasks || [])] } : p)
    );
  };
  const editTask = async (projectId, taskId, patch) => {
    await updateTask(projectId, taskId, patch);
  };
  const removeTask = async (projectId, taskId) => {
    await deleteTask(projectId, taskId);
  };

  const value = useMemo(() => ({
    projects, loading, loadTasks,
    addProject, editProject, removeProject,
    addTask, editTask, removeTask
  }), [projects, loading]);

  return <ProjectsCtx.Provider value={value}>{children}</ProjectsCtx.Provider>;
};

export const useProjects = () => useContext(ProjectsCtx);
