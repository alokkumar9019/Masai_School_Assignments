import React, { useState } from "react";

function ColorToggleButton() {
  const [color, setColor] = useState("green");

  const toggleColor = () => {
    setColor((prev) => (prev === "green" ? "yellow" : "green"));
  };

  const buttonStyle = {
    backgroundColor: color,
    color: color === "green" ? "white" : "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button style={buttonStyle} onClick={toggleColor}>
        Color: {color.charAt(0).toUpperCase() + color.slice(1)}
      </button>
      <p>
        Current Color: {color.charAt(0).toUpperCase() + color.slice(1)}
      </p>
    </div>
  );
}

export default ColorToggleButton;
