const JobTable = ({ data, results, formatDate, deleteJob }) => {
  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Date Applied</th>
          <th className="p-2">Job Title</th>
          <th className="p-2">Company Name</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          results &&
          results.map((job) => (
            <tr key={job.id || job.item.id}>
              <td className="p-2">
                {formatDate(job.item?.dateApplied || job.dateApplied)}
              </td>
              <td className="p-2">{job.item?.title || job.title}</td>
              <td className="p-2">
                {job.item?.companyName || job.companyName}
              </td>
              <td className="p-2">
                {job.item?.status || job.status}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default JobTable;
