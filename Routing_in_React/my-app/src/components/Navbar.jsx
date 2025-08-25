import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{
    background: "#222", padding: "1rem", marginBottom: "2rem"
  }}>
    <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>Home</Link>
    <Link to="/about" style={{ color: "#fff" }}>About</Link>
  </nav>
);

export default Navbar;
