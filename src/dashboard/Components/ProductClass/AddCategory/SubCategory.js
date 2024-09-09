import { Button, Form, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../Apis/Categories";
import { createsubcategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import Alerts from "../../Notifications&Alert/Alert";

export const SubCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // State to control alert display
  const [alertIndex, setAlertIndex] = useState(null);
  const [alertDescription, setAlertDescription] = useState("");

  const { categories, loadcategory, errcategory } = useSelector(
    (state) => state.category
  );

  const { subcategory, loadsub, errsub } = useSelector(
    (state) => state.createsubcategory
  );
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createsubcategory({ Data: data, token: token }))
      .unwrap()
      .then((response) => {
        if (response.status == 201) {
          setAlertIndex("success"); // Display success alert on success
          setAlertDescription(`${"subcategory created"}`);
          dispatch(fetchCategory(token));
          reset();
        }
      })
      .catch((er) => {
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error : " + er.message);
      });
  };
  const onErrors = (errors) => {};

  const validateMessages = {
    category: {
      required: "category is required",
    },
    name: {
      required: "subcategory is required",
    },
  };

  const categorySelect =
    categorys &&
    categorys?.map((cat) => ({
      value: cat?.id,
      label: cat?.name,
    }));

  // const categorySelect = [
  //   { value: "64fb496b10321d8f5f87cbc6", label: "electronics" },
  //   { value: "6589dd06d1a59382f5499b2d", label: "Women's Jewelry" },
  // ];

  const selectedCategoryObj = categorys.find(
    (cat) => cat._id === selectedCategory
  );

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => {
    if (!option || !option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(input.toLowerCase());
  };
  const onSearch = (value) => {};

  // implement redux
  useEffect(() => {
    if (loadcategory == true) {
      dispatch(fetchCategory(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "sucess") {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {
          setAlertIndex("error");
          setAlertDescription("Error : " + error.message);
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [loadcategory, dispatch, alertDescription, alertIndex]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!categorys.length) {
      dispatch(fetchCategory(token))
        .unwrap()
        .then((data) => {
          if (data?.data && data.status == "sucess") {
            setCategorys(data?.data?.categories);
          }
        })
        .catch((error) => {
          setAlertIndex("error");
          setAlertDescription("Error : " + error.message);
        });
    }
  }, [dispatch, categorys, token]);

  const handleAlertClose = () => {
    setAlertIndex(null); // Reset alertIndex to hide the alert
  };

  return (
    <div>
      {/* <Alerts type={alertIndex} description={alertDescription} /> */}
      {alertIndex !== null && (
        <Alerts
          type={alertIndex}
          description={alertDescription}
          onClose={handleAlertClose}
          className="w-[60%] m-auto"
        />
      )}
      <Form
        layout={"vertical"}
        initialValues={""}
        onValuesChange={""}
        className="mt-10 mb-10"
        onFinish={handleSubmit(onSubmit, onErrors)}
      >
        <div className="w-[60%] border  flex flex-col items-center justify-center rounded m-auto p-5">
          <span className="text-primary font-bold">Add Sub-category</span>

          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={validateMessages.category}
            render={({ field }) => (
              <>
                <Form.Item label="Enter category" className=" w-[100%]">
                  {loadcategory ? (
                    <p>loading...</p>
                  ) : (
                    <Select
                      {...field}
                      showSearch
                      label="Text field"
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={categorySelect}
                      // update the selected category to get subcategories
                      onChange={(value) => {
                        field.onChange(value); // Update the form field value
                        setSelectedCategory(value); // Update the selected category
                      }}
                    />
                  )}

                  <p className="text-[red]">{errors?.category?.message}</p>
                </Form.Item>
              </>
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={validateMessages.name}
            render={({ field }) => (
              <Form.Item label="Enter Sub category" className=" w-[100%]">
                <Input {...field} placeholder="Enter product name" />
                <p className="text-[red]">{errors?.name?.message}</p>
              </Form.Item>
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
            {loadsub ? "Loading ..." : "Add sub-category"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
