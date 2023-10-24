import JobList from "../JobList/JobList";
import { useAuth } from "../../hooks/useAuth";

const JobTracker = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col h-auto mx-auto justify-center items-center py-12 gap-3 px-8 max-w-7xl">
        <span className="text-[#000000] text-center text-xl font-normal ">
          {user && user.name} 👋
        </span>
        <span className="text-2xl md:text-4xl text-primary-1000 font-semibold">
          Welcome to your Job Tracker
        </span>
      </div>

      <JobList />
    </>
  );
};

export default JobTracker;
