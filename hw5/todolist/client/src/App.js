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

  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: []
  })

  const [postsResponse, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: {Authorization: `${state?.user?.access_token}`},
  }));

  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (postsResponse && postsResponse.isLoading === false && postsResponse.data) {
      dispatch({type: "FETCH_POSTS", posts: postsResponse.data.posts.reverse()});
    }
  }, [postsResponse]);

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
