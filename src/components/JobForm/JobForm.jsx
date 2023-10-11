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
  status: "",
};

// eslint-disable-next-line react/prop-types
function JobForm({ addJob }) {
  const [jobData, setJobData] = useState(initialJobState);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={jobData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={jobData.company}
        onChange={handleInputChange}
      />
      <select
        role="combobox"
        name="status"
        value={jobData.status}
        onChange={handleInputChange}
      >
        {categories.map((cat) => (
          <option key={cat.value} role="option" value={cat.value}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
