import React from "react";

function Card({ title, children }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    maxWidth: "350px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    background: "#fff"
  };

  const titleStyle = {
    marginBottom: "12px",
    fontWeight: "bold",
    fontSize: "20px"
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default Card;
