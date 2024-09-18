import React from "react";
import SignInForm from "../components/Authentication/SignInForm";
import PageLayout from "../components/designLayouts/PageLayout";
import CenterLayout from "../components/designLayouts/CenterLayout";
import TwoFactor from "../components/Authentication/TwoFactorAuthentication";
import { twofabg } from "../assets/images";
import { twofaicon } from "../assets/images";
export default function OTP() {
  return (
    <>
      <div className="twofabg h-screen flex justify-center items-center ">
        <TwoFactor />
      </div>
    </>
  );
}
