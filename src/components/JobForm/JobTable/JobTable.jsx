import { useState } from "react";
import { useEditJobMutation } from "../../../features/jobs/jobApi";
import { formatDate } from "../../../utilities/formatDate";
import Modal from "../../Modal/Modal";
import ShowError from "../../ShowError/ShowError";
import SideBar from "../../SideBar/SideBar";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const JobTable = ({ data, results, deleteJob, deleteError }) => {
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSidebars, setShowSidebars] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);

  const [jobToDelete, setJobToDelete] = useState(null);

  const [editJob, { error }] = useEditJobMutation();

  const handleEditClick = (job) => {
    setEditingJobId(job.id || job.item.id);
    setEditedJob(job);
  };

  const handleSaveClick = () => {
    editJob(editedJob);

    setEditedJob({});
    setEditingJobId(null);
  };

  const handleCancelClick = () => {
    setEditedJob({});
    setEditingJobId(null);
  };

  const handleDeleteJob = (id) => {
    deleteJob(id);
    setShowModal(false);
    setEditingJobId(null);
  };

  const toggleSidebar = (jobId) => {
    setShowSidebars((prevShowSidebars) => ({
      ...prevShowSidebars,
      [jobId]: !prevShowSidebars[jobId],
    }));
  };

  const isSidebarOpen = (jobId) => {
    return showSidebars[jobId] || false;
  };

  const isEditing = (job) => {
    return job?.id === editingJobId || job.item?.id === editingJobId;
  };

  const getJobData = (job) => {
    if (isEditing(job)) {
      return editedJob;
    } else {
      return job.item || job;
    }
  };

  return (
    <>
      {error && (
        <ShowError errorMsg="Something went wrong while saving." />
      )}

      <table className="w-full border border-collapse">
        <TableHeader />
        <tbody>
          {data &&
            results &&
            results.map((job) => (
              <TableRow
                key={job.id || job.item.id}
                job={job}
                editedJob={editJob}
                isEditing={isEditing}
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
                handleDeleteJob={handleDeleteJob}
                setShowModal={setShowModal}
                getJobData={getJobData}
                setEditedJob={setEditedJob}
                showModal={showModal}
                setShowSideBar={setShowSideBar}
                showSidebars={showSidebars}
                setShowSidebars={setShowSidebars}
                setJobToDelete={setJobToDelete}
                jobToDelete={jobToDelete}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default JobTable;
