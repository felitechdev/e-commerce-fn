import { Image, Layout, Space, Table, Typography, Input, Tag } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Chart } from "../Chart/Chart";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../Loader/LoadingSpin";
// import type { TableProps } from 'antd/es/table';
import { useNavigate } from "react-router-dom";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CompanyModel from "./CompanyModel/CompanyModel";
import { ActionButton } from "./ActionButton/ActionButton";
import { fetchCompany } from "../../Apis/Company";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

export const Company = () => {
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();
  const [companys, setCompanys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // access redux userlogin actions
  // const { user, load, err } = useSelector((state) => state.userlogin);

  const { company, loadcompany, errcompany } = useSelector(
    (state) => state.getcompany
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const FilterByNameInput = (
    <Input.Search
      placeholder="search co by name ......."
      allowClear
      enterButton="Search"
      size="large"
      className="w-[50%] my-2"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const newData = companys
          .map((comp) => ({
            key: `${comp._id}`,
            name: comp.companyName,
            email: comp.email,
            phone: comp.phoneNumber,
            joindate: new Date(`${comp.createdAt}`).toLocaleDateString(),
          }))
          .filter((entry) =>
            entry.name.toLowerCase().includes(currValue.toLowerCase())
          );

        setFilteredData(newData);
      }}
      onSearch={() => setDataSource(filteredData)} // Set the dataSource when searching
    />
  );

  // implement redux
  useEffect(() => {
    if (loadcompany == true) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [loadcompany, dispatch]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!companys.length) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [dispatch, companys, token]);

  // ckeck expired token
  useEffect(() => {
    let timerRef = null;
    // decode token
    const decoded = typeof token == "string" && jwtDecode(token);

    const expiryTime = new Date(decoded.exp * 1000).getTime();
    const currentTime = new Date().getTime();

    const timeout = expiryTime - currentTime;
    const onExpire = () => {
      // navigate("/");
    };

    if (timeout > 0) {
      // token not expired, set future timeout to log out and redirect
      timerRef = setTimeout(onExpire, timeout);
    } else {
      // token expired, log out and redirect
      onExpire();
    }

    // Clear any running timers on component unmount or token state change
    return () => {
      clearTimeout(timerRef);
    };
  }, [dispatch, token]);

  useEffect(() => {
    const newData = companys.map((comp) => ({
      key: `${comp._id}`,
      name: comp.companyName,
      email: comp.email,
      phone: comp.phoneNumber,
      joindate: new Date(`${comp.createdAt}`).toLocaleDateString(),
    }));
    setDataSource(newData);
    setFilteredData(newData); // Update filteredData as well
  }, [companys]);

  const category = [
    { name: "Orders", value: 1024 },
    { name: "Earning", value: 1024 },
    { name: "Customers", value: 1024 },
    { name: "Total Earning", value: 1024 },
  ];

  const data = [];
  for (let i = 0; i < 1; i++) {
    data.push({
      key: "1",
      name: `Mike ${i}`,
      age: 32,
      address: `10 Downing Street ${i}`,
    });
  }

  // const numberOfCards = 5;

  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const Columns = [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space size={12}>
          <Image
            width={50}
            className="rounded-md"
            src={src}
            preview={{
              toolbarRender: (
                _,
                {
                  transform: { scale },
                  actions: {
                    onFlipY,
                    onFlipX,
                    onRotateLeft,
                    onRotateRight,
                    onZoomOut,
                    onZoomIn,
                  },
                }
              ) => (
                <Space size={12} className="mx-w-full h-screen">
                  <DownloadOutlined onClick={onDownload} />
                  <SwapOutlined rotate={90} onClick={onFlipY} />
                  <SwapOutlined onClick={onFlipX} />
                  <RotateLeftOutlined onClick={onRotateLeft} />
                  <RotateRightOutlined onClick={onRotateRight} />
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                </Space>
              ),
            }}
          />
          <div>
            <Title level={5} className="w-full">
              {record.name} {record.name}
            </Title>
          </div>
        </Space>
      ),
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Join date",
      dataIndex: "joindate",
      key: "joindate",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 100,
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full text-center">
          <Tag className="rounded-full bg-blue-700 text-white px-4 py-1">
            Pending
          </Tag>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      render: (_, record) => <ActionButton />,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <Layout className="space-y-6 p-2 S bg-light">
      <Space className="flex justify-between">
        <h1 className="bold_text">Company's</h1>
        <CompanyModel />
      </Space>
      {loadcompany == true ? (
        <>
          <Loader className=" text-primary flex items-center justify-center" />
          <span className=" text-primary flex items-center  justify-center">
            Loading....
          </span>
        </>
      ) : (
        <div className="">
          {FilterByNameInput}
          <Table
            rowClassName="even:bg-[#838383] hover:cursor-pointer"
            // rowSelection={{
            //   type: "checkbox",
            //   onChange: () =>
            //     // Changes to be applied
            //     {
            //       // setSelectedRows(selectedRows);
            //     },
            //   getCheckboxProps: (record) => ({
            //     disabled: false, // Column configuration not to be checked
            //   }),
            // }}
            size="small"
            tableLayout="fixed"
            bordered={false}
            style={{
              position: "sticky",
              bottom: 0,
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            dataSource={filteredData}
            columns={Columns}
            onChange={onChange}
            // scroll={{ x:, y: 1200 }}
          />
        </div>
      )}
    </Layout>
  );
};
