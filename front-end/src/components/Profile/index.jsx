import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserInfo from './UserInfo';
import OtherInfo from './OtherInfo';

const Profile = () => {
  const auth = useSelector(state => state.auth.auth);
  const { userId } = useParams();
  return auth._id === userId ? <UserInfo /> : <OtherInfo />;
};

export default Profile;
