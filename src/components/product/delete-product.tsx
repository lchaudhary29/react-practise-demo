import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { State } from "../../enum/state";

type Props = {
  id: string;
};

const DeleteProduct = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="primary"
      onClick={() =>
        navigate("product", {
          state: { id: props.id, productState: State.DELETE },
        })
      }
    >
      Delete
    </Button>
  );
};

export default DeleteProduct;
