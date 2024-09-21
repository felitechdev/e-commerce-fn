import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
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
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertDescription, setAlertDescription] = useState("");
  const [isupdate, setIsupdate] = useState(false);
  const [selectedProductClass, setSelectedProductClass] = useState(null);

  const { productbrand, loading, errorMessage } = useSelector(
    (state) => state.productbrand
  );
  const { loading: productclassLoading, productclass: productclassData } =
    useSelector((state) => state.productclass);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: props.name || "",
      productclass: props.productclass || "",
    },
  });

  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  useEffect(() => {
    if (props.productclass && productclassData.length > 0) {
      const selectedClass = productclassData.find(
        (item) => item.id === props.productclass
      );
      setSelectedProductClass(selectedClass);
    }
  }, [props.productclass, productclassData]);

  const onSubmit = (data) => {
    const action = isupdate ? updateProductBrand : createProductBrand;
    dispatch(createProductBrand({ data }))
      .unwrap()
      .then((response) => {
        if (response.status === (isupdate ? 200 : 201)) {
          setAlertIndex("success");
          reset();
          setAlertDescription(
            `${isupdate ? "Brand updated" : "Product brand created"}`
          );
        }
      })
      .catch((error) => {
        setAlertIndex("error");
        setAlertDescription(
          `Error ${isupdate ? "updating" : "creating"} product brand: ${
            error.message
          }`
        );
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
          reset();
          setAlertIndex("success");
          setAlertDescription("Brand updated");
        }
      })
      .catch((er) => {
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error : " + er.message);
      });
  };

  const onErrors = (errors) => {};

  const handleUpdate = () => {
    setIsupdate(true);
    reset({
      name: props.name,
      productclass: props.productclass,
    });
  };

  useEffect(() => {
    if (props.openUPdate) {
      handleUpdate();
    }
  }, [props.openUPdate]);

  return (
    <div className="">
      {alertIndex !== null && (
        <Alerts
          type={alertIndex}
          description={alertDescription}
          onClose={() => setAlertIndex(null)}
          className="w-[60%] m-auto"
        />
      )}

      <Form
        layout="vertical"
        onFinish={
          !isupdate
            ? handleSubmit(onSubmit, onErrors)
            : handleSubmit(onSubmitUpdate, onErrors)
        }
        className="mt-10 mb-10"
      >
        <div className="w-[60%] border flex flex-col items-center justify-center rounded m-auto p-5">
          <span className="text-primary font-semibold">
            {isupdate ? "Update Product Brand" : "Add Product Brand"}
          </span>

          <Controller
            name="productclass"
            control={control}
            rules={{ required: "Product class is required" }}
            render={({ field }) => (
              <Form.Item label="Select Product Class" className="w-[100%]">
                {productclassLoading ? (
                  <p>Loading...</p>
                ) : (
                  <Select
                    {...field}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={productclassData.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    defaultValue={
                      selectedProductClass ? selectedProductClass.id : ""
                    }
                  />
                )}
                {errors.productclass && (
                  <p className="text-[red]">{errors.productclass.message}</p>
                )}
              </Form.Item>
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{ required: "Brand is required!" }}
            render={({ field }) => (
              <Form.Item label="Enter Product Brand" className="w-[100%]">
                <Input {...field} placeholder="" />
                {errors.name && (
                  <p className="text-[red]">{errors.name.message}</p>
                )}
              </Form.Item>
            )}
          />

          <Button
            htmlType="submit"
            style={{ background: "#1D6F2B", color: "white" }}
            className="text-light font-semibold w-[100%]"
          >
            {loading
              ? "Loading ..."
              : isupdate
              ? "Update Brand"
              : "Create Brand"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
