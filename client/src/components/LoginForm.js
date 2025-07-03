import React, { useState } from "react";


function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),

    }).then((r) => {
      
      if (r.ok) {
        r.json().then(onLogin);
      } else {
        r.json().then((err) => setErrors(err.error ? [err.error] : err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
      ))}
    </form>
  );
}

export default LoginForm;
