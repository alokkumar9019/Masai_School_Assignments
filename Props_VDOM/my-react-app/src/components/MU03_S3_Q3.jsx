import React, { useState, useEffect } from "react";

function UserCard({ name, email, city }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      maxWidth: 400,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
      <p style={{ margin: "0 0 4px" }}><strong>Email:</strong> {email}</p>
      <p style={{ margin: 0 }}><strong>City:</strong> {city}</p>
    </div>
  );
}
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      {users.map(user => (
        <UserCard 
          key={user.id}
          name={user.name}
          email={user.email}
          city={user.address.city}
        />
      ))}
    </div>
  );
}
