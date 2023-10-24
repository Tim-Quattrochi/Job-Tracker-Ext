import React from "react";

const SelectInput = ({ handleSelectChange, selectedStatus }) => {
  return (
    <select
      className="p-2 border border-gray-300 rounded ml-2 mb-4"
      value={selectedStatus}
      onChange={handleSelectChange}
    >
      <option value="">Filter by status</option>
      <option value="Applied">Applied</option>
      <option value="Interviewing">Interviewing</option>
      <option value="Rejected">Rejected</option>
      <option value="Offered">Offered</option>
      <option value="Accepted">Accepted</option>
    </select>
  );
};

export default SelectInput;
