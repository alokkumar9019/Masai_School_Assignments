import React from "react";

const PostDetail = ({ post }) => (
  <div>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
    <div>
      <b>Tags:</b> {post.tags.map(tag =>
        <span key={tag}
          style={{
            marginRight: "0.5rem",
            background: "#f0f0f0",
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "0.85rem"
          }}
        >{tag}</span>
      )}
    </div>
    <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
      <span>Likes: {post.reactions?.likes ?? 0}</span> |{" "}
      <span>Dislikes: {post.reactions?.dislikes ?? 0}</span> |{" "}
      <span>Views: {post.views}</span>
    </div>
  </div>
);

export default PostDetail;
