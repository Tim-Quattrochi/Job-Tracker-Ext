import JobForm from "./JobForm";
import { describe, it, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  getByRole,
  screen,
  selectElement,
  getByLabelText,
} from "@testing-library/react";

function elements() {
  const dateApplied = screen.getByLabelText(/date applied:/i);
  const jobTitle = screen.getByLabelText(/job title:/i);
  const company = screen.getByRole("textbox", {
    name: /company:/i,
  });
  const status = screen.getByText(/status:/i);
  const additionalNotes = screen.getByRole("textbox", {
    name: /additional notes:/i,
  });
  const addJobBtn = screen.getByRole("button", {
    name: /add job/i,
  });
  return {
    dateApplied,
    jobTitle,
    company,
    status,
    additionalNotes,
    addJobBtn,
  };
}
describe("it should render 5 inputs and a button", () => {
  const addJob = vi.fn();
  render(<JobForm addJob={addJob} />);

  const {
    dateApplied,
    jobTitle,
    company,
    status,
    additionalNotes,
    addJobBtn,
  } = elements();

  it("should render a form with 5 inputs and a button", () => {
    expect(dateApplied).toBeInTheDocument();
    expect(jobTitle).toBeInTheDocument();
    expect(company).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(additionalNotes).toBeInTheDocument();
    expect(addJobBtn).toBeInTheDocument();
  });

  it("should call addJob when the form is submitted with valid data", () => {
    const { getByLabelText, getByRole } = render(
      <JobForm addJob={addJob} />
    );

    fireEvent.change(elements().jobTitle, {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(getByLabelText("Company:"), {
      target: { value: "Google" },
    });
    fireEvent.change(elements().dateApplied, {
      target: { value: "2020-05-24" },
    });
    fireEvent.change(elements().additionalNotes, {
      target: { value: "I really am interested in this one." },
    });
    fireEvent.change(getByLabelText("Status:"), {
      target: { value: "Applied" },
    });
    fireEvent.click(getByRole("button", { name: "Add Job" }));

    expect(addJob).toHaveBeenCalledWith({
      title: "Software Engineer",
      company: "Google",
      status: "Applied",
      dateApplied: "2020-05-24",
      additional: "I really am interested in this one.",
    });
  });
});
