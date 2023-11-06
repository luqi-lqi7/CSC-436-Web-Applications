import {useEffect, useState} from "react";
import {useResource} from "react-request-hook";

export default function Login({dispatchUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false)

  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: {username, password},
  }));

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatchUser({
          type: "LOGIN",
          username: username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function handleUsername(evt) {
    setUsername(evt.target.value)
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <>
      {loginFailed && <span style={{color: 'red'}}>Invalid username or password</span>}
      <form onSubmit={e => {
        e.preventDefault();
        login(username, password);
      }}>
        <label htmlFor="login-username">Username:</label>
        <input type="text" value={username} onChange={handleUsername} name="login-username" id="login-username"/>

        <label htmlFor="login-password">Password:</label>
        <input type="password" value={password} onChange={handlePassword} name="login-password" id="login-password"/>

        <input type="submit" value="Login" disabled={username.length === 0}/>
      </form>
    </>
  )

}