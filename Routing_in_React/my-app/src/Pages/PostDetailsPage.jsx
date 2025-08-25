import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail";

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return <PostDetail post={post} />;
}

export default PostDetailsPage;
