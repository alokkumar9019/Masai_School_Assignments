import React, { useReducer } from "react";

export default function App() {
  function counterReducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  const initialState = { count: 0 };

  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontFamily: "sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Counter App</h1>
      <h2>Count: {state.count}</h2>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Increment
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
