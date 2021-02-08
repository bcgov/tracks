import React from 'react';
import PermitList from "./components/PermitList";
import TenureList from "./components/TenureList";
import ProfileView from "./components/ProfileView";

const Profile = () => {
  return (
    <>
      <ProfileView/>
      <PermitList />
      <TenureList />
    </>
  )

};

export default Profile;
