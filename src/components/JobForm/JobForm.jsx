import { useState } from "react";
import { useAddJobDataMutation } from "../../features/jobs/jobApi";
import { useAuth } from "../../hooks/useAuth";
import TextEdit from "../TextEditor/TextEdit";

const categories = [
  { name: "-Select a status-", value: "" },
  { name: "Applied", value: "Applied" },
  { name: "Interviewing", value: "Interviewing" },
  { name: "Rejected", value: "Rejected" },
  { name: "Offered", value: "Offered" },
  { name: "Accepted", value: "Accepted" },
];

const initialJobState = {
  userId: "",
  title: "",
  companyName: "",
  dateApplied: new Date(Date.now()).toISOString().split("T")[0], //Todays date.
  additionalDetails: "",
  status: "",
};

// eslint-disable-next-line react/prop-types
function JobForm({ setShowModal }) {
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

      setJobData(initialJobState);
      setShowModal(false);
    } catch (error) {
      console.error("rejected", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[440px] h-[527px] px-8 pt-16 pb-8 bg-white rounded-xl shadow flex-col justify-start items-end gap-6 inline-flex overflow-y-scroll no-scrollbar"
    >
      <label
        htmlFor="dateApplied"
        className="w-full flex flex-col items-start gap-2 text-black font-normal"
      >
        Date Applied:
        <input
          type="date"
          name="dateApplied"
          id="dateApplied"
          className="border-solid border-primary-600 border mb-2 py-2 px-5 w-full
    rounded-lg text-gray-700"
          min={
            //two weeks before today
            new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          }
          max={
            // one month from today
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          }
          value={jobData.dateApplied}
          onChange={handleInputChange}
        />
      </label>
      <label
        htmlFor="title"
        className="w-full flex flex-col items-start gap-2 text-black font-normal"
      >
        Job Title:
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Job Title"
          className="border-solid border-primary-600 border mb-2 py-2 px-5 w-full
    rounded-lg text-gray-700"
          value={jobData.title}
          onChange={handleInputChange}
        />
      </label>
      <label
        htmlFor="company"
        className="w-full flex flex-col items-start gap-2 text-black font-normal"
      >
        Company:
        <input
          type="text"
          name="companyName"
          id="company"
          className="border-solid border-primary-600 border mb-2 py-2 px-5 w-full
    rounded-lg text-gray-700"
          placeholder="Company"
          value={jobData.companyName}
          onChange={handleInputChange}
        />
      </label>
      <label
        htmlFor="category"
        className="w-full flex flex-col items-start gap-2 text-black font-normal"
      >
        Status:
        <select
          role="combobox"
          name="status"
          id="category"
          className="border-solid border-gray-300 border py-2 px-4 w-full
    rounded-lg text-gray-700"
          value={jobData.status}
          onChange={handleInputChange}
        >
          {categories.map((cat) => (
            <option key={cat.value} role="option" value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="additionalDetails"
        className="flex flex-col items-start gap-2 w-full "
      >
        <span className=" text-black text-base font-normal font-inter">
          Additional Notes:
        </span>
        <div className="border border-primary-500 rounded-lg w-full min-h-full">
          <TextEdit
            content={jobData.additionalDetails}
            onChange={handleTextEditChange}
            id="additionalDetails"
          />
        </div>
      </label>
      <button
        disabled={isLoading}
        className="mt-10 w-full h-12 bg-primary-600 hover:bg-polo-blue-700 text-white border shadow py-3 px-6 font-normal font-inter text-base rounded-lg border-solid border-primary-500 "
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
