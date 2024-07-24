import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createcategory, updatecategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import Alerts from "../../Notifications&Alert/Alert";
import { fetchProductclass } from "../../../Redux/ReduxSlice/ProductClass";

import {
  createProductBrand,
  updateProductBrand,
  deleteProductBrand,
} from "../../../Redux/ReduxSlice/ProductBrand.slice";
export const ProductClassForm = (props) => {
  // State to control alert display
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertIndexonUpdate, setAlertIndexonUpdate] = useState(null);

  const [alertDescription, setAlertDescription] = useState("");
  const [alertDescriptiononUpdate, setAlertDescriptiononUpdate] = useState("");
  const [isupdate, setIsupdate] = useState(false);

  const { productbrand, loading, errorMessage } = useSelector(
    (state) => state.productbrand
  );

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: props.name,
    },
  });
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(createProductBrand({ data: data }))
      .unwrap()
      .then((response) => {
        if (response.status == 201) {
          setAlertIndex("success");
          setAlertDescription(`${"product brand created"}`);
        }
      })
      .catch((er) => {
        setAlertIndex("error");
        setAlertDescription("Error creating product brand: " + er.message);
      });
  };

  // handle submit update
  const onSubmitUpdate = (data) => {
    const categoryId = props.categoryId;
    dispatch(
      updateProductBrand({
        Data: data,
        id: categoryId,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status == 200) {
          setAlertIndexonUpdate("success"); // Display success alert on success
          setAlertDescriptiononUpdate(`${"brand updated"}`);
          // dispatch(fetchCategory(token));
        }
      })
      .catch((er) => {
        setAlertIndexonUpdate("error"); // Display error alert on error
        setAlertDescriptiononUpdate("Error : " + er.message);
      });
  };
  const onErrors = (errors) => {};

  const validateMessages = {
    productclass: {
      required: "Product class is required",
    },
    name: {
      required: "bdand is required!",
    },
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => {
    if (!option || !option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(input.toLowerCase());
  };
  const onSearch = (value) => {};

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
            <span className="text-primary font-bold">Update Product Brand</span>
          ) : (
            <span className="text-primary font-bold">Add Product Brand</span>
          )}

          <Controller
            name="productclass"
            control={control}
            defaultValue=""
            rules={validateMessages.productclass}
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
                : "Create Brand"
              : loading
              ? "Loading ..."
              : "Update Brand"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
