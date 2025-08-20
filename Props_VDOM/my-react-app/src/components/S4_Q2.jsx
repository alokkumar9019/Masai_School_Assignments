import React, { useState } from "react";

function S4_Q2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <button onClick={loadProducts} style={{ marginBottom: 20, padding: "10px 20px", cursor: "pointer" }}>
        Load Products
      </button>

      {loading && (
        <div style={{ fontSize: 18, fontWeight: "bold" }}>Loading...</div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div>No products to display. Click "Load Products" to fetch data.</div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain", marginBottom: 12 }}
            />
            <h3 style={{ fontSize: 16, height: "3em", overflow: "hidden", textAlign: "center" }}>{product.title}</h3>
            <p style={{ marginTop: "auto", fontWeight: "bold", fontSize: 18 }}>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default S4_Q2;
