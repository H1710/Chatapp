import React from 'react';
import NotificationList from '../NotificationList/index';
const Notification = () => {
  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="px-[10px]">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Notifications</p>
        </div>
      </div>

      <br />
      <NotificationList />
    </div>
  );
};

export default Notification;
