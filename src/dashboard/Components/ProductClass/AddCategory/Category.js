import { useState, useEffect } from "react";
import { Button, Form, Image, Input, Modal } from "antd";
import {
  CloseOutlined,
  FileImageOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createcategory, updatecategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import {
  updateProductClass,
  deleteProductClass,
} from "../../../Redux/ReduxSlice/ProductClass";
import Alerts from "../../Notifications&Alert/Alert";

import { createProductClass } from "../../../Redux/ReduxSlice/ProductClass";
import UploadWidget from "../../../../components/CLOUDIMAGES/UploadWidget";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
export const ProductClassForm = (props) => {
  // State to control alert display
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertIndexonUpdate, setAlertIndexonUpdate] = useState(null);

  const [alertDescription, setAlertDescription] = useState("");
  const [alertDescriptiononUpdate, setAlertDescriptiononUpdate] = useState("");
  const [isupdate, setIsupdate] = useState(false);
  const [iconurl, setIconurl] = useState("");
  const [iconError, setIconError] = useState("");

  const { productclass, loadupdate, loading, errorMessage } = useSelector(
    (state) => state.productclass
  );
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: props.name,
      icon: props.icon,
    },
  });
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createProductClass({ data: data }))
      .unwrap()
      .then((response) => {
        if (response.status == 201) {
          setAlertIndex("success");
          setAlertDescription(`${"product class created"}`);
          // dispatch(fetchCategory());
        }
      })
      .catch((er) => {
        setAlertIndex("error");
        setAlertDescription("Error creating product class: " + er.message);
      });
  };

  // handle submit update
  const onSubmitUpdate = (data) => {
    const categoryId = props.categoryId;
    dispatch(
      updateProductClass({
        Data: data,
        id: categoryId,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status == 200) {
          setAlertIndexonUpdate("success"); // Display success alert on success
          setAlertDescriptiononUpdate(`${"product class updated"}`);
          // dispatch(fetchCategory(token));
        }
      })
      .catch((er) => {
        setAlertIndexonUpdate("error"); // Display error alert on error
        setAlertDescriptiononUpdate("Error : " + er.message);
      });
  };
  const onErrors = (errors) => {
    console.log("err", errors);
  };

  const validateMessages = {
    name: {
      required: "product class is required!",
    },
    icon: {
      required: "Category Icon is Required",
    },
  };

  // Reset alertIndex to hide the alert
  useEffect(() => {
    if (loading) {
      setAlertIndex(null);
    }
  }, [loading, dispatch, alertDescription, alertIndex]);
  const handleAlertClose = () => {
    setAlertIndex(null);
  };

  // change model to handle updat
  const handleUpdate = () => {
    setIsupdate(true);
  };
  useEffect(() => {
    if (props.openUPdate) {
      setIconurl(props.icon);
      setValue("icon", props.icon);
      handleUpdate();
    }
  }, [isupdate]);

  const handleIconImage = (error, result, widget) => {
    if (error) {
      setIconError("some thing wrong with the image");
      return;
    }
    setIconurl(result?.info?.secure_url);
    setValue("icon", result?.info?.secure_url);
    setIconError("");
  };

  return (
    <div className="">
      {alertIndex !== null && (
        <Alerts
          type={alertIndex}
          description={alertDescription}
          onClose={handleAlertClose}
          className="w-[60%] m-auto"
        />
      )}

      {alertIndexonUpdate !== null && (
        <Alerts
          type={alertIndexonUpdate}
          description={alertDescriptiononUpdate}
          onClose={handleAlertClose}
          className="w-[60%] m-auto"
        />
      )}
      <Form
        layout={"vertical"}
        initialValues={""}
        onValuesChange={""}
        className="mt-10 mb-10"
        onFinish={
          !isupdate
            ? handleSubmit(onSubmit, onErrors)
            : handleSubmit(onSubmitUpdate, onErrors)
        }
      >
        <div className="w-[60%] border  flex flex-col items-center justify-center rounded m-auto p-5">
          {isupdate ? (
            <span className="text-primary font-bold">Update Product Class</span>
          ) : (
            <span className="text-primary font-bold">Add Product Class</span>
          )}

          <Controller
            control={control}
            name="name"
            rules={validateMessages.name}
            render={({ field }) => (
              <>
                <Form.Item label="Enter producut class" className=" w-[100%]">
                  <Input {...field} placeholder="" />
                  <p className="text-[red]">{errors?.name?.message}</p>
                </Form.Item>
              </>
            )}
          />

          <div className="flex flex-col justify-center items-center border rounded ">
            <Controller
              control={control}
              name="icon"
              rules={validateMessages.icon}
              render={({ field }) => (
                <>
                  <Form.Item
                    label=""
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    className=" text-center mt-2 p-3 "
                  >
                    <span className="">
                      Drop Category Icon here or click to upload.
                    </span>

                    <UploadWidget onUpload={handleIconImage}>
                      {({ open }) => (
                        <Button
                          className=""
                          icon={<FileImageOutlined />}
                          onClick={open}
                        >
                          Upload
                        </Button>
                      )}
                    </UploadWidget>
                  </Form.Item>

                  <div className=" relative ">
                    {iconurl && (
                      <>
                        <Image width={70} height={70} src={iconurl} />
                        <MinusCircleOutlined
                          className="text-[red] text-xl absolute -top-3 font-bold -right-2"
                          onClick={() => {
                            setIconurl("");
                          }}
                        />
                      </>
                    )}
                  </div>

                  {iconError && <p className="text-[red]">{iconError}</p>}

                  <p className="text-[red]">{errors?.icon?.message}</p>
                </>
              )}
            />
          </div>

          <Button
            htmlType="submit"
            style={{
              background: "#1D6F2B",
              color: "white",
            }}
            className="text-light font-bold w-[100%]"
          >
            {!isupdate
              ? loading
                ? "Loading ..."
                : "Create Class"
              : loadupdate
              ? "Loading ..."
              : "Update Class"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
