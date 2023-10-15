import React, {useContext} from 'react';
import {ThemeContext} from "./contexts";

export default function Post({postKey, title, description, author, dateCreated, completed, dateCompleted, dispatch}) {
  const {secondaryColor} = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    dispatch({
      type: "TOGGLE_POST",
      postKey: postKey
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_POST",
      postKey: postKey
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
