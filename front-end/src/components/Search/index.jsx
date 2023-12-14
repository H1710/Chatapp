import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Search = ({ search, setSearch, field }) => {
  return (
    <div className="flex flex-row items-center h-10 overflow-hidden bg-white pr-2 mt-3 border border-[#000] w-full rounded-full">
      <input
        placeholder={`Search by ${field}`}
        onChange={e => setSearch(e.target.value)}
        value={search}
        className="flex-1 text-[16px] bg-white h-full pl-4 flex flex-col content-center outline-none"
      />
      {search && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="1x"
          id="close-icon"
          onClick={() => {
            setSearch('');
          }}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Search;
