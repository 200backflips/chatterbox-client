import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { Login } from './components/login/Login';
import { ChatRoom } from './components/chatroom/ChatRoom';

function App() {
  return (
<Switch>
  <Redirect exact from="/" to="/login" />
  <Route path="/login" component={Login} />
  <Route path="/chat" component={ChatRoom} />
</Switch>
  );
}

export default App;
