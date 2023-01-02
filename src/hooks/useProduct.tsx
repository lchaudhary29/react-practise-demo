import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import { State } from "../enum/state";
import axios, { AxiosResponse } from "axios";

export const generateQuickGuid = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
const getStatusLabel = (status: State): string => {
  switch (status) {
    case State.DETAIL:
      return "Close";
    case State.DELETE:
      return "Delete";
    default:
      return "Save";
  }
};

type Props = { id?: string };

const defaultProduct: IProduct = {
  id: "",
  productName: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
};

const useProduct = ({ id }: Props) => {
  const [product, setProduct] = useState<IProduct>(defaultProduct);

  useEffect(() => {
    if (!id) {
      defaultProduct.id = generateQuickGuid();
      setProduct(defaultProduct);
    } else {
      axios.get(`http://localhost:4000/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);

  async function addProduct(product: IProduct): Promise<number> {
    setProduct(product);

    const { status } = await axios.post<IProduct>(
      "http://localhost:4000/products",
      product
    );

    return status;
  }

  async function updateProduct(product: IProduct): Promise<number> {
    setProduct(product);
    const { status } = await axios.put(
      `http://localhost:4000/products/${product.id}`,
      product
    );

    return status;
  }

  async function deleteProduct(productId: string): Promise<number> {
    const { status } = await axios.delete(
      `http://localhost:4000/products/${productId}`
    );

    return status;
  }

  return {
    product,
    setProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getStatusLabel,
  };
};

export default useProduct;
