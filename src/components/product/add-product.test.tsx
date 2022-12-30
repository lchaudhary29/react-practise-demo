import { render, screen } from "@testing-library/react";
import AddProduct from "./add-product";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("add-product", () => {
  render(<AddProduct />);
  test("Add button present", () => {
    const addElement = screen.getByRole("button", {
      name: "Add",
    });

    expect(addElement).toBeInTheDocument();
  });
});
