import React from 'react';
import Post from './Post';

export default function PostList({posts = [], dispatch}) {
  return (
    <div>
      {posts.map((p, i) =>
        <Post {...p} dispatch={dispatch} postKey={p.postKey}/>
      )}
    </div>
  );
}