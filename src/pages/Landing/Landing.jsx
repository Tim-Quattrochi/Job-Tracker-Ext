import { Link } from "react-router-dom";
import hero from "../../assets/hero.svg";

const Landing = () => {
  return (
    <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8 mt-20">
      <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
        <div className="text-left">
          <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-primary-800 sm:text-5xl sm:leading-none md:text-6xl">
            Push
            <span className="font-bold text-primary-500">Hire</span>
          </h2>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your job applications and stay organized with
            PushHire. Have you ever been called by a recruiter and
            don't know what job you applied for? PushHire is here to
            help you.
          </p>
          <div className="mt-5 sm:flex md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-primary-600 border border-transparent rounded-md hover:bg-primary-500 focus:outline-none focus:shadow-outline-primary md:py-4 md:text-lg md:px-10"
              >
                Create an account
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/login"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-primary-700 transition duration-150 ease-in-out bg-primary-100 border border-transparent rounded-md hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:shadow-outline-primary md:py-4 md:text-lg md:px-10"
              >
                Existing user? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
        <div className="relative w-full p-3 rounded  md:p-8">
          <div className="rounded-lg bg-white text-black w-full">
            <img src={hero} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
