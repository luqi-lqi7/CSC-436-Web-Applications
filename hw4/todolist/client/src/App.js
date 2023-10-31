import './App.css';
import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
import {useEffect, useReducer, useState} from "react";
import PostList from "./PostList";
import appReducer from "./reducers";
import Header from "./Header";
import {ThemeContext, StateContext} from "./contexts";
import ChangeTheme from "./ChangeTheme";
import {useResource} from "react-request-hook";

function App() {

  const [postsResponse, getPosts] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if (postsResponse && postsResponse.data) {
      dispatch({type: 'FETCH_POSTS', posts: postsResponse.data})
    }
  }, [postsResponse])

  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: []
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

  return (
    <div>
      <StateContext.Provider value={{state, dispatch}}>
        <ThemeContext.Provider value={theme}>
          <Header text={"My To Do List"}/>
          <ChangeTheme theme={theme} setTheme={setTheme}/>
          <UserBar/>
          <CreatePost/>
          <PostList posts={posts}/>
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>)
}

export default App;
