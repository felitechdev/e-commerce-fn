import React from 'react';
import SignInForm from '../components/Authentication/SignInForm';
import PageLayout from '../components/designLayouts/PageLayout';
import CenterLayout from '../components/designLayouts/CenterLayout';

export default function SignIn() {
  return (
    <>
      <PageLayout>
        <CenterLayout>
          <SignInForm />
        </CenterLayout>
      </PageLayout>
    </>
  );
}
