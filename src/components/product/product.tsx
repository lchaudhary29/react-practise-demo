import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { object, string, number } from "yup";
import { IProduct } from "../../models/product";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { State } from "../../enum/state";

const schema = object().shape({
  productName: string()
    .required("Name is required")
    .max(20, "You can enter only 20 character"),
  quantity: number()
    .required()
    .min(1, "Quantity should be at least 1")
    .max(5, "Quantity should not be more than 5"),
  unitPrice: number().required().min(1, "Price should be at least 1"),
  totalPrice: number().required(),
});

type Props = {};

const defaultProduct: IProduct = {
  id: "",
  productName: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
};

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

const Product = (props: Props) => {
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, productState } = state || {};

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

  const onsubmit = (product: IProduct) => {
    setProduct(product);

    if (productState === State.ADD) {
      axios.post("http://localhost:4000/products", product).then((response) => {
        if (response.status === 201) {
          navigate("/");
        }
      });
    } else if (productState === State.EDIT) {
      axios
        .put(`http://localhost:4000/products/${product.id}`, product)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        });
    } else if (productState === State.DELETE) {
      axios
        .delete(`http://localhost:4000/products/${product.id}`)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onsubmit}
      initialValues={product}
      enableReinitialize={true}
      validateOnChange={false}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Stack gap={3} className="col-md-5">
            <fieldset
              disabled={
                productState === State.DETAIL || productState === State.DELETE
              }
            >
              <Form.Group controlId="validationFormik01">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  isInvalid={!!errors.productName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik02">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={(e) => {
                    handleChange(e);
                    values.totalPrice = values.unitPrice
                      ? parseInt(e.target.value) * values.unitPrice
                      : 0;
                  }}
                  isInvalid={!!errors.quantity}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik03">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Unit Price"
                  name="unitPrice"
                  value={values.unitPrice}
                  onChange={(e) => {
                    handleChange(e);
                    values.totalPrice = values.quantity
                      ? parseInt(e.target.value) * values.quantity
                      : 0;
                  }}
                  isInvalid={!!errors.unitPrice}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.unitPrice}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik04">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total Price"
                  name="totalPrice"
                  value={values.totalPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.totalPrice}
                  readOnly
                  style={{ backgroundColor: "#F2F3F4" }}
                  tabIndex={-1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.totalPrice}
                </Form.Control.Feedback>
              </Form.Group>
            </fieldset>
            <Button type="submit">{getStatusLabel(productState)}</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Product;
