import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
export const LoaderComponent = ({ ...props }) => (
  <Spin
    className={props.className}
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    }
  />
);
