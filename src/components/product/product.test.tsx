import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Product, { generateQuickGuid } from "./product";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUseLocation,
}));

describe("product", () => {
  test("renders a count of 10 after clicking the set button", async () => {
    user.setup();
    render(<Product />);
    const amountInput = screen.getByRole("spinbutton", {
      name: "Quantity",
    });
    await user.type(amountInput, "10");
    expect(amountInput).toHaveValue(10);
    // const setButton = screen.getByRole("button", { name: "Set" });
    // await user.click(setButton);
    // const countElement = screen.getByRole("heading");
    // expect(countElement).toHaveTextContent("10");
  });

  test("element are focused in the right order", async () => {
    user.setup();
    render(<Product />);
    const productName = screen.getByRole("textbox", { name: "Product name" });
    await user.tab();
    expect(productName).toHaveFocus();

    const quantity = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.tab();
    expect(quantity).toHaveFocus();

    const unitPrice = screen.getByRole("spinbutton", { name: "Unit Price" });
    await user.tab();
    expect(unitPrice).toHaveFocus();

    const submitButton = screen.getByRole("button");
    await user.tab();
    expect(submitButton).toHaveFocus();
  });

  test("should give guid", () => {
    const guid = generateQuickGuid();
    expect(guid).not.toBeNull();
  });
});
