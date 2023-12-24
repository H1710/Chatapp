import React, { ChangeEvent } from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  field: string;
}

const Search: React.FC<SearchProps> = ({ search, setSearch, field }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="flex flex-row items-center h-10 overflow-hidden bg-white pr-2 mt-3 border border-[#000] w-full rounded-full">
      <input
        placeholder={`Search by ${field}`}
        onChange={handleSearchChange}
        value={search}
        className="flex-1 text-[16px] bg-white h-full pl-4 flex flex-col content-center outline-none"
      />
      {search && (
        <FontAwesomeIcon
          icon={faCircle}
          size="1x"
          id="close-icon"
          onClick={handleClearSearch}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Search;
