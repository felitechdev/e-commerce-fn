import { Button } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";

//  component for displaying cancel and save buttons on Model antd components
const ModalFooter = (props) => {
  return (
    <>
      <div className="flex  justify-end space-x-2 pr-0 mt-2">
        <Button onClick={props.onCancel}>
          {" "}
          <span>
            {" "}
            <CloseOutlined /> Cancel
          </span>{" "}
        </Button>
        <Button
          //   onClick={props.onOk}
          disabled={props.loading}
          htmlType="submit"
          style={{
            background: "#1D6F2B",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {props.isload || props.loading ? (
            <span>Loading...</span>
          ) : (
            <span>
              <SaveOutlined /> Save
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default ModalFooter;
