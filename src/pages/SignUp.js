import React from 'react';
import SignUpForm from '../components/Authentication/SignUpForm';
import AuthLayout from '../components/designLayouts/AuthLayout';

export default function SignUp() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
