import React from "react";
import { useState, useEffect } from "react";
import { Alert, Space } from "antd";

const Alerts = (props) => {
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    setSelectedType(props.type);
  }, [props.type]);

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      {selectedType === "success" && (
        <Alert
          className={`${props.className} border-primary`}
          message="Success"
          description={props.description}
          type="success"
          showIcon
          closable
          onClose={() => props.onClose()}
        />
      )}

      {selectedType === "warning" && (
        <Alert
          message="Warning"
          description={props.description}
          type="warning"
          showIcon
          closable
          onClose={() => props.onClose()}
          className={`${props.className}`}
        />
      )}

      {selectedType === "error" && (
        <Alert
          className={`${props.className} border border-[red]`}
          message="Error"
          description={props.description}
          type="error"
          showIcon
          closable
          onClose={() => props.onClose()}
        />
      )}
    </Space>
  );
};

export default Alerts;
