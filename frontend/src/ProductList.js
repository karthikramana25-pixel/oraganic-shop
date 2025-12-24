import React, { useEffect, useState } from "react";
import { getProducts } from "./api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h2>Organic Products</h2>
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
