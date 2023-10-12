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
  dateApplied: new Date().toLocaleDateString() || "",
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
    if (!jobData.title || !jobData.company || !jobData.status) return;
    addJob(jobData);
    setJobData(initialJobState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-primary-300 flex flex-col p-2 m-2 gap-1"
    >
      <label
        htmlFor="dateApplied"
        className="text-polo-blue-200 font-bold"
      >
        Date Applied:
      </label>
      <input
        type="date"
        name="dateApplied"
        id="dateApplied"
        className="p-2"
        value={jobData.dateApplied}
        onChange={handleInputChange}
      />
      <label htmlFor="title" className="text-polo-blue-200 font-bold">
        Job Title:{" "}
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Job Title"
        className="p-2"
        value={jobData.title}
        onChange={handleInputChange}
      />

      <label
        htmlFor="company"
        className="py-2 text-polo-blue-200 font-bold"
      >
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

      <label
        htmlFor="category"
        className="py-2 text-polo-blue-200 font-bold"
      >
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

      <label
        htmlFor="additional"
        className="flex flex-col py-2 text-polo-blue-200 font-bold"
      >
        Additional Notes:
      </label>
      <textarea
        id="additional"
        className="mt-1"
        name="additional"
        value={jobData.additional}
        onChange={handleInputChange}
      >
        {jobData.additional}
      </textarea>

      <button
        type="submit"
        className="bg-polo-blue-500 text-polo-blue-100 mt-5 p-2 border w-20 mx-auto rounded"
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
