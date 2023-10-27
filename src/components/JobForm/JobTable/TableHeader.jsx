const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-primary-100">
        <th className="py-4 px-3 text-primary-1000">Date Applied</th>
        <th className="py-4 px-3 text-primary-1000">Job Title</th>
        <th className="py-4 px-3 text-primary-1000">Company Name</th>
        <th className="py-4 px-3 text-primary-1000">Status</th>
        <th className="py-4 px-3 text-primary-1000">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
