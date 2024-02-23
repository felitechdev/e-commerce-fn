import React from 'react';
import PageLayout from '../components/designLayouts/PageLayout';
import CenterLayout from '../components/designLayouts/CenterLayout';
import ForgotPasswordForm from '../components/Authentication/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <>
      <PageLayout>
        <CenterLayout>
          <ForgotPasswordForm />
        </CenterLayout>
      </PageLayout>
    </>
  );
}
