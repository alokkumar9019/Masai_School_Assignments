import React, { useState, useEffect } from "react";

export default function DailyQuoteViewer() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      setQuote({ content: "Failed to fetch quote. Please try again.", author: "" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();

    const intervalId = setInterval(() => {
      fetchQuote();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <p style={{ fontStyle: "italic", fontSize: "1.25rem", minHeight: 80 }}>
        {loading ? "Loading..." : `"${quote.content}"`}
      </p>
      <p style={{ fontWeight: "bold", marginBottom: 20 }}>{loading ? "" : `- ${quote.author}`}</p>
      <button
        onClick={fetchQuote}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: 4,
          border: "1px solid #007BFF",
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
        disabled={loading}
      >
        Get New Quote
      </button>
    </div>
  );
}
