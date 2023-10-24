import search from "../../assets/search.svg";

const Search = ({ searchWord, setSearchWord }) => {
  return (
    <label className="relative">
      <img
        src={search}
        className="pointer-events-none w-6 h-6 absolute top-5 transform -translate-y-1/2 left-3"
      />

      <input
        type="text"
        placeholder="Search by company"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value.toLowerCase())}
        className="block h-10 w-56 rounded-lg  text-opacity-30  leading-normal px-5 placeholder:font-normal  placeholder:not-italic border text-base border-primary-500 focus:ring-1 focus:outline-none  focus:ring-primary-700 focus:border mb-4 pl-10"
      />
    </label>
  );
};

export default Search;
