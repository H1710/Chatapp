import React, { useState } from 'react';
import { searchUserByFullnameRoute } from '../../utils/APIRoutes';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingComponent from '../Alert/LoadingComponent';
import { getAPI } from '../../utils/FetchData';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from 'react-query';
import Search from '../Search/index';
import RequestList from '../RequestList/index';
function SearchUser() {
  const [search, setSearch] = useState('');
  const auth = useSelector(state => state.auth.auth);
  const keySearch = useDebounce(search, 500);

  const {
    data: dataSearch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', keySearch],
    queryFn: () => {
      if (keySearch) {
        return getAPI(`${searchUserByFullnameRoute}/${auth._id}/${keySearch}`);
      }
    },
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="px-[10px]">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Add friends</p>
        </div>
        <Search field={'fullname'} setSearch={setSearch} />
      </div>

      <br />
      <div className="h-full flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
        {isLoading ? (
          search && <LoadingComponent />
        ) : (
          <RequestList dataSearch={dataSearch} auth={auth} />
        )}
      </div>
    </div>
  );
}

export default SearchUser;
