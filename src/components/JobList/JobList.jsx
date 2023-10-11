function JobList({ jobs }) {
  return (
    <ul>
      {jobs.map((job, index) => (
        <li key={index}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.status}</p>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
