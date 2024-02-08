import React, { useState } from "react";
import { Button, Form, Input, Modal, Tabs } from "antd";
import { ProductCatery } from "../AddCategory/Category";
import { SubCategory } from "../AddCategory/SubCategory";

import { Controller, useForm } from "react-hook-form";

const { TabPane } = Tabs;
const CategoryModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <Button onClick={showModal}>Add Category</Button>
      <Modal
        title="Create Category"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs
          tabBarStyle={{
            background: "#f0f0f0",
            color: "black",
            padding: "0px 0px",
            fontWeight: "bold",
          }}
          activeKey={activeKey}
          onChange={onChange}
        >
          {/* main category tabpan */}
          <TabPane
            tab={
              <span
                className={
                  activeKey === "1"
                    ? " bg-white  text-[#1D6F2B] "
                    : "text-[black]"
                }
              >
                Main Category
              </span>
            }
            key="1"
          >
            {" "}
            <span className="text-primary m-auto flex p-3 text-xl  justify-center  font-bold">
              Product's Category
            </span>
            <ProductCatery />
          </TabPane>

          {/* sub category tab */}
          <TabPane
            tab={
              <span
                className={
                  activeKey === "2"
                    ? " bg-white  text-[#1D6F2B] "
                    : "text-[black]"
                }
              >
                Sub-category
              </span>
            }
            key="2"
          >
            {" "}
            <span className="text-primary m-auto flex p-3 text-xl  justify-center  font-bold">
              Product's Category
            </span>
            <SubCategory />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CategoryModel;
