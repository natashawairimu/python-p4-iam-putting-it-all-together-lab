import React from "react";
import { Link, useHistory } from "react-router-dom";

function NavBar({ user, setUser }) {
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/");
      }
    });
  }

  return (
    <nav>
      <span>Welcome, {user.username}!</span>
      <Link to="/">Home</Link>
      <Link to="/new">New Recipe</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}



export default NavBar;
