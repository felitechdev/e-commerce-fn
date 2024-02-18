import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { EyeFilled } from "@ant-design/icons";
import CompanyModel from "./CompanyModel/CompanyModel";
import { GetMyprofilebyId } from "../../../APIs/UserAPIs";
import { ImageUpload } from "../../../components/profile/photoupdate/Updateimage";
import Cookies from "js-cookie";
import { LoaderComponent } from "../../../components/Loaders/Getloader";
import PersonalInfoModel from "./userinfo";
import { useUser } from "../../../context/UserContex";
import axios from "axios";

const SellerProfile = () => {
  const [isLoading, setLoading] = useState(true);
  const token = Cookies.get("token");
  // const [user, onSetProfile] = useUser();

  const user = useUser().user;
  const setUser = useUser().setUser;
  const onSetProfile = useUser().onSetProfile;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [usenameopenmodel, setUsernameopenmodel] = useState(false);

  const handleCancel = () => {
    setUsernameopenmodel(false);
    setIsModalOpen(false);
  };

  const handleopenmodel = () => {
    setOpenmodel(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showusernamemodel = () => {
    setUsernameopenmodel(true);
  };

  const handleupdateprofileModel = (state) => {
    setOpenmodel(state);
  };

  // update state on update profile
  const handleupdatestateProfile = (data) => {
    console.log("data on haandle update", data);
    onSetProfile(data);
  };

  const handleupdatestate = (data) => {
    console.log("data on haandle update", data);
    onSetProfile(data);
  };

  // view profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/profiles`,
          config
        );
        onSetProfile(response.data);
      } catch (err) {
        console.log("error on getting myprofile ", err.response?.data);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  console.log("user", user);

  return (
    <div className=" flex  justify-center  w-full h-min">
      <div className="bg-white border   rounded-md w-full min-h-[500px] pb-3">
        <div className=" rounded-t-md flex  justify-between space-x-3 font-normal pl-10  py-3  px-2 text-xl">
          <div className="flex flex-col   ">
            {user ? (
              <>
                <div className="flex  space-x-2 items-center">
                  {user?.photo == "default.jpg" ||
                  user?.profileImageUrl == "default.jpg" ? (
                    <h1 className="bg-primary text-white font-bold px-1 rounded-sm text-2xl">
                      {user?.firstName[0]}
                    </h1>
                  ) : (
                    <img
                      src={user?.photo}
                      className=" w-14 h-14 rounded-full border-2 p-1 "
                    />
                  )}

                  <h1 className="font-bold text-xl">{user?.firstName}</h1>
                </div>

                <h1
                  className="flex ml-0 mt-1 text-sm  cursor-pointer "
                  onClick={handleopenmodel}
                >
                  <RiEdit2Fill size={15} />
                  Edit{" "}
                </h1>
                <ImageUpload
                  openmodel={openmodel}
                  handleupdateprofileModel={handleupdateprofileModel}
                  handleupdatestate={handleupdatestate}
                />
                <hr />
              </>
            ) : (
              <>
                <FaUser size={15} />
                <h1 className="text-sm">My Hill Global Market</h1>
              </>
            )}
          </div>

          {(user != null && user?.role == "customer") ||
          user?.role == "admin" ? (
            <>
              <PersonalInfoModel
                isModalOpen={usenameopenmodel}
                handleCancel={handleCancel}
                profileview={user}
                handleupdatestateProfile={handleupdatestateProfile}
              />

              <div
                className="flex space-x-2 cursor-pointer font-bold  text-primary "
                onClick={showusernamemodel}
              >
                <RiEdit2Fill size={20} />
                <h1 className="text-sm">Edit My Profile</h1>
              </div>
            </>
          ) : (
            <div
              className="flex space-x-2 cursor-pointer  text-primary text-md font-bold"
              onClick={showModal}
            >
              <RiEdit2Fill size={20} />
              <h1 className="text-sm">Edit Seller Info</h1>
            </div>
          )}
        </div>

        {user != null && (
          <>
            <div className=" pl-10 mt-10  flex justify-between pr-2">
              <div className="">
                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    Email :{" "}
                  </span>{" "}
                  {user.email}
                </h1>
                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    firstName :{" "}
                  </span>{" "}
                  {user.firstName}
                </h1>
                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    lastName :{" "}
                  </span>{" "}
                  {user.lastName}
                </h1>

                {user != null && user?.role == "seller" && (
                  <>
                    <PersonalInfoModel
                      isModalOpen={usenameopenmodel}
                      handleCancel={handleCancel}
                      profileview={user}
                      handleupdatestateProfile={handleupdatestateProfile}
                    />
                    <h1
                      className="flex ml-0 mt-1 cursor-pointer "
                      onClick={showusernamemodel}
                    >
                      <RiEdit2Fill size={25} />
                      Edit{" "}
                    </h1>
                  </>
                )}
              </div>

              <div className="w-[10%]">
                {user && user?.data?.profile && user?.data?.profile.logo && (
                  <div className="border-4 border-primary z-0  relative">
                    <img
                      src={user?.data?.profile.logo}
                      className="w-full h-full z-30 bg-white"
                      style={{ marginLeft: "-20px" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <hr className=" mt-4" />

            {user != null && user?.role == "seller" && (
              <div className=" pl-10 mt-1  ">
                <h1 className=" text-border font-bold text-lg underline mb-3">
                  More Information
                </h1>

                {user?.data?.profile && (
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <span className="text-border font-bold text-md">
                        companyEmail:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.companyEmail &&
                          user?.data?.profile.companyEmail}
                      </h1>
                    </Col>
                    <Col span={8}>
                      <span className="text-border font-bold text-md">
                        companyName:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.companyName &&
                          user?.data?.profile.companyName}
                      </h1>
                    </Col>
                    <Col span={8}>
                      <span className="text-border font-bold text-md">
                        phoneNumber:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.phoneNumber &&
                          user?.data?.profile.phoneNumber}
                      </h1>
                    </Col>
                    <Col span={8}>
                      <span className="text-border font-bold text-md">
                        website:{" "}
                      </span>
                      <h1 className="font-bold  disabled:bg-black">
                        <a
                          className="bg-primary rounded-sm p-1 text-white"
                          target="_blank"
                          href={
                            user?.data?.profile.website &&
                            user?.data?.profile.website
                          }
                        >
                          {" "}
                          visit website
                        </a>
                      </h1>
                    </Col>

                    {user?.data?.profile.bankAccount && (
                      <>
                        <Col span={8}>
                          <span className="text-border font-bold text-md">
                            bank:{" "}
                          </span>

                          <h1 className="font-bold">
                            {/* {user?.data?.profile?.bankAccount &&
                              JSON.parse(user?.data?.profile?.bankAccount).bank} */}

                            {user?.data?.profile?.bankAccount &&
                              (typeof user?.data?.profile?.bankAccount ===
                              "string"
                                ? JSON.parse(user?.data?.profile?.bankAccount)
                                    .bank
                                : user?.data?.profile?.bankAccount.bank)}
                          </h1>
                        </Col>
                        <Col span={8}>
                          <span className="text-border font-bold text-md">
                            accountName:{" "}
                          </span>
                          <h1 className="font-bold">
                            {/* {user?.data?.profile.bankAccount &&
                              JSON.parse(user?.data?.profile.bankAccount)
                                .accountName} */}
                            {user?.data?.profile?.bankAccount &&
                              (typeof user?.data?.profile?.bankAccount ===
                              "string"
                                ? JSON.parse(user?.data?.profile?.bankAccount)
                                    .accountName
                                : user?.data?.profile?.bankAccount.accountName)}
                          </h1>
                        </Col>
                        <Col span={8}>
                          <span className="text-border font-bold text-md">
                            accountNumber:{" "}
                          </span>
                          <h1 className="font-bold">
                            {/* {user?.data?.profile.bankAccount &&
                              JSON.parse(user?.data?.profile.bankAccount)
                                .accountNumber} */}
                            {user?.data?.profile?.bankAccount &&
                              (typeof user?.data?.profile?.bankAccount ===
                              "string"
                                ? JSON.parse(user?.data?.profile?.bankAccount)
                                    .accountNumber
                                : user?.data?.profile?.bankAccount
                                    .accountNumber)}
                          </h1>
                        </Col>
                        <Col span={8}>
                          <span className="text-border font-bold text-md">
                            accountHolderName:{" "}
                          </span>
                          <h1 className="font-bold">
                            {/* {user?.data?.profile.bankAccount &&
                              JSON.parse(user?.data?.profile.bankAccount)
                                .accountHolderName} */}
                            {user?.data?.profile?.bankAccount &&
                              (typeof user?.data?.profile?.bankAccount ===
                              "string"
                                ? JSON.parse(user?.data?.profile?.bankAccount)
                                    .accountHolderName
                                : user?.data?.profile?.bankAccount
                                    .accountHolderName)}
                          </h1>
                        </Col>
                      </>
                    )}

                    <Col span={8}>
                      <span className="text-border font-bold text-md">
                        cardNumber:
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.cardNumber &&
                          user?.data?.profile.cardNumber}
                      </h1>
                    </Col>

                    {user?.data?.profile.locations &&
                      user?.data?.profile.locations.length > 0 && (
                        <Col span={24}>
                          <span className="text-border font-bold text-md">
                            address:{" "}
                          </span>
                          <h1 className="font-bold">
                            {user?.data?.profile.locations[0].address}
                          </h1>
                        </Col>
                      )}
                  </Row>
                )}
              </div>
            )}
          </>
        )}

        <CompanyModel
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          profileview={user}
          handleupdatestateProfile={handleupdatestateProfile}
        />
      </div>
    </div>
  );
};

export default SellerProfile;
