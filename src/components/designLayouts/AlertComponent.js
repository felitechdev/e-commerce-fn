import { Alert } from "flowbite-react";

export const AlertComponent = (props) => {
  return (
    <Alert color={props.color}>
      <p className="capitalize-first">{props.message}</p>
    </Alert>
  );
};

export default AlertComponent;
