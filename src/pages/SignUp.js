import React from 'react';
import SignUpForm from '../components/Authentication/SignUpForm';
import CenterLayout from '../components/designLayouts/CenterLayout';
import PageLayout from '../components/designLayouts/PageLayout';

export default function SignUp() {
  return (
    <PageLayout>
      <CenterLayout>
        <SignUpForm />
      </CenterLayout>
    </PageLayout>
  );
}
