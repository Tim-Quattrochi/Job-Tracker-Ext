import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utilities/formatDate";
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
        <ShowError errorMsg="Error while deleting job." />
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
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offered">Offered</option>
          <option value="Accepted">Accepted</option>
        </select>
        <JobTable
          data={data}
          results={results}
          formatDate={formatDate}
          deleteJob={deleteJob}
          deleteError={deleteError}
        />
      </div>
    </>
  );
}

export default JobList;
