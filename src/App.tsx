import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Product from "./components/product/product";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/products/products";
import NotFound from "./not-found";
import Layout from "./layout";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Container>
          <BrowserRouter>
            <Layout></Layout>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/product" element={<Product />}>
                <Route path=":productState" element={<Product />} />
                <Route path=":productState/:id" element={<Product />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </main>
    </div>
  );
}

export default App;
