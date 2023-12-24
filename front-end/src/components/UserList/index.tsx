import React from 'react';

import Request from './Request';
import { User } from '../../models/user.model';

interface UserListProps {
  userList: User[];
}

const UserList: React.FC<UserListProps> = ({ userList }) => {
  return (
    <div>
      {userList.length ? (
        <div>
          {userList.map((contact: User, index: number) => {
            return <Request contact={contact} key={index} />;
          })}
        </div>
      ) : (
        <p className="mt-2 ml-2">User not found</p>
      )}
    </div>
  );
};

export default UserList;
