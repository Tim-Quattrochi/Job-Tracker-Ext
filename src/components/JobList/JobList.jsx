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
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteJobMutation,
  useGetJobByUserIdQuery,
} from "../../features/jobs/jobApi";
import Modal from "../Modal/Modal";
import JobForm from "../JobForm/JobForm";
import SelectInput from "../Select/SelectInput";
import btnCircle from "../../assets/plus-circle.svg";

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

  const handleSelectChange = (e) => {
    dispatch(setSelectedStatus(e.target.value));
  };

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
      <div className="flex flex-col justify-center h-auto px-8 ">
        <div className=" text-xl font-bold py-6 flex mx-auto">
          Loading...
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
      <div className="flex  flex-wrap justify-center items-center mx-auto self-stretch gap-6 p-4 max-w-7xl">
        <div className="flex justify-between items-center self-stretch w-full">
          <Search
            search={searchWord}
            setSearchWord={(value) => dispatch(setSearchWord(value))}
          />
          <SelectInput
            handleSelectChange={handleSelectChange}
            selectedStatus={selectedStatus}
          />
          <button
            className="bg-primary-600 h-10 w-auto hover:bg-gray-400  py-3  px-5 rounded-lg inline-flex items-center ml-auto"
            onClick={() => setShowModal(true)}
          >
            <img src={btnCircle} className="mr-2 w-6 h-6" />
            <span className="text-white text-base  font-inter not-italic">
              Add New Job
            </span>
          </button>
        </div>
        <JobTable
          data={data}
          results={results}
          deleteJob={deleteJob}
          deleteError={deleteError}
        />
        {!data && (
          <div className="h-auto mx-auto ">
            <div className=" text-xl font-bold py-6 ">
              No jobs applied to yet.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default JobList;
