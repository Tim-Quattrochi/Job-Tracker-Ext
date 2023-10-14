import { useGetJobByUserIdQuery } from "../../services/auth";

function JobList({ jobs = null }) {
  const { data, error, isLoading } = useGetJobByUserIdQuery(5); //hard code user id for now.

  return (
    <ul className="divide-y divide-gray-200">
      {data &&
        data.map((job) => (
          <li key={job.id} className="py-6 flex text-center">
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">
                {job.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {job.companyName}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {job.dateApplied}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {job.status}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {job.additional}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default JobList;
