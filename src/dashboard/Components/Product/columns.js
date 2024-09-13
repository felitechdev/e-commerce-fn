import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
  UndoOutlined,
  StarFilled,
  CloseOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
  UnorderedListOutlined,
  filters,
  FilterFilled,
  AppstoreFilled,
} from "@ant-design/icons";
import { Checkbox } from "antd";

import {
  Button,
  Image,
  Layout,
  Space,
  Table,
  Typography,
  Input,
  Tag,
  Row,
  Col,
} from "antd";
import { ActionButton } from "./ActionButton copy/ActionButton";
export const Columns = ({
  onDownload,
  handleUpdatestate,
  handlecountorders,
  source,
  stock,
}) => [
  {
    // title: `Product ${FilterByNameInput}`,
    title: "Product",
    dataIndex: "name",
    key: "name",
    colSpan: "1",
    render: (_, record, index) => (
      <Space size={12} className="" key={index}>
        <Image
          width={50}
          className="rounded-md"
          src={record.name[0]}
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
                  onReset,
                },
                // actions: {
                //   onFlipY,
                //   onFlipX,
                //   onRotateLeft,
                //   onRotateRight,
                //   onZoomOut,
                //   onZoomIn,
                //   onClose,
                // },
              }
            ) => (
              <Space size={12} className="toolbar-wrapper">
                <DownloadOutlined onClick={() => onDownload(source)} />
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                <UndoOutlined onClick={onReset} />
              </Space>
            ),
          }}
        />

        <div className=" overflow-auto ">
          <strong className="w-full">{record.name[1]}</strong>

          {/* display value as html */}
          {/* <div
              className="w-full overflow-auto  "
              dangerouslySetInnerHTML={{
                __html: record.name[2].slice(0, 30) + "...",
              }}
            /> */}
        </div>
      </Space>
    ),

    width: 100,
  },
  {
    title: "Stock",
    dataIndex: { stock },
    key: "Stock",
    width: 60,
    render: (_, record) => (
      <div className="w-full text-start">
        <span>{record.stock} units</span>
      </div>
    ),
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
    width: 100,
    render: (_, record) => (
      <div className="w-full text-start">
        <span>{record.price.toLocaleString()} RWF</span>
      </div>
    ),
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Enabled",
    dataIndex: "Enabled",
    key: "Enabled",
    width: 60,
    render: (_, record) => () => {
      return (
        <Tag color="green" key={record.key}>
          Enabled
        </Tag>
      );
    },
  },
  {
    title: "Featured",
    dataIndex: "featured",
    key: "featured",
    width: 60,
    render: (_, record) => {
      return (
        <span>
          Featured:
          <Checkbox onChange={() => {}} checked={record.featured}></Checkbox>
        </span>
      );
    },
  },
  {
    title: "Commission",
    dataIndex: "commission",
    key: "commission",
    width: 100,
    render: (_, record) => (
      <div className="w-full text-start">
        <span>
          {record?.commission ? record?.commission * 100 + "%" : "No "}
        </span>
      </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "Action",
    width: 100,
    render: (_, record) => (
      <>
        <ActionButton
          handleUpdatestate={handleUpdatestate}
          productId={record.key}
        />
        {/* <EditFilled className=" text-icon2 mr-2" />
          <EyeFilled className=" text-icon1 mr-2" />
          <DeleteFilled className=" text-icon3" /> */}

        {/* <ActionButton /> */}
      </>
    ),
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
    width: 30,
    render: (_, record) => {
      const orders = handlecountorders(record.key);

      return (
        <div className="w-full text-start">
          <span>total: {orders}</span>
        </div>
      );
    },
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    width: 50,
    render: (_, record) => (
      <div className="w-full text-start">
        <span>
          **
          <StarFilled className="text-icon1" />
        </span>
      </div>
    ),
  },
  {
    title: "Published",
    dataIndex: "published",
    key: "published",
    width: 100,
    // sorter: (a, b) => a.age - b.age,
  },
];
