import React, { useState } from "react";

function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2>Count: {count}</h2>
      <div>
        <button onClick={increment} style={{ marginRight: 10, padding: "8px 16px", cursor: "pointer" }}>
          Increment
        </button>
        <button onClick={decrement} style={{ padding: "8px 16px", cursor: count === 0 ? "not-allowed" : "pointer" }} disabled={count === 0}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
