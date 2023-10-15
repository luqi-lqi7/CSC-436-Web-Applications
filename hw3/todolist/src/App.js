import './App.css';
import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
import {useEffect, useReducer, useState} from "react";
import PostList from "./PostList";
import appReducer from "./reducers";
import Header from "./Header";
import {ThemeContext, StateContext} from "./contexts";
import ChangeTheme from "./ChangeTheme";
import {v4 as uuidv4} from "uuid";

function App() {

  const initialPostState = [{
    postKey: uuidv4(),
    title: "React Hooks",
    description: "The greatest thing since sliced bread!",
    author: "Daniel Bugl",
    dateCreated: "2021-10-01T12:00:00Z",
    completed: false
  }, {
    postKey: uuidv4(),
    title: "Using React Fragments",
    description: "Keeping the DOM tree clean!",
    author: "Daniel Bugl",
    dateCreated: "2021-10-01T12:00:00Z",
    completed: false
  }, {
    postKey: uuidv4(),
    title: "React's New Context API",
    description: "A complete game changer!",
    author: "Daniel Bugl",
    dateCreated: "2021-10-01T12:00:00Z",
    completed: false
  },];

  const [state, dispatch] = useReducer(appReducer, {
    user: '', posts: initialPostState
  })

  const [theme, setTheme] = useState({primaryColor: 'red', secondaryColor: 'blue'});

  const {user, posts} = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s Blog`
    } else {
      document.title = 'Blog'
    }
  }, [user])

  const handleAddPost = (newPost) => {
    dispatch({
      type: "CREATE_POST", ...newPost
    })
  }

  return (<div>
    <StateContext.Provider value={{state, dispatch}}>
      <ThemeContext.Provider value={theme}>
        <Header text={"My To Do List"}/>
        <ChangeTheme theme={theme} setTheme={setTheme}/>
        <UserBar/>
        <CreatePost user={user} handleAddPost={handleAddPost}/>
        <PostList posts={posts} dispatch={dispatch}/>
      </ThemeContext.Provider>
    </StateContext.Provider>

  </div>)
}

export default App;
