import { useState } from "react";
import { useAddJobDataMutation } from "../../features/jobs/jobSlice";
import { useAuth } from "../../hooks/useAuth";
import TextEdit from "../TextEditor/TextEdit";

const categories = [
  { name: "-Select a status-", value: "" },
  { name: "applied", value: "Applied" },
  { name: "interviewed", value: "Interviewed" },
  { name: "rejected", value: "Rejected" },
  { name: "offered", value: "Offered" },
  { name: "accepted", value: "Accepted" },
];

const initialJobState = {
  userId: "",
  title: "",
  companyName: "",
  dateApplied: new Date().toLocaleDateString() || "",
  additionalDetails: "",
  status: "",
};

// eslint-disable-next-line react/prop-types
function JobForm() {
  const { user } = useAuth();
  const [jobData, setJobData] = useState(initialJobState);

  const [createJob, { data, error, isLoading }] =
    useAddJobDataMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setJobData({
        ...jobData,
        userId: user.id,
        status: value,
      });
    } else {
      setJobData({
        ...jobData,
        userId: user.id,
        [name]: value,
      });
    }
  };

  const handleTextEditChange = (content) => {
    setJobData({
      ...jobData,
      additionalDetails: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobData.title || !jobData.companyName || !jobData.status)
      return;

    try {
      await createJob(jobData);

      // setJobData(initialJobState);
    } catch (error) {
      console.error("rejected", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg m-auto py-10 mt-10 px-10 border bg-gradient-to-b from-polo-blue-500 via-polo-blue-600 to-polo-blue-700 rounded-lg"
    >
      <label
        htmlFor="dateApplied"
        className="text-polo-blue-700 font-medium"
      >
        Date Applied:
      </label>
      <input
        type="date"
        name="dateApplied"
        id="dateApplied"
        className="border-solid border-gray-300 border mb-2 py-2 px-4 w-full
    rounded text-gray-700"
        value={jobData.dateApplied}
        onChange={handleInputChange}
      />
      <label
        htmlFor="title"
        className="text-polo-blue-700 font-medium"
      >
        Job Title:
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Job Title"
        className="border-solid border-gray-300 border mb-2 py-2 px-4 w-full rounded
  text-gray-700"
        value={jobData.title}
        onChange={handleInputChange}
      />

      <label
        htmlFor="company"
        className="text-polo-blue-700 font-medium"
      >
        Company:
      </label>
      <input
        type="text"
        name="companyName"
        id="company"
        className="border-solid border-gray-300 border mb-2 py-2 px-4 w-full
    rounded text-gray-700 "
        placeholder="Company"
        value={jobData.companyName}
        onChange={handleInputChange}
      />

      <label
        htmlFor="category"
        className="text-polo-blue-700 font-medium "
      >
        Status:
      </label>
      <select
        role="combobox"
        name="status"
        id="category"
        className="border-solid border-gray-300 border py-2 px-4 w-full
    rounded text-gray-700"
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
        htmlFor="additionalDetails"
        className="text-polo-blue-700 font-medium block mt-4"
      >
        Additional Notes:
      </label>
      <TextEdit
        content={jobData.additionalDetails}
        onChange={handleTextEditChange}
        id="additionalDetails"
      />

      <button
        disabled={isLoading}
        className="mt-4 w-full bg-polo-blue-800 hover:bg-polo-blue-700 text-polo-blue-50 border shadow py-3 px-6 font-semibold text-md rounded"
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
