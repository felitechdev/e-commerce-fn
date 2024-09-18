import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { EyeFilled } from "@ant-design/icons";
import CompanyModel from "./CompanyModel/CompanyModel";
import { GetMyprofilebyId, getprofileAddress } from "../../../APIs/UserAPIs";
import { ImageUpload } from "../../../components/profile/photoupdate/Updateimage";
import Cookies from "js-cookie";
import { LoaderComponent } from "../../../components/Loaders/Getloader";
import PersonalInfoModel from "./userinfo";
import { useUser } from "../../../context/UserContex";
import axios from "axios";
import { Checkbox } from "antd";
import Mymap from "./Googlemap/getLocation";
import { App } from "./Googlemap/getLocation";
import MyMapComponent from "./Googlemap/GoogleMap";
import { DeleteFilled } from "@ant-design/icons";
import DeleteConfirmation from "./Actions/deleteAccount";
import PersonalAddressInfoModel from "./my-address-modal";

const enableTwoFactorAuth = async () => {
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/enable-2fa`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (result.status === 200) {
      alert("2FA enabled successfully");
    }
  } catch (err) {
    alert("Failed to enable 2FA");
  }
};

const SellerProfile = () => {
  const [isLoading, setLoading] = useState(true);
  const token = Cookies.get("token");
  // const [user, onSetProfile] = useUser();
  const [myaddress, setMyaddress] = useState();
  const user = useUser().user;
  const setUser = useUser().setUser;
  const onSetProfile = useUser().onSetProfile;

  const { address, loadaddress, erraddress } = useSelector(
    (state) => state.myaddress
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [usenameopenmodel, setUsernameopenmodel] = useState(false);
  const [openaddressmodel, setOpenaddressmodel] = useState(false);
  const handleCancel = () => {
    setUsernameopenmodel(false);
    setIsModalOpen(false);
  };

  const handlecloseaddressmodel = () => {
    setOpenaddressmodel(false);
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
    onSetProfile(data);
  };

  const handleupdatestate = (data) => {
    onSetProfile(data);
  };

  useEffect(() => {
    dispatch(getprofileAddress({ token: token, id: user?.id }))
      .unwrap()
      .then((data) => {})
      .catch((error) => {});
  }, []);

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
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // console.log("address", address, loadaddress);

  return (
    // <div className=" flex   justify-center  w-full h-min">
    <div className="bg-white   w-full  md:w-[70%]  h-min  pb-3">
      <div className="   bg-[white] rounded-md w-full pr-3 min-h-[500px] pb-3">
        <div className=" rounded-t-md flex  justify-between space-x-3 font-normal md:pl-10  py-3  px-2 text-xl">
          <div className="flex flex-col   ">
            {user ? (
              <>
                <div className="flex  space-x-2 items-center">
                  {/* {(user?.profileImageUrl !== "default.jpg" ||
                    user?.photo !== "default.jpg") && (
                    <img
                      src={user?.photo}
                      alt={user?.firstName}
                      className=" w-14 h-14 rounded-full border-2 p-1 "
                    />
                  )} */}

                  {user?.profileImageUrl == "default.jpg" ||
                  user?.photo == "default.jpg" ? (
                    <h1 className="bg-primary text-white font-bold px-1 rounded-sm text-2xl">
                      {user?.firstName[0]}
                    </h1>
                  ) : (
                    <img
                      src={user?.photo}
                      alt={user?.firstName}
                      className=" w-14 h-14 rounded-full border-2 p-1 "
                    />
                  )}

                  <h1 className="font-bold text-xl">{user?.firstName}</h1>
                </div>

                <h1
                  className="flex ml-0 mt-1 text-sm   cursor-pointer "
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
                className="flex space-x-2 cursor-pointer font-bold  text-primary  "
                onClick={showusernamemodel}
              >
                <RiEdit2Fill size={20} />
                <h1 className="text-sm">Edit Profile</h1>
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
            <div className=" md:pl-10 mt-10   flex justify-between pr-2">
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
                      className="flex ml-0 mt-1 cursor-pointer border "
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

              {/* <div
                className=" cursor-pointer md:flex items-center md:border p-1  md:space-x-2 font-bold text-[red] "
                onClick={() => ShowDeleteConfirm(user?._id, token)}
              >
                <DeleteFilled className=" text-icon3" />
                <h1 className="text-sm">Delete Account</h1>
              </div> */}
              <DeleteConfirmation id={user?.id} token={token} />
            </div>

            <div className="flex mt-3  md:pl-10 justify-between pr-2">
              <div className="flex-col justify-between">
                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    phoneNumber :{" "}
                  </span>
                  {}
                  {address?.data?.profile?.phoneNumber}
                </h1>
                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    District:{" "}
                  </span>
                  {}
                  {address?.data?.profile?.address?.district}
                </h1>

                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    Sector:{" "}
                  </span>
                  {}
                  {address?.data?.profile?.address?.sector}
                </h1>

                <h1>
                  {" "}
                  <span className="text-border font-bold text-md">
                    Street:{" "}
                  </span>
                  {}
                  {address?.data?.profile?.address?.street}
                </h1>
              </div>
              <PersonalAddressInfoModel
                isModalOpen={openaddressmodel}
                handleCancel={handlecloseaddressmodel}
                address={{
                  ...address?.data?.profile,
                  address: address?.data?.profile?.address,
                }}
              />

              <div
                className="flex space-x-2 cursor-pointer font-bold  text-primary  "
                onClick={() => {
                  setOpenaddressmodel(true);
                }}
              >
                <RiEdit2Fill size={20} />
                <h1 className="text-sm">Edit My Address</h1>
              </div>
            </div>

            <div className="flex mt-3  md:pl-10 justify-between pr-2">
              {/* <h1 className="text-sm"></h1> */}

              {user.twoFactorAuthEnabled ? (
                <Checkbox
                  onChange={() => {}}
                  checked={user.twoFactorAuthEnabled}
                >
                  2 Factor Authentication Enabled
                </Checkbox>
              ) : (
                <button
                  className="bg-primary text-white rounded-md p-1 px-2"
                  onClick={enableTwoFactorAuth}
                >
                  Enable 2 Factor Authentication
                </button>
              )}
            </div>
            <hr className=" mt-4" />

            {user != null && user?.role == "seller" && (
              <div className="pl-2 md:pl-10 mt-1  ">
                <h1 className=" text-border font-bold text-lg underline mb-3">
                  More Information
                </h1>

                {user?.data?.profile && (
                  <Row gutter={[16, 16]}>
                    {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row> */}
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className=" flex md:block"
                    >
                      <span className="text-border font-bold text-md ">
                        companyEmail:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.companyEmail &&
                          user?.data?.profile.companyEmail}
                      </h1>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className=" flex md:block"
                    >
                      <span className="text-border font-bold text-md">
                        companyName:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.companyName &&
                          user?.data?.profile.companyName}
                      </h1>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className=" flex md:block"
                    >
                      <span className="text-border font-bold text-md">
                        phoneNumber:{" "}
                      </span>
                      <h1 className="font-bold">
                        {user?.data?.profile.phoneNumber &&
                          user?.data?.profile.phoneNumber}
                      </h1>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className=" flex md:block"
                    >
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
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className=" flex md:block"
                        >
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
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className=" flex md:block"
                        >
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
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className=" flex md:block"
                        >
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
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className=" flex md:block"
                        >
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

                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className=" flex md:block"
                    >
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
                        <Col span={24} className=" flex md:block">
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
            {/* <div className=" p-0  md:pl-10 mt-1  ">
              <h1 className=" text-border font-bold text-lg  underline mb-3">
                My location
              </h1> */}

            {/* <MyMapComponent /> */}
            {/* </div> */}
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
