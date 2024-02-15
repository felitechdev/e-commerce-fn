import React, { useContext, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu, Button, Dropdown, Space, Avatar } from "antd";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Menus } from "../Common";
import Cookies from "js-cookie";
import { useUser } from "../../context/UserContex";

const { Header, Sider, Content } = Layout;

const TitleContext = React.createContext();

export const useTitleContext = () => React.useContext(TitleContext);

export const LayoutDesign = ({ userprofile }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, onLogout } = useUser();
  const userRole = user?.role;

  const { profile, errprofile } = useSelector((state) => state.userprofile);

  // State to hold the dynamic title
  const [dynamicTitle, setDynamicTitle] = React.useState("Dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      errprofile &&
      (errprofile.message === "jwt expired, Please login again" ||
        errprofile.message === "jwt malformed, Please login again")
    ) {
      Cookies.remove("token");
      localStorage.removeItem("selectedKey");
      navigate("/");
    }
  }, [errprofile, navigate]);
  const titles = {
    0: "Dashboard",
    1: "Seller",
    2: "Contract",
    3: "Categories",
    4: "Orders",
    5: "Products",
    6: "Profile",
    7: "Logout",
  };
  // Function to handle menu item click and update title
  const handleMenuClick = (menuItem) => {
    // Update the dynamic title based on the selected menu item
    setDynamicTitle(titles[menuItem.key]);
    localStorage.setItem("selectedKey", menuItem.key);
  };

  let selectedKey = localStorage.getItem("selectedKey") || "0";

  const handleSignOut = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  const handleItemClick = (key) => {
    if (key === "1") {
      navigate("/user/profile");
      localStorage.setItem("selectedKey", "6");
    } else if (key === "2") {
      handleSignOut();
      // onLogout();
      // navigate("/", { replace: true });
    }
  };

  const items = [
    {
      key: "1",
      label: <Space className="pr-6 py-[.5rem]">view Profile</Space>,
      icon: <UserOutlined className="pl-4" />,
      onClick: () => handleItemClick("1"),
    },
    {
      key: "2",
      label: <Space className="pr-6 py-[.5rem]">Logout</Space>,
      icon: <LockOutlined className="pl-4" />,
      onClick: () => handleItemClick("2"),
    },
  ];
  useEffect(() => {
    if (
      errprofile &&
      (errprofile.message === "jwt expired, Please login again" ||
        errprofile.message === "jwt malformed, Please login again")
    ) {
      Cookies.remove("token");

      navigate("/");
    }
  }, [errprofile, navigate]);

  return (
    <TitleContext.Provider value={titles[selectedKey]}>
      <Layout style={{ minHeight: "100vh", backgroundColor: "red" }}>
        <Sider
          // className="sticky top-0 h-screen bg-[#FFF]"
          className="bg-[#FFF]"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            // overflow: "auto",
            // minHeight: "100%",
            backgroundColor: "white",
          }}
        >
          <Avatar
            onClick={() => navigate("/", { replace: true })}
            className="w-20 mx-4 h-20"
            src="https://res.cloudinary.com/dy2opnabf/image/upload/v1699009141/FeliTechWhiteLogo_aml9yf-removebg-preview_kfwo3b.png"
          />

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            className="font-bold text-primary"
          >
            {Menus.map((item, index) => {
              return (
                item.roles.includes(userRole) && (
                  <Menu.Item
                    key={index}
                    icon={item.icon}
                    onClick={() => {
                      if (item.name === "Logout") {
                        handleSignOut();
                      }
                    }}
                  >
                    <NavLink to={`/user/${item.link}`}>{item.name}</NavLink>
                  </Menu.Item>
                )
              );
            })}
          </Menu>
        </Sider>
        <Layout className="overflow-auto scrollbar-hidden bg-light">
          <Header className="sticky z-50 top-0 bg-primary flex justify-between px-0 pr-6">
            <div className="flex items-center ">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "26px",
                  width: 64,
                  height: 64,
                  fontWeight: "bold",
                  color: "white",
                }}
              />
              <TitleDisplay />
            </div>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow
              overlay={
                <Menu>
                  {items.map((item) => (
                    <Menu.Item key={item.key} onClick={item.onClick}>
                      {item.icon}
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <Space wrap size={16}>
                {user && user?.profileImageUrl == "default.jpg" ? (
                  <Avatar shape="square" size={50} icon={<UserOutlined />} />
                ) : (
                  <>
                    <img
                      src={`${user && user?.photo}`}
                      className="h-14 w-14 rounded-full mt-1 mb-1 "
                      alt={user?.firstName}
                    />
                  </>
                )}
              </Space>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "1rem 3px",
              padding: 2,
              background: "white",
            }}
            className="h-full"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </TitleContext.Provider>
  );
};

// TitleDisplay component to consume the dynamic title from context
const TitleDisplay = () => {
  const dynamicTitle = useTitleContext();

  return (
    <h1 className="font-bold text-white" style={{ marginLeft: "16px" }}>
      {dynamicTitle}
    </h1>
  );
};
