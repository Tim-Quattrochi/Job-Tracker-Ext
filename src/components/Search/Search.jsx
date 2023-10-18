const Search = ({ searchWord, setSearchWord }) => {
  return (
    <input
      type="text"
      placeholder="Search by company"
      value={searchWord}
      onChange={(e) => setSearchWord(e.target.value.toLowerCase())}
      className="p-2 border border-gray-300 rounded mb-4"
    />
  );
};

export default Search;
