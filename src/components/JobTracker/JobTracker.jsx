import { useState } from "react";
import JobForm from "../JobForm/JobForm";
import JobList from "../JobList/JobList";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };
  return (
    <main className=" ">
      <h1 className="text-polo-blue-900 text-center text-4xl font-semibold mt-10">
        My Job Tracker
      </h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} />
    </main>
  );
};

export default JobTracker;
