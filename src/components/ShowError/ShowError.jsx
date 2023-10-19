/**
 * @param {string|null} errorMsg The error message you want to display, defaults to "Something went wrong" if not provided.
 * @returns {JSX.Element}
 * @example
 * <ShowError errorMsg="Error while doing something." />
 */
const ShowError = ({ errorMsg = null }) => {
  return (
    <div role="alert" className="m-5">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{errorMsg || "Something went wrong"}</p>
      </div>
    </div>
  );
};

export default ShowError;
