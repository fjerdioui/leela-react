// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />); // Correctly imported as a component, not a type
  const linkElement = screen.getByText(/learn react/i); // Ensure regular expression is correct
  expect(linkElement).toBeInTheDocument();
});
