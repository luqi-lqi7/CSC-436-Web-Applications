import {useContext, useState} from "react";
import {StateContext} from "./contexts";
import {useResource} from "react-request-hook";

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const [post, createPost] = useResource(({title, description, dateCreated, completed}) => ({
    url: '/post',
    method: 'post',
    headers: {"Authorization": `${state.user.access_token}`},
    data: {title, description, dateCreated, completed}
  }))

  // useEffect(() => {
  //   if (post.isLoading === false && post.data) {
  //     dispatch({
  //       type: "CREATE_POST",
  //       title: post.data.title,
  //       content: post.data.content,
  //       id: post.data.id,
  //       author: user.username,
  //     });
  //   }
  // }, [post]);

  function handleTitle(evt) {
    setTitle(evt.target.value)
  }

  function handleDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleCreate() {
    const newPost = {
      title: title,
      description: description,
      dateCreated: new Date().toLocaleString(),
      completed: false,
      author: user.username
    };
    createPost(newPost);
    dispatch({type: 'CREATE_POST', ...newPost});

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreate();
    }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={handleDescription}
        />
      </div>
      <input type="submit"
             value="Create"
             disabled={title.length === 0}
      />
    </form>)
}