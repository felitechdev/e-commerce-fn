import React, { useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import {
  CloseOutlined,
  SaveOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import ModalFooter from "../../Button/Modelfooter";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ContractModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add contract</Button>
      <Modal
        title="Add Contract"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined className="text-[red]" />}
        okText={
          <span>
            <SaveOutlined />
            Save
          </span>
        }
        cancelText={
          <span>
            <CloseOutlined /> Cancel
          </span>
        }
      >
        <Form
          // {...formItemLayout}
          layout={"vertical"}
          form={form}
          initialValues={""}
          onValuesChange={""}
        >
          <div className="w-[80%] m-auto">
            <Form.Item label="Contarct Name">
              <Input placeholder="Enter Contact name" />
            </Form.Item>
            <Form.Item label="Status">
              <Input placeholder="Enter status" />
            </Form.Item>
            <div className="  ">
              <Form.Item
                label=""
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className=" text-center mt-2  "
                layout={"vertical"}
              >
                <span className="font-light">Companies Involved</span>
                <br />
                <span className="font-semibold">Import Logo</span>
                <Upload action="/upload.do" listType="picture-card">
                  <Button icon={<FileImageOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <div className="w-[80%] border  m-auto rounded  p-5 ">
            <div className=" text-center py-2 sm:flex sm:flex-col md:space-x-0  md:flex-row md:justify-between">
              <Form.Item label="Dealparty 1" name="dealparty">
                <Input type="text" placeholder="Enter position" />
              </Form.Item>

              <Form.Item>
                <Upload action="/upload.do" listType="picture-card">
                  <Button className="" icon={<FileImageOutlined />}>
                    Upload profile
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className=" text-center py-2 sm:flex sm:flex-col md:space-x-0  md:flex-row md:justify-between">
              <Form.Item label="Dealparty 2" name="dealparty2">
                <Input type="text" placeholder="Enter position" />
              </Form.Item>

              <Form.Item>
                <Upload action="/upload.do" listType="picture-card">
                  <Button className="" icon={<FileImageOutlined />}>
                    Upload profile
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <ModalFooter onCancel={handleCancel} onOk={handleOk} />
        </Form>
      </Modal>
    </>
  );
};

export default ContractModel;
