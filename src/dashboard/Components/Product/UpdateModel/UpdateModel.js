import React, { useState } from 'react';
import { DatePicker, Form, Input, Modal, Upload } from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UpdateModel = ({setModel}) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };




  return (
    <>
      <Modal title="Create company" width="50rem" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item label="" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form
          // {...formItemLayout}
          layout={"vertical"}
          form={form}
          initialValues={""}
          onValuesChange={""}
        >
          <Form.Item label="Company Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Phone number">
          <Input placeholder="+250 788 284 364" />
          </Form.Item>
          <Form.Item label="Joined date">
            <DatePicker />
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateModel;