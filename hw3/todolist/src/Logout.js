import {useContext} from "react";
import {StateContext} from "./contexts";

export default function Logout() {
  const {user, dispatch: dispatchUser} = useContext(StateContext);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      dispatchUser({type: "LOGOUT"});
    }}>
      Logged in as: <b>{user}</b>
      <input type="submit" value="Logout"/>
    </form>
  )
}
