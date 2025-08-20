import React from "react";

function ProfileCard({ name, age, bio }) {
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 20,
        maxWidth: 300,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: "0 0 10px 0" }}>{capitalize(name)}</h2>
      {age !== undefined && age !== null ? (
        <p>
          <strong>Age:</strong> {age}
        </p>
      ) : (
        <p>
          <em>Age not provided</em>
        </p>
      )}
      {bio ? (
        <p style={{ fontStyle: "italic" }}>{bio}</p>
      ) : (
        <p>
          <em>No biography available</em>
        </p>
      )}
    </div>
  );
}

export default ProfileCard;
