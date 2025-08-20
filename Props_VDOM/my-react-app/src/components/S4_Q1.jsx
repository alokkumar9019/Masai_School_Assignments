import React from "react";

function S4_Q1() {
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchProducts}>Fetch Products</button>
    </div>
  );
}

export default S4_Q1;
