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
        title: action.title,
        description: action.description,
        dateCreated: action.dateCreated,
        completed: action.completed,
        author: action.author,
      };
      return [newPost, ...state];
    case "FETCH_POSTS":
      return action.posts;
    case "TOGGLE_POST":
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            completed: !post.completed,
            dateCompleted: post.completed ? null : new Date().toLocaleString()
          };
        }
        return post;
      });
    case "DELETE_POST":
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action)
  }
}