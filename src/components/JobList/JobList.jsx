function JobList({ jobs = null }) {
  return (
    <ul className={`bg-polo-blue-900 ${!jobs ? "hidden" : ""}`}>
      {jobs.map((job, index) => (
        <li key={index}>
          <h2>{job.title}</h2>
          <p>{job.dateApplied}</p>
          <p>{job.company}</p>
          <p>{job.status}</p>
          <p>{job.additional}</p>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
