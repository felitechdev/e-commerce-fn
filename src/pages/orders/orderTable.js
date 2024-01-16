export const CustomerOrderTable = (props) => {
  const dateString = "2024-01-12T10:32:21.830Z";
  const dateObject = new Date(props.createdat);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  const formattedDate = dateObject.toLocaleString("en-US", options);
  return (
    <>
      <tr className="border-b-4 h-10 border-secondary" key={props.key}>
        <td className="text-center">{props.id}</td>
        <td className="text-center">{formattedDate}</td>
        <td className="text-center">{props.status}</td>
        <td className="text-center">{props.total}</td>
        <td className="text-center">
          {/* <NavLink to="/myAccount/orders/1">
            <EyeFilled />
          </NavLink> */}
        </td>
      </tr>
    </>
  );
};
