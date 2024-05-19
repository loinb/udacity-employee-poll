import { connect } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("User Name or Password must input");
    } else {
      dispatch(handleLogin(username, password));
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div>
      <h1 data-testid="login-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div data-mdb-input-init className="form-outline mb-4">
          <label>User Name</label>
          <input
            value={username}
            onChange={handleUsername}
            type="text"
            name="username"
            id="username"
            data-testid="username"
            className="form-control"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label>Password</label>
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            name="password"
            id="password"
            data-testid="password"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
