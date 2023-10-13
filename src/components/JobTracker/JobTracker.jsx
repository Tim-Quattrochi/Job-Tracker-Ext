import { useState } from "react";
import JobForm from "../JobForm/JobForm";
import JobList from "../JobList/JobList";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };
  return (
    <main className="bg-polo-blue-900 w-52 h-full">
      <h1 className="text-polo-blue-200 font-bold text-center p-3">
        My Job Tracker
      </h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} />
    </main>
  );
};

export default JobTracker;