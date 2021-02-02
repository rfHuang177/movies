import { useCallback, useState, useEffect } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import "./App.css";

function Login() {
  const [session_id, setSessionId] = useState("");
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { request_token } = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=391415faa44f91d2b92477a8db1e4c22"
    ).then((res) => res.json());

    await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=391415faa44f91d2b92477a8db1e4c22",
      {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          request_token,
        }),
      }
    ).then((res) => res.json());

    const { session_id } = await fetch(
      "https://api.themoviedb.org/3/authentication/session/new?api_key=391415faa44f91d2b92477a8db1e4c22",
      {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ request_token }),
      }
    ).then((res) => res.json());

    const account = await fetch(
      `https://api.themoviedb.org/3/account?api_key=391415faa44f91d2b92477a8db1e4c22&session_id=${session_id}`,
      {
        method: "get",
        headers: { "content-type": "application/json" },
      }
    ).then((res) => res.json());
    localStorage.setItem("session_id", session_id);
    localStorage.setItem("username", JSON.stringify(account.username));
    localStorage.setItem("userid", JSON.stringify(account.id));

    console.log(session_id);
    console.log(account);
    console.log(account.id);
    if (account.username === username) {
      alert("logged in");
      history.push("/");
      window.location.reload();
    } else {
      alert("failed to log in");
      console.log("didn't log in");
    }
  };

  return (
    <div>
      <form>
        <label>
          username:
          <input type="text" value={username} onChange={onChangeUsername} />
        </label>
        <label>
          password:
          <input type="password" value={password} onChange={onChangePassword} />
        </label>
        <input type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
}

export default Login;
