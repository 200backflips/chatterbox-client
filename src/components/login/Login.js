import React, { useState } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [state, setState] = useState({
    username: "",
    isSubmitting: true,
    errorMsg: "",
    toggleLogin: false
  });

  const username = state.username;

  const fullRegEx = /^([a-zåäö]{1})([\wåäö\-.,]{2,19})$/i;
  const startsWithLetter = /^([a-zåäö]{1})/i;
  const noSpacesAllowed = /( )+/i;

  const handleSubmit = e => {
    e.preventDefault();
    switch (true) {
      case !startsWithLetter.test(username):
        return setState({ ...state, errorMsg: "must begin with letter" });
      case noSpacesAllowed.test(username):
        return setState({ ...state, errorMsg: "may not contain spaces" });
      case username.length < 3:
        return setState({
          ...state,
          errorMsg: "must be at least 3 characters"
        });
      case username.length > 20:
        return setState({ ...state, errorMsg: "cannot exceed 20 characters" });
      case fullRegEx.test(username):
        return setState({ ...state, toggleLogin: true });
      default:
        return setState({
          ...state,
          errorMsg: "please try a different nickname"
        });
    }
  };

  const handleUsername = e => {
    const event = e.target.value;
    return setState({ ...state, username: event });
  };

  return state.toggleLogin ? (
    <Redirect
      to={{
        pathname: "/chat",
        username
      }}
    />
  ) : (
    <div className="Login">
      <h1>chatter box</h1>
      <p>enter your nickname below</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" onChange={handleUsername} />
        <span className={state.errorMsg && "error-msg"}>{state.errorMsg}</span>
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};
