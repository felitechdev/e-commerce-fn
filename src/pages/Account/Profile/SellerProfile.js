import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { EyeFilled } from "@ant-design/icons";
import CompanyModel from "../../../components/Seller/CompanyModel/CompanyModel";
import { GetMyprofilebyId } from "../../../APIs/UserAPIs";
import Cookies from "js-cookie";
import { LoaderComponent } from "../../../components/Loaders/Getloader";

const SellerProfile = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userprofile, setUserprofile] = useState();
  const [profileview, setProfileview] = useState();
  const [loading, setLoading] = useState(false);

  const { profile, loadprofile, errprofile } = useSelector(
    (state) => state.userprofile
  );

  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const storeUserInfo = useSelector(
    (state) => state.userReducer.userInfo.profile
  );
  const { viewprofile, loadviewprofile, errviewprofile } = useSelector(
    (state) => state.viewprofile
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (storeUserInfo) {
      setUser(storeUserInfo);
    }
  }, [storeUserInfo]);

  useEffect(() => {
    if (profile?.data?.user) {
      setUserprofile(profile?.data?.user);
    }
  }, [profile]);

  // update state on update profile
  const handleupdatestateProfile = (data) => {
    setLoading(true);
    setProfileview((prevProfileview) => ({
      ...prevProfileview,
      ...data,
    }));
  };

  // view profile
  useEffect(() => {
    if (loadviewprofile == true) {
      dispatch(GetMyprofilebyId(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setProfileview(data?.data?.profile);
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [loadviewprofile, dispatch, token]);

  // Fetch user only when the component mounts
  useEffect(() => {
    if (!profileview) {
      dispatch(GetMyprofilebyId(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "success") {
            setProfileview(data?.data?.profile);
            setLoading(false);
          }
        })
        .catch((error) => {});
    }
  }, [dispatch, profileview, token]);

  console.log("profileview", profileview, loadviewprofile);

  return (
    <>
      <div className="bg-white border shadow-lg rounded-md w-full min-h-[500px] pb-3">
        <div className=" rounded-t-md flex  justify-between space-x-3 font-normal pl-10  py-3  px-2 text-xl">
          <div className="flex space-x-2">
            {userprofile != null ? (
              <>
                <img src={userprofile?.photo} />
                <h1>{userprofile?.firstName}</h1>
              </>
            ) : (
              <>
                <FaUser size={25} />
                <h1>My Hill Global Market</h1>
              </>
            )}
          </div>

          {userprofile != null && userprofile.role == "customer" ? (
            <div className="flex space-x-2 cursor-pointer font-bold  text-primary ">
              <RiEdit2Fill size={25} />
              <h1>Edit My Profile</h1>
            </div>
          ) : (
            <div
              className="flex space-x-2 cursor-pointer  text-primary font-bold"
              onClick={showModal}
            >
              <RiEdit2Fill size={25} />
              <h1>Edit Seller Info</h1>
            </div>
          )}
        </div>
        {userprofile != null && (
          <>
            <div className=" pl-10 mt-10  flex justify-between pr-2">
              <div className="">
                <h1>
                  {" "}
                  <span className="text-border font-bold text-xl">
                    Email :{" "}
                  </span>{" "}
                  {userprofile.email}
                </h1>
                <h1>
                  {" "}
                  <span className="text-border font-bold text-xl">
                    firstName :{" "}
                  </span>{" "}
                  {userprofile.firstName}
                </h1>
                <h1>
                  {" "}
                  <span className="text-border font-bold text-xl">
                    lastName :{" "}
                  </span>{" "}
                  {userprofile.lastName}
                </h1>
              </div>

              <div className="w-[15%]">
                {userprofile && profileview && profileview.logo && (
                  <div className="border-4 border-primary z-10  relative">
                    <img
                      src={profileview.logo}
                      className="w-full h-full z-20"
                      style={{ marginLeft: "-30px" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className=" mt-4" />
            <div className=" pl-10 mt-1  ">
              <h1 className=" font-bold text-2xl underline mb-3">
                {" "}
                <EyeFilled size={25} className="  mr-2 " /> View More
                Information
              </h1>

              {profileview && (
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <span className="text-border font-bold text-xl">
                      companyEmail:{" "}
                    </span>
                    <h1 className="font-bold">
                      {profileview.companyEmail && profileview.companyEmail}
                    </h1>
                  </Col>
                  <Col span={8}>
                    <span className="text-border font-bold text-xl">
                      companyName:{" "}
                    </span>
                    <h1 className="font-bold">
                      {profileview.companyName && profileview.companyName}
                    </h1>
                  </Col>
                  <Col span={8}>
                    <span className="text-border font-bold text-xl">
                      phoneNumber:{" "}
                    </span>
                    <h1 className="font-bold">
                      {profileview.phoneNumber && profileview.phoneNumber}
                    </h1>
                  </Col>
                  <Col span={8}>
                    <span className="text-border font-bold text-xl">
                      website:{" "}
                    </span>
                    <h1 className="font-bold">
                      <a href={profileview.website && profileview.website}>
                        {" "}
                        visit website
                      </a>
                    </h1>
                  </Col>

                  {profileview.bankAccount && (
                    <>
                      <Col span={8}>
                        <span className="text-border font-bold text-xl">
                          bank:{" "}
                        </span>
                        <h1 className="font-bold">
                          {profileview.bankAccount.bank &&
                            profileview.bankAccount.bank}
                        </h1>
                      </Col>
                      <Col span={8}>
                        <span className="text-border font-bold text-xl">
                          accountName:{" "}
                        </span>
                        <h1 className="font-bold">
                          {profileview.bankAccount.accountName &&
                            profileview.bankAccount.accountName}
                        </h1>
                      </Col>
                      <Col span={8}>
                        <span className="text-border font-bold text-xl">
                          accountNumber:{" "}
                        </span>
                        <h1 className="font-bold">
                          {profileview.bankAccount.accountNumber &&
                            profileview.bankAccount.accountNumber}
                        </h1>
                      </Col>
                      <Col span={8}>
                        <span className="text-border font-bold text-xl">
                          accountHolderName:{" "}
                        </span>
                        <h1 className="font-bold">
                          {profileview.bankAccount.accountHolderName &&
                            profileview.bankAccount.accountHolderName}
                        </h1>
                      </Col>
                    </>
                  )}

                  <Col span={8}>
                    <span className="text-border font-bold text-xl">
                      cardNumber:
                    </span>
                    <h1 className="font-bold">
                      {profileview.cardNumber && profileview.cardNumber}
                    </h1>
                  </Col>

                  {profileview.locations &&
                    profileview.locations.length > 0 && (
                      <Col span={24}>
                        <span className="text-border font-bold text-xl">
                          address:{" "}
                        </span>
                        <h1 className="font-bold">
                          {profileview.locations[0].address}
                        </h1>
                      </Col>
                    )}
                </Row>
              )}
            </div>
          </>
        )}

        <CompanyModel
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          profileview={profileview}
          andleupdatestateProfile={handleupdatestateProfile}
        />
      </div>
    </>
  );
};

export default SellerProfile;
