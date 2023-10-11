import JobForm from "./JobForm";
import { describe, it, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  getByRole,
  screen,
  selectElement,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("it should display the categories and contain 6 choices.", () => {
  const addJob = vi.fn();
  render(<JobForm addJob={addJob} />);

  const select = screen.getAllByRole("option");

  const applied = screen.getByRole("option", {
    name: /applied/i,
  });

  expect(applied).toHaveValue("Applied");
  expect(select).toHaveLength(6);
});
