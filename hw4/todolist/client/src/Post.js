import React, {useContext} from 'react';
import {StateContext, ThemeContext} from "./contexts";
import {useResource} from "react-request-hook";

export default function Post({title, description, author, dateCreated, completed, dateCompleted, id}) {
  const {secondaryColor} = useContext(ThemeContext);
  const {dispatch} = useContext(StateContext);

  const [post, deletePost] = useResource(id => ({
    url: `/posts/${id}`,
    method: 'delete'
  }));

  const [updatedPost, togglePost] = useResource((id, completed, dateCompleted) => ({
    url: `/posts/${id}`,
    method: 'patch',
    data: {completed, dateCompleted}
  }));

  const handleCheckboxChange = () => {
    togglePost(id, !completed, completed ? null : new Date().toLocaleString());
    dispatch({
      type: "TOGGLE_POST",
      id: id
    });
  };

  const handleDelete = () => {
    deletePost(id);
    dispatch({
      type: "DELETE_POST",
      id: id
    });
  };

  return (
    <div>
      <h3 style={{color: secondaryColor}}>{title}</h3>
      <div>{description}</div>
      <br/>
      <i>Created by <b>{author}</b></i>
      <br/>
      <i>Created at <b>{dateCreated}</b></i>
      <br/>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        Complete
      </div>
      {completed && <i>Completed at <b>{dateCompleted}</b></i>}
      <br/>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
