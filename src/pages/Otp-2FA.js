import React from "react";
import SignInForm from "../components/Authentication/SignInForm";
import PageLayout from "../components/designLayouts/PageLayout";
import CenterLayout from "../components/designLayouts/CenterLayout";
import TwoFactor from "../components/Authentication/TwoFactorAuthentication";
export default function OTP() {
  return (
    <>
      <PageLayout>
        <CenterLayout>
          <div className="">
            <TwoFactor />
          </div>
        </CenterLayout>
      </PageLayout>
    </>
  );
}
