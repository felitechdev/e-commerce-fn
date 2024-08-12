import { Button, Select, Form, Input, Modal, Upload } from "antd";

import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdateOrder } from "../../../../APIs/Oreders";
import Cookies from "js-cookie";
import { updateOrderStatus } from "../../../../redux/Reducers/OrderReducer";

import MtnIcon from "../../../../assets/images/MTN.png";
import AirtelIcon from "../../../../assets/images/Airtel.png";
import CardIcon from "../../../../assets/images/visacard.png";
import { CgFormatSlash } from "react-icons/cg";
import { OrderForm } from "../../../../pages/Checkout";
const { confirm } = Modal;

export const RepayOrder = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openrepaymodel, setOpenrepaymodel] = useState(false);
  const [cardpay, setCardpay] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  const { order, loadorder, errororder } = useSelector(
    (state) => state.updateoreder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalOpen(props.setModel);
  }, [props.setModel]);
  const handlecancel = () => {
    setOpenrepaymodel(false);
    setCardpay(false);
    props.setIspayopen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    props.openModal(false);
    // setOpenrepaymodel(false);
  };

  const handleOk = (values) => {
    if (token && values) {
      dispatch(
        UpdateOrder({
          token,
          id: props.order,
          status: values.status,
        })
      )
        .unwrap()
        .then((data) => {
          if (data?.status == "success") {
            dispatch(
              updateOrderStatus({
                orderId: props.order,
                status: values.status,
              })
            );
            props.handleupdatestate(props.order, values.status);
            handleCancel();
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        title="Pay Order"
        // width="50rem"
        open={isModalOpen}
        closeIcon={
          <IoCloseSharp onClick={handleCancel} className="text-[red]" />
        }
        style={{
          width: "30rem",
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {openrepaymodel && !cardpay && (
          <OrderForm
            token={token}
            // cartTotl={cartTotl}
            totalCost={props.order?.amount}
            isModalOpen={openrepaymodel}
            // shippingAddress={requestData}
            // deliveryPreference={deliveryPreference}
            handlecancel={handlecancel}
            momo_payload={
              props.order.payment_type.type == "mobile_money"
                ? {
                    ...props.order.momo_payload,
                    order_id: props.order?.id,
                  }
                : {
                    tx_ref: props.order?.tx_ref,
                    order_id: props.order?.id,
                    amount: props.order?.amount,
                    currency: props.order?.currency,
                    email: props.order?.email,
                    phone_number: props.order?.phone_number,
                    fullname: props.order?.fullname,
                  }
            }
            isrepay={true}
          />
        )}

        <div className=" flex items-center">
          <button
            disabled={loading}
            // htmlType="submit"
            onClick={() => {
              setOpenrepaymodel(true);
              setCardpay(false);
            }}
            className="h-10 flex bg-black items-center rounded-md bg-gradient-custom text-white disabled:opacity-50 px-2 duration-300"
          >
            <span className="flex items-center tracking-widest">
              {/* <span className="mr-2 font-bold">Mobile money </span> */}

              <img src={MtnIcon} className="w-14 rounded" />
            </span>
            <CgFormatSlash
              style={{
                color: "#ffffff",
                fontSize: "1.8rem",
              }}
            />
            <span>
              <img src={AirtelIcon} className="w-14 rounded" />
            </span>
          </button>

          <button
            disabled={loading}
            htmlType="submit"
            // type="button"
            onClick={() => {
              // handlecancel();
              // handlecardpay();
            }}
            className="h-10 rounded-md bg-gradient-custom-card ml-2 text-white disabled:opacity-50 px-5 duration-300"
          >
            <span className="flex items-center tracking-widest">
              {/* <span className="mr-2 font-bold">Card</span> */}

              <img src={CardIcon} className="w-14 rounded" />
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
};
