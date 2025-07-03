import React, { useState } from "react";

function NewRecipe({ user }) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [minutes, setMinutes] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    fetch("/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        instructions,
        minutes_to_complete: parseInt(minutes),
      }),
    }).then((r) => {
      
      if (r.ok) {
        r.json().then((recipe) => {
          setSuccess(true);
          setTitle("");
          setInstructions("");
          setMinutes("");
        });
      } else {
        r.json().then((err) => setErrors(err.errors || [err.error]));
      }
    });
  }

  return (
    <div>
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={instructions}
          placeholder="Instructions (min 50 characters)"
          onChange={(e) => setInstructions(e.target.value)}
        />
        <input
          type="number"
          value={minutes}
          placeholder="Minutes to Complete"
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button type="submit">Create Recipe</button>
      </form>

      {success && <p style={{ color: "green" }}>Recipe created successfully!</p>}
      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
      ))}
    </div>
  );
}

export default NewRecipe;
