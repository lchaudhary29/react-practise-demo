import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddProduct from "../product/add-product";
import { IProduct } from "../../models/product";
import axios from "axios";
import EditProduct from "../product/edit-product";
import DetailProduct from "../product/detail-product";
import DeleteProduct from "../product/delete-product";

type Props = {
  //addHandler: (product: IProducts) => void;
};

const Products = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.productName}</td>
                <td>{p.unitPrice}</td>
                <td>{p.quantity}</td>
                <td>{p.totalPrice}</td>
                <td>
                  <ButtonGroup className="mb-2">
                    <EditProduct id={p.id}></EditProduct>
                    <DeleteProduct id={p.id}></DeleteProduct>
                    <DetailProduct id={p.id}></DetailProduct>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddProduct></AddProduct>
    </>
  );
};

export default Products;
