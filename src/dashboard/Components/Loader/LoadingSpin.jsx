import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
export const Loader = ({ fontSize = 24, ...props }) => (
  <Spin
    className={`${props.className} text-primary `}
    indicator={
      <LoadingOutlined
        style={{
          fontSize,
        }}
        spin
      />
    }
  />
);
