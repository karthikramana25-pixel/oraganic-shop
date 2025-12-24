import React, { useEffect, useState } from "react";
import { authFetch } from "./api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    authFetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
