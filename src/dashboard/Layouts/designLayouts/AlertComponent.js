import { Alert } from "flowbite-react";

export const AlertComponent = (props) => {
  return (
    <Alert color={props.color} className={`${props.className} mb-2`}>
      <span>
        <p>
          <span className="font-medium mr-2">
            {props.type} {/* Error or Success */}
          </span>
          {props.message}
        </p>
      </span>
    </Alert>
  );
};

export default AlertComponent;
