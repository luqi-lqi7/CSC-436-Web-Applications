import {v4 as uuidv4} from "uuid";

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

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        postKey: uuidv4(),
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: new Date().toLocaleString()
      };
      return [newPost, ...state];
    case "TOGGLE_POST":
      return state.map(post => {
        if (post.postKey === action.postKey) {
          return {
            ...post,
            completed: !post.completed,
            dateCompleted: post.completed ? null : new Date().toLocaleString()
          };
        }
        return post;
      });
    case "DELETE_POST":
      return state.filter(post => post.postKey !== action.postKey);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {user: userReducer(state.user, action), posts: postReducer(state.posts, action)}
}