import React from "react";
import { render, screen } from "@testing-library/react";
import Products from "./products";

const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUseLocation,
}));

describe("Products", () => {
  //   test("list to be present", () => {
  //     render(<Products />);
  //     const listElement = screen.getByRole("list");
  //     expect(listElement).toBeInTheDocument();
  //   });

  test("product to have count 3", async () => {
    render(<Products />);
    const listElement = await screen.findAllByRole("row");
    expect(listElement).toHaveLength(1);
  });
});
