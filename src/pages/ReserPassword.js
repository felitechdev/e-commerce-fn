import React from 'react';
import PageLayout from '../components/designLayouts/PageLayout';
import CenterLayout from '../components/designLayouts/CenterLayout';
import ResetPasswordForm from '../components/Authentication/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <>
      <PageLayout>
        <CenterLayout>
          <ResetPasswordForm />
        </CenterLayout>
      </PageLayout>
    </>
  );
}
