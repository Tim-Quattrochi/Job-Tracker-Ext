import downArrow from "../../assets/chevron-down.svg";

const SelectInput = ({ handleSelectChange, selectedStatus }) => {
  return (
    <div className="relative  ">
      <img
        className="pointer-events-none w-6 h-6 absolute top-5 transform -translate-y-1/2 right-1 pr-1"
        src={downArrow}
      />
      <select
        className="w-40 h-10 px-5 py-2  border border-primary-1000 rounded-lg ml-3  appearance-none text-primary-1000 text-base "
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
    </div>
  );
};

export default SelectInput;
