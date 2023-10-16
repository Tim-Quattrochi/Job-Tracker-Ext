import { useState } from "react";
import JobForm from "../JobForm/JobForm";
import JobList from "../JobList/JobList";
import { useAuth } from "../../hooks/useAuth";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <main className=" ">
      <h1 className="text-polo-blue-900 text-center text-4xl font-semibold mt-10">
        <div className="my-2 font-medium">{user && user.name} 👋</div>
        <span className="p-2 ">Welcome to your Job Tracker</span>
      </h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} addJob={addJob} />
    </main>
  );
};

export default JobTracker;
