import React, { useState } from "react";
import ProductList from "./ProductList";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <h1>My Organic Shop</h1>
      <p>Welcome, {user.name}</p>
      <ProductList />
    </div>
  );
}

export default App;
