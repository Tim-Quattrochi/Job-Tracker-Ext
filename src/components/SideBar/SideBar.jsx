import { formatDate } from "../../utilities/formatDate";
import RenderRichText from "../TextEditor/RenderRichText";
import closeIcon from "../../assets/x.svg";

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
        <div className="fixed flex flex-col  gap-6 top-0 right-0 h-[800px] w-[360px] p-6 bg-white text-black z-50 shadow-md transform translate-x-0 transition-transform ease-in-out duration-300">
          <div>
            <img
              src={closeIcon}
              className="text-3xl text-black float-right cursor-pointer"
              onClick={() => setShowSidebars(false)}
            />

            <div className="py-8">
              {Object.entries(content)
                .filter(
                  ([key, value]) => key !== "id" && key !== "user_id"
                )
                .sort(
                  (a, b) =>
                    keyOrder.indexOf(a[0]) - keyOrder.indexOf(b[0])
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col justify-end content-start py-2 gap-2 self-stretch"
                  >
                    {key === "additionalDetails" ? (
                      <div className="pt-4">
                        <div className="text-lg font-inter text-primary-700 mb-2 border-b-[1px] border-b-primary-400 ">
                          Notes:
                        </div>

                        <RenderRichText content={value} />
                      </div>
                    ) : (
                      <div className="flex gap-6 py-2 items-start self-stretch ">
                        <div className="text-black w-32 font-inter text-base font-semibold  capitalize">
                          {key === "title"
                            ? "Job Title:"
                            : key === "dateApplied"
                            ? "Date Applied:"
                            : key === "companyName"
                            ? "Company Name:"
                            : key + ":"}
                        </div>
                        <div className="text-black text-base font-light w-full flex-[1_0_0%]">
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
