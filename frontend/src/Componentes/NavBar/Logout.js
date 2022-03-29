import React from "react";
import { useNavigate } from "react-router-dom";

export function Logout(props) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        props.user(null);
        navigate("/");
        console.log(props.user);
      }}
    >
      Logout
    </button>
  );
}
