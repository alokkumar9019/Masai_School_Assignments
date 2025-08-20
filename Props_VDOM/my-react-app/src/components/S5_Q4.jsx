import React, { useState } from "react";

function AutoCorrectApp() {
  const [inputText, setInputText] = useState("");

  const corrections = {
    teh: "the",
    recieve: "receive",
    adress: "address",
    wierd: "weird",
    thier: "their",
  };

  const getCorrectedText = (text) => {
    return text
      .split(" ")
      .map((word) => corrections[word] || word)
      .join(" ");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here..."
        style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 12 }}
      />
      <div>
        <strong>Corrected Preview:</strong>
        <p style={{ marginTop: 8, fontSize: 18 }}>{getCorrectedText(inputText)}</p>
      </div>
    </div>
  );
}

export default AutoCorrectApp;
