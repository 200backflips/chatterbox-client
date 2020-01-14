import React, { useEffect } from "react";
import "./ChatRoom.css";
import { Header } from "../header/Header";
import { Feed } from "../feed/Feed";
import { Input } from "../input/Input";
import io from "socket.io-client";

let socket;

export const ChatRoom = ({ location }) => {
  const ENDPOINT = "localhost:8080";
  let join = "";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("message", `${location.username} is dumb. yes.`);

    socket.on("join", message => {
      console.log(message);
      join = message;
    });

    return () => {
      socket.emit("disconnect", location.username);
      socket.off();
    };
  }, [ENDPOINT, location]);

  return (
    <div className="ChatRoom">
      <Header />
      <Feed />
      <Input />
    </div>
  );
};
