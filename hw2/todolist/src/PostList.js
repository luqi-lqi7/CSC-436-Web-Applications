import Post from "./Post";
import { v4 as uuidv4 } from 'uuid';

export default function PostList({posts = []}) {
  return (
    <div>
      {posts.map((p, i) =>
        <Post {...p} key={uuidv4()}/>
      )}
    </div>)
}