import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <div className="flex flex-col h-auto mx-auto justify-center items-center py-12 gap-3 px-8 max-w-7xl">
          <span className="text-[#000000] text-center text-xl font-normal ">
            👋
          </span>
          <span className="text-2xl md:text-4xl text-primary-1000 font-semibold">
            You must be logged in to view this page
          </span>
          <button
            className="bg-primary-1000 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/login")}
          >
            {" "}
            Go to login
          </button>
        </div>
      )}
    </>
  );
};

export default Protected;
