import {useContext, useState} from "react";
import {StateContext} from "./contexts";
import {useResource} from "react-request-hook";

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const [post, createPost] = useResource(({title, description, dateCreated, completed, author}) => ({
    url: '/posts',
    method: 'post',
    data: {title, description, dateCreated, completed, author}
  }))

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
      author: user
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
        Author: <b>{user}</b>
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