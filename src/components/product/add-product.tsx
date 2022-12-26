import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { State } from "../../enum/state";

type Props = {};

const AddProduct = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Row>
      <Col md={{ span: 5, offset: 9 }}>
        <Button
          variant="primary"
          onClick={() =>
            navigate("product", { state: { productState: State.ADD } })
          }
        >
          Add
        </Button>
      </Col>
    </Row>
  );
};

export default AddProduct;
