import { formatDate } from "../../../utilities/formatDate";
import { useMemo } from "react";
import SideBar from "../../SideBar/SideBar";
import Modal from "../../Modal/Modal";
import editIcon from "../../../assets/edit.svg";
import trashIcon from "../../../assets/trash-2.svg";
const TableRow = ({
  job,
  editedJob,
  isEditing,
  toggleSidebar,
  isSidebarOpen,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteJob,
  setShowModal,
  getJobData,
  setEditedJob,
  showModal,
  setShowSideBar,
  showSidebars,
  setShowSidebars,
  setJobToDelete,
  jobToDelete,
}) => {
  const formattedDate = useMemo(
    () => formatDate(getJobData(job)?.dateApplied),
    [job]
  );

  return (
    <tr key={job.id}>
      <td className="flex flex-col flex-wrap items-start justify-center content-center px-4 py-5">
        {formattedDate}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <input
            type="text"
            value={editedJob.title}
            onChange={(e) =>
              setEditedJob({ ...editedJob, title: e.target.value })
            }
          />
        ) : (
          <div>
            <span
              className="text-primary-700  cursor-pointer hover:primary-1000 flex flex-col flex-wrap gap-2 items-start justify-center content-center px-4 py-3 font-inter"
              onClick={() => toggleSidebar(job.id)}
            >
              {getJobData(job).title}
            </span>
            {isSidebarOpen(job.id) && (
              <SideBar
                content={getJobData(job)}
                showSidebar={isSidebarOpen(job.id)}
                setShowSidebar={setShowSideBar}
                showSidebars={showSidebars}
                setShowSidebars={setShowSidebars}
                isEditing={isEditing}
                job={job}
                handleSaveClick={handleSaveClick}
                setEditedJob={setEditedJob}
                getJobData={getJobData}
                editedJob={editedJob}
              />
            )}
          </div>
        )}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <input
            type="text"
            value={editedJob.companyName}
            onChange={(e) =>
              setEditedJob({
                ...editedJob,
                companyName: e.target.value,
              })
            }
          />
        ) : (
          <span className="text-black flex flex-col flex-wrap items-start justify-center content-center px-4 py-3">
            {getJobData(job).companyName}
          </span>
        )}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <select
            value={editedJob.status}
            onChange={(e) =>
              setEditedJob({ ...editedJob, status: e.target.value })
            }
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offered">Offered</option>
            <option value="Accepted">Accepted</option>
          </select>
        ) : (
          <span className="text-black text-base font-normal flex flex-col flex-wrap items-start justify-center content-center px-4 py-3">
            {getJobData(job).status}
          </span>
        )}
      </td>
      <td className="flex justify-end gap-2 content-end ">
        {isEditing(job) ? (
          <>
            <div className="flex justify-end">
              <div
                className="flex items-center py-2 px-4 "
                onClick={handleSaveClick}
              >
                <svg
                  className="  text-gree-500 text-green-600 font-bold py-1 px-2rounded mr-2 h-8 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-green-500 text-base cursor-pointer">
                  Save
                </span>
              </div>

              <div
                className="flex items-center py-2 px-4 "
                onClick={handleCancelClick}
              >
                <svg
                  className=" hover-bg-gray-700 text-red font-bold py-1 px-2  rounded h-8 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red cursor-pointer">
                  Cancel
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="inline-block w-1/3 md:hidden font-bold">
              Actions
            </span>
            <div className="flex justify-end">
              <div
                className="flex items-center py-2 px-4 gap-2"
                onClick={() => handleEditClick(job)}
              >
                <img
                  src={editIcon}
                  className="font-bold py-1 px-2 cursor-pointer"
                />
                <span className="text-primary-600 cursor-pointer">
                  Edit
                </span>
              </div>
              <div
                className="flex items-center py-2 px-4 gap-2"
                onClick={() => {
                  setJobToDelete(job.id);
                  setShowModal(true);
                }}
              >
                <img
                  src={trashIcon}
                  className=" text-white font-bold py-1 px-2 cursor-pointer "
                />
                <span className="text-red cursor-pointer">
                  Delete
                </span>
              </div>
            </div>

            {showModal && (
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    Are you sure you want to delete this job?
                  </h2>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-red-500 hover-bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 hover-bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded"
                      onClick={() => {
                        handleDeleteJob(jobToDelete);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
