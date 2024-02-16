import { Button, DatePicker, Dropdown, Form, Input, Modal, Upload } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { confirm } = Modal;

const ShowDeleteConfirm = () => {
  confirm({
    title: "Are you sure delete this Company?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const UpdateModel = ({ setModel }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create company"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            label=""
            name="fileList"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Company Name" name="companyName">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Phone number" name="phoneNumber">
            <Input placeholder="+250 788 284 364" />
          </Form.Item>
          <Form.Item label="Joined date" name="joinedDate">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export const ActionButton = (props) => {
  const handleClick = () => {
    <UpdateModel setModel={true} />;
  };

  return (
    <>
      <Dropdown
        menu={{
          items: props.items,

          // // ...props.items,
          // {
          //   label: "Modifier",
          //   key: "edit",
          //   icon: <EditOutlined />,
          //   onClick: handleClick,
          // },
          // {
          //   label: "Supprimer",
          //   key: "delete",
          //   icon: <DeleteOutlined />,
          //   danger: true,
          //   onClick: ShowDeleteConfirm,
          // },
        }}
        className=""
        arrow={{ pointAtCenter: true }}
        trigger={["click"]}
        destroyPopupOnHide={true}
        placement="bottomRight"
      >
        <Button
          icon={<MoreOutlined />}
          shape="circle"
          type="text"
          onClick={(e) => e.preventDefault()}
        />
      </Dropdown>
    </>
  );
};
