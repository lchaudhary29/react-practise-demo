import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { State } from "../../enum/state";

type Props = {
  id: string;
};

const EditProduct = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="primary"
      onClick={() =>
        navigate("product", {
          state: { id: props.id, productState: State.EDIT },
        })
      }
    >
      Edit
    </Button>
  );
};

export default EditProduct;
