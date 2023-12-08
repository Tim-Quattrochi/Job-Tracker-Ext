import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import JobTable from "../JobForm/JobTable/JobTable";
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
import { setJobs } from "../../features/jobs/jobsSlice";
import Modal from "../Modal/Modal";
import JobForm from "../JobForm/JobForm";
import SelectInput from "../Select/SelectInput";
import btnCircle from "../../assets/plus-circle.svg";
import { toast, Slide } from "react-toastify";

const options = {
  keys: ["companyName", "status"],
  threshold: 0.3,
};

function JobList() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const { data, isLoading } = useGetJobByUserIdQuery(user?.id);

  const [deleteJob, { error: deleteError }] = useDeleteJobMutation();

  const dispatch = useDispatch();

  const searchWord = useSelector((state) => state.search.searchWord);
  const results = useSelector((state) => state.search.results);
  const selectedStatus = useSelector(
    (state) => state.search.selectedStatus
  );

  const handleSelectChange = (e) => {
    if (!data) {
      return toast.error("No jobs to filter", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
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
      dispatch(setJobs(filtered));
    } else {
      dispatch(setResults(data));
      dispatch(setJobs(data));
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
      {deleteError &&
        toast.error("error deleting job", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, //3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
        })}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <JobForm setShowModal={setShowModal} />
      </Modal>
      <div className="flex  flex-wrap justify-center items-center mx-auto self-stretch gap-6 p-4 max-w-7xl">
        <div className="flex justify-between items-center self-stretch w-full">
          <Search
            data={data}
            search={searchWord}
            setSearchWord={(value) => dispatch(setSearchWord(value))}
          />
          <SelectInput
            handleSelectChange={handleSelectChange}
            selectedStatus={selectedStatus}
          />
          <button
            className="bg-primary-600 h-10 w-auto hover:bg-gray-400  py-3  px-5 rounded-lg inline-flex items-center ml-5 md:ml-auto"
            onClick={() => setShowModal(true)}
          >
            <img src={btnCircle} className="mr-5 w-full md:w-6" />
            <span className="text-white text-base hidden md:block  font-inter not-italic">
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
