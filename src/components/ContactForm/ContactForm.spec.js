import React from "react";

import "mutationobserver-shim"

import {render} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import ContactForm from "./ContactForm";


describe("ContactForm", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ContactForm />
    );

    expect(container.firstChild).not.toBeNull()
  })
});
