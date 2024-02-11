import React, { useRef } from "react";
import Dashboard from "./Dashboard";

function LoginWithLocalStorage() {
  const email = useRef();
  const password = useRef();
  const getEmail = localStorage.getItem("emailData");
  const getPassword = localStorage.getItem("passwordData");

  const handleSubmit = () => {
    if (email.current.value === "root" && password.current.value === "toor") {
      localStorage.setItem("emailData", "root");
      localStorage.setItem("passwordData", "toor");
    }
  };

  const formStyle = {
    width: "300px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {getEmail && getPassword ? (
        <Dashboard />
      ) : (
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <input
              type="text"
              placeholder="Enter email"
              ref={email}
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              ref={password}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginWithLocalStorage;
