import React from "react";
import "./Feed.css";
import { Link } from "react-router-dom";

export const Feed = () => {

  const messageArray = [
    'hello!',
    'hello',
    'follow me',
    'ok!',
    'blablablabla bla bla bla bla long message',
    'blablablabla bla bla also long message'
  ]

  return (
    <div className="Feed">
      <Link to="/">back</Link>
    </div>
  );
};
