import React from "react";
import { useGetJobListingsQuery } from "./jobListingSlice";

const JobListings = () => {
  const { data } = useGetJobListingsQuery();

  console.log(data && data.jobs);
  return (
    <div>
      <h2>Remote Job Listings</h2>
      <ul>
        {data &&
          data.jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.job.title}</h3>
              <p>{job.company_name}</p>
              <p>{job.category}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default JobListings;
