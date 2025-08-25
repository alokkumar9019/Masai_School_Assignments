import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => (
  <div>
    {posts.length === 0 ? (
      <p>No posts found.</p>
    ) : (
      posts.map(post => <PostItem key={post.id} post={post} />)
    )}
  </div>
);

export default PostList;
