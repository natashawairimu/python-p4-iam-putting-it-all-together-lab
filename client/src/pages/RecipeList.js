import React, { useEffect, useState } from "react";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((r) => {
        if (r.ok) {
          r.json().then(setRecipes);
        } else {
          r.json().then((err) => setErrors(err.errors || [err.error]));
        }
      });
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
      ))}
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p><strong>By:</strong> {recipe.user.username}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Time:</strong> {recipe.minutes_to_complete} minutes</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



export default RecipeList;
