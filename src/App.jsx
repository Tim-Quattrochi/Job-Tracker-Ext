import { useState } from "react";
import JobForm from "./components/JobForm/JobForm";
import JobList from "./components/JobList/JobList";

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <main className="bg-blue-500">
      <h1> My Job Tracker </h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} />
    </main>
  );
}

export default App;
