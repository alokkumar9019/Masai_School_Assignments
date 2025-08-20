import React, { useState } from "react";

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <button
      onClick={toggle}
      style={{
        padding: "10px 20px",
        fontWeight: "bold",
        color: isOn ? "green" : "red",
        cursor: "pointer",
        border: "1px solid",
        borderColor: isOn ? "green" : "red",
        borderRadius: 4,
        background: "transparent",
      }}
    >
      {isOn ? "ON" : "OFF"}
    </button>
  );
}

export default ToggleButton;
