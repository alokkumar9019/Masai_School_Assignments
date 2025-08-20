import React, { useState } from "react";

function UserCard({ name, email, age }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "12px",
    maxWidth: "400px",
  };

  return (
    <div style={cardStyle}>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Age:</strong> {age}</p>
    </div>
  );
}

function UserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

  const initialForm = { name: "", email: "", age: "" };
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({});


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!emailRegex.test(formData.email)) errs.email = "Invalid email address";
    const ageNum = Number(formData.age);
    if (!formData.age || !Number.isInteger(ageNum) || ageNum <= 0)
      errs.age = "Age must be a positive integer";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto" }}>
      <h2>User List</h2>
      
      <form onSubmit={handleAddUser} noValidate style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
            />
          </label>
          {errors.name && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
            />
          </label>
          {errors.email && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
              min="1"
            />
          </label>
          {errors.age && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.age}</p>}
        </div>

        <button
          type="submit"
          style={{ padding: "10px 16px", fontSize: "1rem", cursor: "pointer" }}
        >
          Add User
        </button>
      </form>

      {users.map((user, idx) => (
        <UserCard key={user.email + idx} {...user} />
      ))}
    </div>
  );
}

export default UserList;
