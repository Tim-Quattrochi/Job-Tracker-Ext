import { useGetJobByUserIdQuery } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";

function JobList() {
  const { user } = useAuth();

  const { data, error, isLoading } = useGetJobByUserIdQuery(user?.id);

  if (error && error.status === 404) {
    return (
      <div className="flex flex-col justify-center h-auto ">
        <div className=" text-xl font-bold py-6 flex mx-auto">
          No jobs applied to yet.
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col justify-center divide-y divide-gray-200">
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
                {job.additionalDetails}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default JobList;
