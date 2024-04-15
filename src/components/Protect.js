import React from 'react';
import { useUser } from '../context/UserContex';
import { Navigate } from 'react-router-dom';

export default function Protect({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate replace to='/signin' />;
  }

  return <>{children}</>;
}
