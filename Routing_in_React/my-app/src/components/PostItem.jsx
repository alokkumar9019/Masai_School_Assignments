import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => (
  <div style={{
    border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem",
    borderRadius: 6
  }}>
    <h2>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </h2>
    <span>
      {Array.isArray(post.tags) &&
        post.tags.map(tag =>
          <span
            key={tag}
            style={{
              marginRight: "0.5rem",
              background: "#f6f6f6",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "0.8rem"
            }}
          >{tag}</span>
        )
      }
    </span>
  </div>
);

export default PostItem;
