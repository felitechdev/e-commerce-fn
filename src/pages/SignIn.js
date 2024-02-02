import React from 'react';
import SignInForm from '../components/Authentication/SignInForm';
import AuthLayout from '../components/designLayouts/AuthLayout';

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
