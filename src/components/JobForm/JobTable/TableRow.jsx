import { formatDate } from "../../../utilities/formatDate";
import SideBar from "../../SideBar/SideBar";
import Modal from "../../Modal/Modal";
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
  return (
    <tr key={job.id || job.item.id}>
      <td className="p-2">
        {formatDate(getJobData(job).dateApplied)}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <input
            type="text"
            value={editedJob.title || job.title}
            onChange={(e) =>
              setEditedJob({ ...editedJob, title: e.target.value })
            }
          />
        ) : (
          <div>
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-800"
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
              />
            )}
          </div>
        )}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <input
            type="text"
            value={editedJob.companyName || job.companyName}
            onChange={(e) =>
              setEditedJob({
                ...editedJob,
                companyName: e.target.value,
              })
            }
          />
        ) : (
          getJobData(job).companyName
        )}
      </td>
      <td className="p-2">
        {isEditing(job) ? (
          <select
            value={editedJob.status || job.status}
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
          getJobData(job).status
        )}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        {isEditing(job) ? (
          <>
            <button
              className="bg-green-500 hover.bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded mr-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover.bg-gray-700 text-white font-bold py-1 px-2 border border-gray-500 rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="inline-block w-1/3 md:hidden font-bold">
              Actions
            </span>
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-2"
              onClick={() => handleEditClick(job)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover.bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
              onClick={() => {
                setJobToDelete(job.id);
                setShowModal(true);
              }}
            >
              Delete
            </button>
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
                      className="bg-red-500 hover.bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 hover.bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded"
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
