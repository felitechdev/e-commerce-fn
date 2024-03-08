import {
  PieChartOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
export const Menus = [
  {
    name: "Dashboard",
    link: "dashboard",
    icon: <PieChartOutlined />,
    roles: ["admin"], // All roles can see
  },
  {
    name: "Users",
    link: "users",
    icon: <ApartmentOutlined />,
    roles: ["admin"], // All roles can see
  },
  {
    name: "Contract",
    link: "contract",
    icon: <FileTextOutlined />,
    roles: ["admin", "seller"], // All roles can see
  },
  // {
  //   name: "Retailers",
  //   link: "retailer",
  //   icon: <TeamOutlined />,
  //   roles: ["admin", "seller"], // All roles can see
  // },
  {
    name: "Categories",
    link: "category",
    icon: <AppstoreAddOutlined />,
    roles: ["admin"], // Only admin can see
  },
  {
    name: "Orders",
    link: "order",
    icon: <AppstoreAddOutlined />,
    roles: ["admin", "seller", "customer"], // Admin and Seller can see
  },
  {
    name: "Products",
    link: "dashproduct",
    icon: <ShoppingOutlined />,
    roles: ["admin", "seller"], // Admin and Seller can see
  },
  {
    name: "Profile",
    link: "profile",
    icon: <AppstoreAddOutlined />,
    roles: ["admin", "seller", "customer"], // Only admin can see
  },
  {
    name: "Logout",
    link: "logout",
    icon: <AppstoreAddOutlined />,
    roles: ["admin", "seller", "customer"], // All roles can see
  },
];
export const DataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "Kicukiro District",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];
