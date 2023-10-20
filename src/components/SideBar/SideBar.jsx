import { formatDate } from "../../utilities/formatDate";
import RenderRichText from "../TextEditor/RenderRichText";

const SideBar = ({ content, showSidebar, setShowSidebars }) => {
  const keyOrder = [
    "title",
    "dateApplied",
    "companyName",
    "additionalDetails",
  ];

  return (
    <>
      {showSidebar && (
        <div className="fixed top-0 right-0 h-full w-72 bg-white text-black z-50 shadow-lg transform translate-x-0 transition-transform ease-in-out duration-300">
          <div className="p-6">
            <button
              className="text-3xl text-black float-right cursor-pointer"
              onClick={() => setShowSidebars(false)}
            >
              &#10006;
            </button>
            <div className="my-10">
              {Object.entries(content)
                .filter(
                  ([key, value]) => key !== "id" && key !== "user_id"
                )
                .sort(
                  (a, b) =>
                    keyOrder.indexOf(a[0]) - keyOrder.indexOf(b[0])
                )
                .map(([key, value]) => (
                  <div key={key} className="my-4">
                    {key === "additionalDetails" ? (
                      <div className="border-t-2 pt-4">
                        <div className="text-2xl text-black mb-2 border-b-2 border-polo-blue-500">
                          Notes:
                        </div>
                        <RenderRichText content={value} />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="text-black text-xl font-semibold w-36">
                          {key === "title"
                            ? "Job Title"
                            : key === "dateApplied"
                            ? "Date Applied"
                            : key === "companyName"
                            ? "Company Name"
                            : key}
                        </div>
                        <div className="text-polo-blue-700 text-xl font-medium">
                          {value === ""
                            ? "N/A"
                            : key === "dateApplied"
                            ? formatDate(value)
                            : value}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
