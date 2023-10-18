import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utilities/formatDate";
import JobTable from "../JobForm/JobTable/JobTable";
import Fuse from "fuse.js";
import Search from "../Search/Search";
import {
  setSearchWord,
  setSelectedStatus,
  setResults,
} from "../../features/searchSlice";
import RenderRichText from "../TextEditor/RenderRichText";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteJobMutation,
  useGetJobByUserIdQuery,
} from "../../features/auth/jobSlice";

const options = {
  keys: ["companyName", "status"],
  threshold: 0.3,
};

function JobList() {
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
        <div role="alert" className="m-5">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Error
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{deleteError.error || "Error while deleting job."}</p>
          </div>
        </div>
      )}

      <div className="p-4">
        <Search
          search={searchWord}
          setSearchWord={(value) => dispatch(setSearchWord(value))}
        />
        <select
          className="p-2 border border-gray-300 rounded mb-4"
          value={selectedStatus}
          onChange={(e) =>
            dispatch(setSelectedStatus(e.target.value))
          }
        >
          <option value="">Filter by status</option>
          <option value="applied">applied</option>
          <option value="interviewing">interviewing</option>
          <option value="rejected">rejected</option>
          <option value="offered">offered</option>
          <option value="accepted">accepted</option>
        </select>
        <JobTable
          data={data}
          results={results}
          formatDate={formatDate}
          deleteJob={deleteJob}
        />
      </div>
    </>
  );
}

export default JobList;
