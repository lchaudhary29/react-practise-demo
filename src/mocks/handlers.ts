import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/products", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "xyzab",
          productName: "Apple",
          unitPrice: 20,
          quantity: 3,
          totalPrice: 60,
        },
        {
          id: "xyzac",
          productName: "Orange",
          unitPrice: 10,
          quantity: 5,
          totalPrice: 50,
        },
        {
          id: "xyzad",
          productName: "Banana",
          unitPrice: 5,
          quantity: 12,
          totalPrice: 60,
        },
      ])
    );
  }),
];
