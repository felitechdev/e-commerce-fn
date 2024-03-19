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
    link: "/",
    icon: <PieChartOutlined />,
  },
  {
    name: "Company",
    link: "/company",
    icon: <ApartmentOutlined />,
  },
  // {
  //   name: "Contract",
  //   link: "/contract",
  //   icon: <FileTextOutlined />,
  // },
  {
    name: "Products",
    link: "/product",
    icon: <ShoppingOutlined />,
  },
  {
    name: "Retailers",
    link: "/retailer",
    icon: <TeamOutlined />,
  },
  {
    name: "Categories",
    link: "/category",
    icon: <AppstoreAddOutlined />,
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
