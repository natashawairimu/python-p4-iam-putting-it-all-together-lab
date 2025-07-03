import React, { useState } from "react";


function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, image_url, bio, password }),
    }).then((r) => {
      
      if (r.ok) {
        r.json().then(onLogin);
      } else {
        r.json().then((err) => setErrors(err.errors || [err.error]));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={image_url}
        placeholder="Profile Image URL"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <textarea
        value={bio}
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
      ))}
    </form>
  );
}

export default SignUpForm;
