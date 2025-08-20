import React, { useState } from "react";

function ProductCard({ name, price, image, discount }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "16px",
    maxWidth: "280px",
    textAlign: "center",
    position: "relative",
    marginBottom: "20px",
  };

  const discountBadgeStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#ff4d4f",
    color: "white",
    padding: "4px 8px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "0.9rem",
  };

  return (
    <div style={cardStyle}>
      {discount !== undefined && discount !== null && discount > 0 && discount <= 100 && (
        <div style={discountBadgeStyle}>{discount}% OFF</div>
      )}
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h3 style={{ margin: "12px 0 6px" }}>{name}</h3>
      <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>${price.toFixed(2)}</p>
    </div>
  );
}

function ProductForm() {
  const initialForm = { name: "", price: "", image: "", discount: "" };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.price || Number(formData.price) <= 0)
      errs.price = "Price must be a positive number";
    if (!formData.image || !formData.image.startsWith("http"))
      errs.image = "Image URL must be valid and start with http";
    if (formData.discount) {
      const disc = Number(formData.discount);
      if (isNaN(disc) || disc < 0 || disc > 100)
        errs.discount = "Discount must be between 0 and 100";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newProduct = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      discount: formData.discount ? Number(formData.discount) : undefined,
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
            />
          </label>
          {errors.name && <p style={{ color: "red", margin: 0 }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
            />
          </label>
          {errors.price && <p style={{ color: "red", margin: 0 }}>{errors.price}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
            />
          </label>
          {errors.image && <p style={{ color: "red", margin: 0 }}>{errors.image}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Discount (optional):
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "6px" }}
              min="0"
              max="100"
            />
          </label>
          {errors.discount && <p style={{ color: "red", margin: 0 }}>{errors.discount}</p>}
        </div>

        <button type="submit" style={{ padding: "10px 16px", fontSize: "1rem", cursor: "pointer" }}>
          Add Product
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {products.length === 0 && <p>No products added yet.</p>}
        {products.map((prod, idx) => (
          <ProductCard key={idx} {...prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductForm;
