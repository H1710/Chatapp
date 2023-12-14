import React from 'react';

import Request from './Request';

const RequestList = ({ dataSearch }) => {
  return (
    <div>
      {dataSearch?.data.users?.length !== 0 ? (
        <div>
          {dataSearch?.data.users?.map((contact, index) => {
            return <Request contact={contact} key={index} />;
          })}
        </div>
      ) : (
        <p className="mt-2 ml-2">User not found</p>
      )}
    </div>
  );
};

export default RequestList;
