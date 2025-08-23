import React, { useState } from "react";
function ThemedBox({ theme, children }) {
  const styles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    dark: {
      backgroundColor: "#222222",
      color: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #444",
    },
  };

  return (
    <div style={theme === "light" ? styles.light : styles.dark}>
      {children}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <button
        onClick={toggleTheme}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Toggle Theme (Current: {theme})
      </button>

      <ThemedBox theme={theme}>
        <h2>This is a Themed Box 🎨</h2>
        <p>The theme is now "{theme}".</p>
      </ThemedBox>
    </div>
  );
}
