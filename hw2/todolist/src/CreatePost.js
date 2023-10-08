import {useState} from "react";

export default function CreatePost({user, handleAddPost}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleTitle(evt) {
    setTitle(evt.target.value)
  }

  function handleDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleCreate() {
    const newPost = {title: title, description: description, author: user}
    handleAddPost(newPost);
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