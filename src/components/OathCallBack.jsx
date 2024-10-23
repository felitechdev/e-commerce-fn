import React, { useState } from "react";
import { FeliTechLogo_transparent } from "../assets/images";
import { useUser } from "../context/UserContex";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { checkAuthentication } from "../APIs/UserAPIs";
import Cookies from "js-cookie";

export default function OathCallBack() {
  const { onLogin } = useUser();
  const [searchParams] = useSearchParams();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = searchParams.get("token");
        if (!token) return;

        const res = await checkAuthentication(token);

        onLogin({
          ...res.data.user,
          token,
        });

        Cookies.set("token", token);

        navigate("/");
      } catch (error) {
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, [isCheckingAuth, navigate, onLogin, searchParams]);

  if (isCheckingAuth) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full flex-wrap items-center justify-center bg-white">
        <img
          className="w-[200px] animate-ping"
          src={FeliTechLogo_transparent}
          alt="FeliTech Logo"
        />
      </div>
    );
  }
}
