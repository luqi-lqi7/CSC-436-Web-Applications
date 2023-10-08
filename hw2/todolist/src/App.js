import './App.css';
import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
import {useReducer} from "react";
import PostList from "./PostList";

function App() {
  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }

  const [user, dispatchUser] = useReducer(userReducer, "");

  function postReducer(state, action) {
    switch (action.type) {
      case "CREATE_POST":
        const newPost = {
          title: action.title,
          description: action.description,
          author: action.author,
          dateCreated: new Date().toLocaleString()
        };
        return [newPost, ...state];
      default:
        return state;
    }
  }

  const [posts, dispatchPosts] = useReducer(postReducer, []);

  const handleAddPost = (newPost) => {
    dispatchPosts({
      type: "CREATE_POST",
      ...newPost
    })
  }

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatchUser}/>
      <CreatePost user={user} handleAddPost={handleAddPost}/>
      <PostList posts={posts}/>
    </div>
  )
}

export default App;
