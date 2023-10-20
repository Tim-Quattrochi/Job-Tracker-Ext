import JobList from "../JobList/JobList";
import { useAuth } from "../../hooks/useAuth";

const JobTracker = () => {
  const { user } = useAuth();

  return (
    <main className=" ">
      <h1 className="text-polo-blue-900 text-center text-4xl font-semibold mt-10">
        <div className="my-2 font-medium">{user && user.name} 👋</div>
        <span className="p-2 ">Welcome to your Job Tracker</span>
      </h1>

      <JobList />
    </main>
  );
};

export default JobTracker;
