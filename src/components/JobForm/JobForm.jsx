import { useState } from "react";

const categories = [
  { name: "-Select a status-", value: "" },
  { name: "applied", value: "Applied" },
  { name: "interviewed", value: "Interviewed" },
  { name: "rejected", value: "Rejected" },
  { name: "offered", value: "Offered" },
  { name: "accepted", value: "Accepted" },
];

const initialJobState = {
  title: "",
  company: "",
  dateApplied: Date.now(),
  additional: "",
  status: "",
};

// eslint-disable-next-line react/prop-types
function JobForm({ addJob }) {
  const [jobData, setJobData] = useState(initialJobState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setJobData({
        ...jobData,
        status: value,
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(jobData);
    setJobData(initialJobState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-2 m-2 gap-1"
    >
      <label htmlFor="title">Job Title: </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Job Title"
        className="p-2"
        value={jobData.title}
        onChange={handleInputChange}
      />

      <label htmlFor="company" className="py-2">
        Company:
      </label>
      <input
        type="text"
        name="company"
        id="company"
        className="p-2"
        placeholder="Company"
        value={jobData.company}
        onChange={handleInputChange}
      />

      <label htmlFor="category" className="py-2">
        Status:
      </label>
      <select
        role="combobox"
        name="status"
        id="category"
        className="p-2"
        value={jobData.status}
        onChange={handleInputChange}
      >
        {categories.map((cat) => (
          <option key={cat.value} role="option" value={cat.value}>
            {cat.name}
          </option>
        ))}
      </select>

      <label htmlFor="additional" className="flex flex-col py-2">
        Additional Notes:
      </label>
      <textarea id="additional" className="mt-1">
        {jobData.additional}
      </textarea>

      <button
        type="submit"
        className="mt-5 border w-20 mx-auto rounded"
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
