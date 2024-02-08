import { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createcategory, updatecategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import Alerts from "../../Notifications&Alert/Alert";
import { fetchCategory } from "../../../Apis/Categories";

export const ProductCatery = (props) => {
  // State to control alert display
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertIndexonUpdate, setAlertIndexonUpdate] = useState(null);

  const [alertDescription, setAlertDescription] = useState("");
  const [alertDescriptiononUpdate, setAlertDescriptiononUpdate] = useState("");
  const [isupdate, setIsupdate] = useState(false);

  const { category, load, err } = useSelector((state) => state.createcategory);
  const { updateloading, updaterror, updateCategory } = useSelector(
    (state) => state.updatecat
  );
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createcategory({ Data: data, token: token }))
      .unwrap()
      .then((response) => {
        if (response.status == 201) {
          setAlertIndex("success"); // Display success alert on success
          setAlertDescription(`${"category created"}`);
          dispatch(fetchCategory());
        }
        // refetch categories
        dispatch(fetchCategory(token));
      })
      .catch((er) => {
        console.log("error while creating category on", er);
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error creating category: " + er.message);
      });
  };

  // handle submit update
  const onSubmitUpdate = (data) => {
    const categoryId = props.categoryId;
    dispatch(updatecategory({ Data: data, id: categoryId, token: token }))
      .unwrap()
      .then((response) => {
        console.log("response on update category", response);
        if (response.status == 200) {
          setAlertIndexonUpdate("success"); // Display success alert on success
          setAlertDescriptiononUpdate(`${"category updated"}`);
          // dispatch(fetchCategory(token));
        }
      })
      .catch((er) => {
        console.log("error  on update", er);
        setAlertIndexonUpdate("error"); // Display error alert on error
        setAlertDescriptiononUpdate("Error : " + er.message);
      });
  };
  const onErrors = (errors) => console.log("errors on form creation", errors);

  const validateMessages = {
    name: {
      required: "categoryname is required!",
    },
  };

  // Reset alertIndex to hide the alert
  useEffect(() => {
    if (load) {
      setAlertIndex(null);
    }
  }, [load, dispatch, alertDescription, alertIndex]);
  const handleAlertClose = () => {
    setAlertIndex(null);
  };

  // change model to handle updat
  const handleUpdate = () => {
    setIsupdate(true);
  };
  useEffect(() => {
    console.log("props.openUPdate", props.openUPdate, props.categoryId);
    if (props.openUPdate) {
      handleUpdate();
    }
  }, [isupdate]);

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
            <span className="text-primary font-bold">Update Category</span>
          ) : (
            <span className="text-primary font-bold">Add Category</span>
          )}

          <Controller
            control={control}
            name="name"
            rules={validateMessages.name}
            render={({ field }) => (
              <>
                <Form.Item label="Enter category" className=" w-[100%]">
                  <Input {...field} placeholder="" />
                  <p className="text-[red]">{errors?.name?.message}</p>
                </Form.Item>
              </>
            )}
          />

          <Button
            htmlType="submit"
            style={{ background: "#1D6F2B", color: "white" }}
            className="text-light font-bold w-[100%]"
          >
            {!isupdate
              ? load
                ? "Loading ..."
                : "Add a category"
              : updateloading
              ? "Loading ..."
              : "Update category"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
