import React, { useState } from 'react';
import { searchUserByFullnameRoute } from '../../apis/APIRoutes';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingComponent from '../Loading/LoadingComponent';
import { getAPI } from '../../apis/FetchData';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from 'react-query';
import Search from '../Search/index';
import RequestList from '../UserList/index';
import { RootState } from '../../redux/reducers';
import { User } from '../../models/user.model';
function SearchUser() {
  const [search, setSearch] = useState('');
  const auth = useSelector((state: RootState) => state.auth.auth);
  const [userList, setUserList] = useState<User[]>([]);
  const keySearch = useDebounce(search, 500);

  const { isLoading, error } = useQuery({
    queryKey: ['search', keySearch],
    queryFn: () => {
      if (keySearch) {
        return getAPI(
          `${searchUserByFullnameRoute}/${auth._id}/${keySearch}`,
          ''
        );
      }
    },
    onSuccess: (data: any) => {
      if (data?.users) {
        setUserList(data?.users);
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
        <Search field={'fullname'} search={search} setSearch={setSearch} />
      </div>

      <br />
      <div className="h-full flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
        {isLoading
          ? search && <LoadingComponent />
          : search && <RequestList userList={userList} />}
      </div>
    </div>
  );
}

export default SearchUser;
