import React, { useReducer } from "react";

export default function App() {
  function themeReducer(state, action) {
    switch (action.type) {
      case "TOGGLE_THEME":
        return {
          ...state,
          theme: state.theme === "light" ? "dark" : "light"
        };
      default:
        return state;
    }
  }

  const initialState = { theme: "light" };
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const lightTheme = {
    backgroundColor: "#f5f5f5",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };

  const darkTheme = {
    backgroundColor: "#333",
    color: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };

  return (
    <div style={state.theme === "light" ? lightTheme : darkTheme}>
      <h1>{state.theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}</h1>
      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: state.theme === "light" ? "#333" : "#f5f5f5",
          color: state.theme === "light" ? "#fff" : "#333",
          fontWeight: "bold"
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
