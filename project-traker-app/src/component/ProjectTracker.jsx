import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  setLogLevel
} from 'firebase/firestore';

// Set Firebase log level for debugging
setLogLevel('debug');

// Global variables for Firebase configuration and app ID. These are provided by the environment.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App
let app, db, auth;
if (firebaseConfig && firebaseConfig.projectId) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  console.error("Firebase configuration is invalid or missing 'projectId'.");
}

// Tailwind CSS CDN and Google Fonts for a clean, modern look.
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
    background-color: #1a202c;
    color: #cbd5e0;
  }
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

// Helper to handle async/await operations
const withAsync = async (fn) => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    console.error("Operation failed:", error);
    return [null, error];
  }
};

const Modal = ({ title, message, onConfirm, onCancel }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectItem = ({ project, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(project.title);
  const [newStatus, setNewStatus] = useState(project.status);

  const handleSave = async () => {
    onEdit(project.id, newTitle, newStatus);
    setIsEditing(false);
  };

  const statusColors = {
    'Not Started': 'bg-gray-700 text-gray-300',
    'In Progress': 'bg-yellow-600 text-yellow-900',
    'Completed': 'bg-green-600 text-green-900',
  };

  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between transition-transform transform hover:scale-[1.01] duration-200">
      {isEditing ? (
        <div className="flex-1 space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 w-full md:w-auto p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full md:w-auto p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      ) : (
        <div className="flex-1 space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          <span className="text-lg font-medium text-white flex-1">{project.title}</span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
      )}
      <div className="flex items-center space-x-2 mt-4 md:mt-0">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(project.id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

const ProjectForm = ({ onAddProject, isLoading }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isLoading) return;
    onAddProject(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-700">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <label htmlFor="project-title" className="block text-sm font-medium text-gray-300">Project Title</label>
          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new project title..."
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 text-white font-medium rounded-md shadow-sm transition-colors ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          Add Project
        </button>
      </div>
    </form>
  );
};

export default function App() {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({ message: '', title: '', onConfirm: null, onCancel: null });
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  // Handle Firebase config error
  useEffect(() => {
    if (!firebaseConfig || !firebaseConfig.projectId) {
      setIsLoading(false);
      setModal({
        title: "Configuration Error",
        message: "Firebase configuration is invalid or missing the 'projectId'. Please ensure the environment provides a valid configuration.",
        onConfirm: () => setModal({ message: '' })
      });
    } else {
      setIsFirebaseReady(true);
    }
  }, []);

  // Authentication and Firestore setup
  useEffect(() => {
    if (!isFirebaseReady || !auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setIsLoading(false);
      } else {
        const [result, error] = await withAsync(() => initialAuthToken
          ? signInWithCustomToken(auth, initialAuthToken)
          : signInAnonymously(auth)
        );
        if (result?.user) {
          setUserId(result.user.uid);
        } else if (error) {
          console.error('Authentication failed:', error);
          setUserId(crypto.randomUUID()); // Fallback for debugging
        } else {
          setUserId(crypto.randomUUID());
        }
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [isFirebaseReady, auth]);

  // Real-time data listener for projects
  useEffect(() => {
    if (!userId || !db) return;

    const projectsCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'projects');
    const q = query(projectsCollectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort projects by title in memory, as orderBy requires indexes
      projectsData.sort((a, b) => a.title.localeCompare(b.title));
      setProjects(projectsData);
    }, (error) => {
      console.error("Failed to fetch projects:", error);
    });

    return () => unsubscribe();
  }, [userId, db]);

  const addProject = async (title) => {
    if (!userId || !db) return;
    const projectsCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'projects');
    const newProject = {
      title,
      status: 'Not Started',
      createdAt: new Date(),
    };
    await withAsync(() => addDoc(projectsCollectionRef, newProject));
  };

  const updateProject = async (id, newTitle, newStatus) => {
    if (!userId || !db) return;
    const projectDocRef = doc(db, 'artifacts', appId, 'users', userId, 'projects', id);
    await withAsync(() => updateDoc(projectDocRef, { title: newTitle, status: newStatus }));
  };

  const deleteProject = async (id) => {
    if (!userId || !db) return;
    setModal({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      onConfirm: async () => {
        const projectDocRef = doc(db, 'artifacts', appId, 'users', userId, 'projects', id);
        await withAsync(() => deleteDoc(projectDocRef));
        setModal({ message: '' });
      },
      onCancel: () => setModal({ message: '' }),
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-gray-200 flex flex-col items-center">
      <style>{style}</style>
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-white mb-2">Project Tracker</h1>
        <p className="text-center text-gray-400 mb-6">Manage your projects efficiently.</p>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></span>
              <span>Authenticating...</span>
            </div>
          ) : (
            <>User ID: <span className="font-mono bg-gray-700 px-2 py-1 rounded-md text-gray-300">{userId}</span></>
          )}
        </p>

        <ProjectForm onAddProject={addProject} isLoading={isLoading} />

        {projects.length === 0 && !isLoading ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-400 border border-gray-700">
            No projects found. Add a new project to get started!
          </div>
        ) : (
          <ul className="space-y-4">
            {projects.map(project => (
              <ProjectItem
                key={project.id}
                project={project}
                onEdit={updateProject}
                onDelete={deleteProject}
              />
            ))}
          </ul>
        )}
      </div>
      <Modal {...modal} />
    </div>
  );
}
