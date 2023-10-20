import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import JobTable from "../JobForm/JobTable/JobTable";
import ShowError from "../ShowError/ShowError";
import Fuse from "fuse.js";
import Search from "../Search/Search";
import {
  setSearchWord,
  setSelectedStatus,
  setResults,
} from "../../features/jobs/searchSlice";
import RenderRichText from "../TextEditor/RenderRichText";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteJobMutation,
  useGetJobByUserIdQuery,
} from "../../features/jobs/jobApi";
import Modal from "../Modal/Modal";
import JobForm from "../JobForm/JobForm";

const options = {
  keys: ["companyName", "status"],
  threshold: 0.3,
};

function JobList() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const { data, error, isLoading } = useGetJobByUserIdQuery(user?.id);

  const [deleteJob, { error: deleteError }] = useDeleteJobMutation();

  const dispatch = useDispatch();

  const searchWord = useSelector((state) => state.search.searchWord);
  const results = useSelector((state) => state.search.results);
  const selectedStatus = useSelector(
    (state) => state.search.selectedStatus
  );

  useEffect(() => {
    if (searchWord || selectedStatus) {
      const fuse = new Fuse(data, options);
      let filtered = data;

      if (searchWord) {
        filtered = fuse.search(searchWord);
      }

      if (selectedStatus) {
        filtered = filtered.filter(
          (job) => job.status === selectedStatus
        );
      }

      dispatch(setResults(filtered));
    } else {
      dispatch(setResults(data));
    }
  }, [data, searchWord, selectedStatus, dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center h-auto ">
        <div className=" text-xl font-bold py-6 flex mx-auto">
          Loading...
        </div>
      </div>
    );
  }

  if ((error && error.status === 404) || !data) {
    return (
      <div className="flex flex-col justify-center h-auto ">
        <div className=" text-xl font-bold py-6 flex mx-auto">
          No jobs applied to yet.
        </div>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <ShowError errorMsg="Error while deleting job." />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <JobForm setShowModal={setShowModal} />
      </Modal>
      <div className="flex  flex-wrap justify-start p-4">
        <Search
          search={searchWord}
          setSearchWord={(value) => dispatch(setSearchWord(value))}
        />
        <select
          className="p-2 border border-gray-300 rounded ml-2 mb-4"
          value={selectedStatus}
          onChange={(e) =>
            dispatch(setSelectedStatus(e.target.value))
          }
        >
          <option value="">Filter by status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offered">Offered</option>
          <option value="Accepted">Accepted</option>
        </select>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-auto"
          onClick={() => setShowModal(true)}
        >
          <svg
            width="20"
            height="40"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" w-4 h-4 mr-2"
          >
            <circle
              cx="25"
              cy="25"
              r="23"
              stroke="#797373"
              strokeWidth="4"
            />
            <rect
              x="12"
              y="23"
              width="26"
              height="4"
              rx="1"
              fill="#23581b"
            />
            <rect
              x="27"
              y="12"
              width="26"
              height="4"
              rx="1"
              transform="rotate(90 27 12)"
              fill="#23581b"
            />
          </svg>
          Add new job
        </button>
        <JobTable
          data={data}
          results={results}
          deleteJob={deleteJob}
          deleteError={deleteError}
        />
      </div>
    </>
  );
}

export default JobList;
