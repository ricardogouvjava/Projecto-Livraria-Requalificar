import React from "react";
import { useNavigate } from "react-router-dom";

export function Logout(props) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/");
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}
