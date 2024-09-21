import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createcategory, updatecategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import Alerts from "../../Notifications&Alert/Alert";
import { fetchCategory } from "../../../Apis/Categories";
import { fetchProductclass } from "../../../Redux/ReduxSlice/ProductClass";

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
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: props.openUPdate ? props.categoryId : "",
  });
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createcategory({ Data: data, token: token }))
      .unwrap()
      .then((response) => {
        if (response.status == 201) {
          setAlertIndex("success"); // Display success alert on success
          setAlertDescription(`${"category created"}`);
          reset();
          dispatch(fetchCategory());
        }
        // refetch categories
        dispatch(fetchCategory(token));
      })
      .catch((er) => {
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error creating category: " + er.message);
      });
  };

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  // handle submit update
  const onSubmitUpdate = (data) => {
    const categoryId = props.categoryId.id;
    dispatch(
      updatecategory({
        Data: data,
        id: categoryId,
        token: token,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status == 200) {
          setAlertIndexonUpdate("success"); // Display success alert on success
          setAlertDescriptiononUpdate(`${"category updated"}`);
          reset();
          // dispatch(fetchCategory(token));
        }
      })
      .catch((er) => {
        setAlertIndexonUpdate("error"); // Display error alert on error
        setAlertDescriptiononUpdate("Error : " + er.message);
      });
  };
  const onErrors = (errors) => {};

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => {
    if (!option || !option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(input.toLowerCase());
  };
  const onSearch = (value) => {};

  const validateMessages = !props.openUPdate && {
    productClass: {
      required: "Product class is required",
    },
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
            <span className="text-primary font-semibold">Update Category</span>
          ) : (
            <span className="text-primary font-semibold">Add Category</span>
          )}

          {!isupdate && (
            <Controller
              name="productClass"
              control={control}
              defaultValue=""
              rules={validateMessages.productClass}
              render={({ field }) => (
                <>
                  <Form.Item label="select product class" className=" w-[100%]">
                    {productclassLoading ? (
                      <p>loading...</p>
                    ) : (
                      <Select
                        {...field}
                        showSearch
                        label="Text field"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={productclassData.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    )}

                    <p className="text-[red]">{errors?.category?.message}</p>
                  </Form.Item>
                </>
              )}
            />
          )}
          <Controller
            control={control}
            name="name"
            rules={validateMessages.name}
            defaultValue={props.openUPdate ? props.categoryId.name : ""}
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
            style={{
              background: "#1D6F2B",
              color: "white",
            }}
            className="text-light font-semibold w-[100%]"
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
