import React, { useState } from "react";
import { useAuth } from "../state/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      await signup(form);
      nav("/");
    } catch (e2) {
      setErr(e2.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: "40px auto", display: "grid", gap: 12 }}>
      <h2>Signup</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <button>Create Account</button>
      <div>Already have an account? <Link to="/login">Login</Link></div>
    </form>
  );
}
