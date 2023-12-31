import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination"; // Importa el componente Pagination

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const totalProducts = products.length;

  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const products = await data.json();
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <>
      <div className="container-products">
        {products
          .map((product) => (
            <div className="card-product" key={product.id}>
              <figure className="container-img">
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="info-product">
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))
          .slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
      />
    </>
  );
};
