import { useState } from "react";
import { useEditJobMutation } from "../../../features/jobs/jobApi";
import ShowError from "../../ShowError/ShowError";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import {
  isInEdit,
  updateJob,
  selectJobInEdit,
} from "../../../features/jobs/jobsSlice";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

const JobTable = ({ data, results, deleteJob, deleteError }) => {
  const [editedJob, setEditedJob] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSidebars, setShowSidebars] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);

  const [jobToDelete, setJobToDelete] = useState(null);
  const dispatch = useDispatch();

  const [editJob, { error }] = useEditJobMutation();

  const jobInEdit = useSelector((state) => selectJobInEdit(state));

  const handleEditClick = (job) => {
    dispatch(isInEdit({ id: job.id, inEdit: true }));

    setEditedJob(getJobData(job));
  };

  const handleSaveClick = (content = null) => {
    //If the edit is not coming from the sidebar, then tiptap seems to add a nativeEvent object to the content. Which I don't want. Because it will make it truthy and then my or statement will include it. If the edit IS coming from the sidebar, then the additionalDetails aka notes are being updated, and I do want that.
    if (content?.nativeEvent) {
      content = null;
    }

    //the purpose of this or statement is to check if the content is coming from the sidebar or not. If it is, then the content will be the additionalDetails from the sidebar. If it is not, then the content will be null, and the editedJob will be the job that is being edited.
    editJob(content || editedJob) //if there is content, it means the additionalDetails from the text editor is being updated.
      .unwrap()
      .then((result) => {
        console.log("Edit Job Successful", result);
        dispatch(updateJob(result));
        dispatch(isInEdit({ id: editedJob.id, inEdit: false }));
      })
      .catch((error) => {
        console.error("Edit Job Error", error);
      });

    setEditedJob({});
  };

  const handleCancelClick = () => {
    dispatch(isInEdit({ id: editedJob.id, inEdit: false }));
    setEditedJob({});
  };

  const handleDeleteJob = (id) => {
    deleteJob(id)
      .unwrap()
      .then((result) => {
        console.log("Delete Job Successful", result);

        setShowModal(false);
      })
      .catch((error) => {
        console.error("Delete Job Error", error);
      });
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
    if (jobInEdit === undefined) return false;
    return job.id === jobInEdit.id;
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

      <table className="w-full">
        <TableHeader />
        <tbody>
          {results?.length === 0 ? (
            <tr className="flex flex-col justify-center h-auto ">
              <td className="text-xl font-bold py-6 mx-auto text-center">
                No jobs found.
              </td>
            </tr>
          ) : (
            results &&
            results.map((job) => (
              <TableRow
                key={job.id || job.item.id}
                job={job}
                editedJob={editedJob}
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
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default JobTable;
