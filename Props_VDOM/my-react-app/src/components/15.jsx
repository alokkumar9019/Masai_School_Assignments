import React, { useState } from "react";

const blogs = [
  { id: 1, title: "React Basics", content: "React is a JavaScript library for building user interfaces." },
  { id: 2, title: "State and Props", content: "State is local to a component, props are passed from parent to child." },
  { id: 3, title: "Hooks", content: "Hooks let you use state and other React features without writing a class." },
];

function BlogList() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div>
      <h2>Blog Titles</h2>
      <ul style={{ cursor: "pointer", paddingLeft: "0" }}>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            onClick={() => setSelectedBlog(blog)}
            style={{
              listStyle: "none",
              padding: "8px 0",
              borderBottom: "1px solid #ddd",
              color: selectedBlog?.id === blog.id ? "blue" : "black"
            }}
          >
            {blog.title}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "24px" }}>
        {selectedBlog ? (
          <>
            <h3>{selectedBlog.title}</h3>
            <p>{selectedBlog.content}</p>
          </>
        ) : (
          <p>Select a blog to read</p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
