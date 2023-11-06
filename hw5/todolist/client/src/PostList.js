import React from 'react';
import Post from './Post';

export default function PostList({posts = []}) {
  return (
    <div>
      {posts.length === 0 && <h2>No posts found.</h2>}
      {posts.length > 0 && posts.map((p, i) => <Post {...p} id={p._id} key={p._id || p.id}/>)}
    </div>
  );
}