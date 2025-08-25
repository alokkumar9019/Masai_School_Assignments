import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";

function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.posts || []));
  }, []);

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Blog Posts</h1>
      <input
        type="text"
        placeholder="Search by title…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: 8, margin: "1rem 0", width: "50%" }}
      />
      <PostList posts={filtered} />
    </div>
  );
}

export default Home;
