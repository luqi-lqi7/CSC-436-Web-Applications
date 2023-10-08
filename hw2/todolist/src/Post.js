import {useState} from "react";

export default function Post({title, description, author, dateCreated, completed}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [dateCompleted, setDateCompleted] = useState("");

  const handleCheckboxChange = () => {
    setIsCompleted(prev => !prev);
    setDateCompleted(new Date().toLocaleString());
  };
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <br/>
      <i>Created by <b>{author}</b></i>
      <br/>
      <i>Created at <b>{dateCreated}</b></i>
      <br/>
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        Complete
      </div>
      {isCompleted && <i>Completed at <b>{dateCompleted}</b></i>}
    </div>
  )
}