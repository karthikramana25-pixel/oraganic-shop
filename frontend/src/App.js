import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ProductList from "./ProductList";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  if (!loggedIn) {
    return showRegister
      ? <Register onSwitch={() => setShowRegister(false)} />
      : <Login onLogin={() => setLoggedIn(true)} onSwitch={() => setShowRegister(true)} />;
  }

  return (
    <div>
      <h1>My Organic Shop</h1>
      <button onClick={() => {localStorage.clear(); setLoggedIn(false);}}>Logout</button>
      <ProductList />
    </div>
  );
}

export default App;
