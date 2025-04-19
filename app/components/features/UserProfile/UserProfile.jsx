import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Dropdown from '../../ui/Dropdown/Dropdown';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout, isAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="user-profile">
      <img src={user?.avatar || '/images/default-avatar.png'} alt="Profile" />
      <Dropdown label={user?.name || 'User'}>
        <button onClick={logout}>Logout</button>
      </Dropdown>
    </div>
  );
};

export default UserProfile;
