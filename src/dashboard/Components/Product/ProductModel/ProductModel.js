import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  Space,
} from "antd";
import "../style.css";
import {
  PlusOutlined,
  FileImageOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import ModalFooter from "../../Button/Modelfooter";
import { ProductCatery } from "../../Category/AddCategory/Category";
import { SubCategory } from "../../Category/AddCategory/SubCategory";
// deendencies to implement redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../Apis/Product";
import { Loader } from "../../Loader/LoadingSpin";
import { fetchCompany } from "../../../Apis/Company";
import { fetchCategory, fetchSubCategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import { data } from "autoprefixer";
import { useRef } from "react";
import Item from "antd/lib/list/Item";
import Alerts from "../../Notifications&Alert/Alert";
import { useUser } from "../../../../context/UserContex";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const ProductModel = (props) => {
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [price, setPrice] = useState("");
  // checking state
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // error handling states
  const [errProdCategory, setErrProdCategory] = useState("");
  const [errPrice, setErrPrice] = useState();

  const [alertIndex, setAlertIndex] = useState(null);
  const [alertIndexonUpdate, setAlertIndexonUpdate] = useState(null);

  const [alertDescription, setAlertDescription] = useState("");
  const [alertDescriptiononUpdate, setAlertDescriptiononUpdate] = useState("");
  const [isupdate, setIsupdate] = useState(false);
  const { user, onLogout } = useUser();
  const userRole = user?.role;

  const [addnew, setAddnew] = useState(false);
  const [addnewsub, setAddnewsub] = useState(false);
  const [companys, setCompanys] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [subcategorys, setSubcategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = Cookies.get("token");
  // redux state handling
  const dispatch = useDispatch();
  const { product, load, err } = useSelector((state) => state.createproduct);

  const { company, loadcompany, errcompany } = useSelector(
    (state) => state.getcompany
  );

  const { categories, loadcategory, errcategory } = useSelector(
    (state) => state.category
  );

  const { subcategories, loadsubcategory, errsubcategory } = useSelector(
    (state) => state.subcategory
  );

  const [otherImages, setOtherImages] = React.useState([]);
  const [colorNames, setColorNames] = React.useState([]);
  const [colorImages, setColorImages] = React.useState([]);
  const [availableSizes, setAvailableSizes] = React.useState([]);
  const [products, setProducts] = useState();
  const [error, setError] = React.useState([]);
  const [success, setSuccess] = React.useState([]);
  // use react from hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onBlur",
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log("loading ", load);

  const handleSubmits = (data) => {
    data.availableSizes = Array.isArray(data.availableSizes)
      ? data.availableSizes
      : [data.availableSizes];

    setAvailableSizes(data.availableSizes);
    console.log(
      "datasive",
      availableSizes,
      JSON.stringify(data.availableSizes)
    );

    const formData = new FormData();
    formData.append("name", data.name); // Replace 'seller_id' with the actual ID of the seller

    if (userRole == "seller") {
      formData.append("seller", user.id);
    } else {
      formData.append("seller", data.seller);
    }

    formData.append("category", data.category); // Replace 'category_id' with the actual ID of the category
    formData.append("subcategory", data.subcategory); // Replace 'subcategory_id' with the actual ID of the subcategory
    formData.append("description", data.description); // Replace 'subcategory_id' with the actual ID of the subcategory
    // formData.append("otherImages", otherImages);
    formData.append("price", Number(data.price));
    formData.append("productThumbnail", data.productThumbnail.file);
    formData.append("brandName", data.brandName);
    formData.append("stockQuantity", data.stockQuantity);

    formData.append("discountPercentage", data.discountPercentage);
    formData.append("quantityParameter", data.quantityParameter);

    for (let i = 0; i < otherImages.length; i++) {
      formData.append("otherImages", otherImages[i]);
    }

    data.availableSizes.forEach((size) => {
      formData.append("availableSizes[]", size);
    });

    for (let i = 0; i < colorImages.length; i++) {
      formData.append("colorImages", colorImages[i]);
    }

    data.colorNames.forEach((size) => {
      formData.append("colorNames[]", size);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    dispatch(createProduct({ productData: formData, token: token }))
      .unwrap()
      .then((data) => {
        if (data && data?.status == "success") {
          // update get product state
          props.handlecreateproduct(data?.data?.product);
          setProducts(data?.data?.product);
          setAlertIndex("success");
          setAlertDescription(`${"product created successfully"}`);
          setTimeout(() => {
            handleCancel();
          }, 3000);
        }
      })
      .catch((er) => {
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error: " + er.message);
        console.log("error while creating product on product model", er);
      });
  };
  // close alert window
  const handleAlertClose = () => {
    setAlertIndex(null);
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    const {
      productThumbnail,
      colorImages,
      availableSizes,
      otherImages,
      ...restData
    } = data;

    // Ensure otherImages is an array
    data.otherImages = Array.isArray(data.otherImages.fileList)
      ? data.otherImages.fileList.map((file) => file.originFileObj)
      : [data.otherImages.file?.originFileObj];

    data.colorImages = Array.isArray(data.colorImages.fileList)
      ? data.colorImages.fileList.map((file) => file.originFileObj)
      : [data.colorImages.file?.originFileObj];

    data.availableSizes = Array.isArray(data.availableSizes)
      ? data.availableSizes
      : [data.availableSizes];

    data.productImages = {
      productThumbnail: data.productThumbnail,
      colorImages: data.colorImages,
      otherImages: data.otherImages,
    };

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("seller", data.seller);
    if (userRole == "seller") {
      formData.append("seller", data.seller);
    }
    formData.append("brandName", data.brandName);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("discountPercentage", data.discountPercentage);
    formData.append("quantityParameter", data.quantityParameter);
    formData.append("colorNames", data.colorNames);
    formData.append("availableSizes", data.availableSizes);
    // Append files
    formData.append(
      "productThumbnail",
      data.productThumbnail.fileList[0].originFileObj
    );
    data.colorImages.forEach((file, index) => {
      console.log("color file", file);
      formData.append(`colorImages[${index}]`, file);
    });
    data.otherImages.forEach((file, index) => {
      formData.append(`otherImages[${index}]`, file);
    });

    const newData = {
      ...restData,
      availableSizes: data.availableSizes,

      productThumbnail: data.productThumbnail.fileList[0].originFileObj,
      colorImages: data.colorImages,
      otherImages: data.otherImages,
    };

    console.log("newdata", newData);
    dispatch(createProduct({ productData: newData, token: token }))
      .unwrap()
      .then((s) => {
        console.log("success", s);
      })
      .catch((er) => {
        setError(er.message);
        console.log("error while creating product on product model", er);
      });
  };
  const onErrors = (errors) => console.error(errors);

  const registerinput = {
    name: {
      required: "product name is required",
      minLength: {
        value: 2,
        message: "minimum length should be 2",
      },
    },
    price: {
      required: "price is required",
      min: {
        value: 0.0000000001,
        message: "price must be greater than zero",
      },
      validate: {
        isNumber: (value) => !isNaN(value) || "price must be a number",
      },
    },
    stockQuantity: {
      required: "Quantity is required",
      min: {
        value: 0.0000000001,
        message: "Quantity must be greater than 0",
      },
      validate: {
        isNumber: (value) => !isNaN(value) || "Quantity must be a number",
      },
    },
    description: {
      required: "description is required",
      minLength: {
        value: 6,
        message: "minimum length should be 6",
      },
    },
    seller: {
      required: "seller is required",
    },
    discountPercentage: {
      required: "discountPercentage is required",
      min: {
        value: 0.0000000001,
        message: "discountPercentage must be greater than 0",
      },
      validate: {
        isNumber: (value) =>
          !isNaN(value) || "discountPercentage must be a number",
      },
    },
    quantityParameter: {
      required: "quantityParameter is required",
    },
    brandName: {
      validate: (value) =>
        typeof value === "string" || "brandName must be a string",
    },
    category: {
      required: "category is required",
    },
    subcategory: {
      required: "subcategory is required",
    },
  };

  // console.log("product", product, load, err);

  // handle add new category
  const handleOpenNewModel = () => {
    setAddnew(true);
    // setIsModalOpen(false);
  };
  const handleOpenNewSubModel = () => {
    setAddnewsub(true);
  };
  // cancel on addnew model
  const handleCancelOnAddNew = () => {
    setAddnew(false);
    setAddnewsub(false);
  };

  // Function to handle the api actions and prerequisites
  const handleProductUpload = async (e) => {
    e.preventDefault();

    // product data processing
    setLoading(true);
    let productData = {
      description: description,
      prodName: prodName,
      prodCategory: prodCategory,
      price: price,
    };

    axios({
      url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/product/upload`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: productData,
    })
      .then((result) => console.log(result.data))
      .catch((error) => console.log("product upload error : ", error));
  };

  const showModal = () => {
    setIsModalOpen(true);
    setAddnew(false);
  };

  const handleOk = () => {
    handleSubmitForm();
    setIsModalOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // handle Submit function
  const handleSubmitForm = () => {
    handleProductUpload();
    setChecked(!checked);
    setIsModalOpen(false);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => {
    if (!option || !option.label) {
      return false;
    }
    return option.label.toLowerCase().includes(input.toLowerCase());
  };

  const fileList = [];

  const selectOptions =
    companys &&
    companys?.map((comp) => ({
      value: comp?.user?.id,
      label: comp?.user?.firstName,
    }));

  console.log("selectoption", selectOptions);

  const categorySelect =
    categorys &&
    categorys?.map((cat) => ({
      value: cat?.id,
      label: cat?.name,
    }));

  const selectedCategoryObj = categorys.find(
    (cat) => cat.id === selectedCategory
  );

  let subcategory;

  if (selectedCategoryObj?.subCategories) {
    subcategory =
      selectedCategoryObj &&
      selectedCategoryObj?.subCategories &&
      selectedCategoryObj?.subCategories.map((subcat) => ({
        value: subcat.id,
        label: subcat.name,
      }));
  }

  function beforeUpload(file) {
    const newImgs = [...otherImages, file];
    setOtherImages(newImgs);
    return false;
  }
  function uploadColorImage(file) {
    console.log("file upload on color images", file);
    const newImgs = [...colorImages, file];
    setColorImages(newImgs);
    return false;
  }
  function handlebeforeThumbnail(file) {
    return false;
  }

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
          console.log("error on sub category page", error);
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [loadcategory, dispatch]);
  useEffect(() => {
    if (loadsubcategory == true) {
      dispatch(fetchSubCategory(token))
        .unwrap()
        .then((data) => {
          if (data.data && data.status == "success")
            setSubcategorys(data?.data?.subCategories);
        })
        .catch((error) => {
          console.log("error on sub cate", error);
        });
    }
  }, [loadsubcategory, dispatch]);

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
        .catch((error) => {});
    }
    if (!subcategorys.length) {
      dispatch(fetchSubCategory(token))
        .unwrap()
        .then((data) => {
          if (data.data && data.status == "success")
            setSubcategorys(data?.data?.subCategories);
        })
        .catch((error) => {});
    }
  }, [dispatch, categorys, subcategorys, token]);

  // implement redux
  useEffect(() => {
    if (loadcompany == true) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [loadcompany, dispatch]);

  // Fetch products only when the component mounts
  useEffect(() => {
    if (!companys.length) {
      dispatch(fetchCompany(token))
        .unwrap()
        .then((data) => {
          if (data?.data?.sellers) setCompanys(data?.data?.sellers);
        })
        .catch((error) => {
          // if (error.response && error.response.status === 401) {
          //   navigate("/");
          // }
        });
    }
  }, [dispatch, companys, token]);

  return (
    <>
      <Button onClick={showModal}>Add a product</Button>

      {/* open addnew category model */}
      {addnew && (
        <Modal
          title="Add new Category"
          width="50rem"
          open={isModalOpen}
          closeIcon={
            <CloseOutlined
              onClick={handleCancelOnAddNew}
              className="text-[red]"
            />
          }
        >
          <ProductCatery />
        </Modal>
      )}
      {/* open addnewsub category model */}
      {addnewsub && (
        <Modal
          title="Add new Category"
          width="50rem"
          open={isModalOpen}
          closeIcon={
            <CloseOutlined
              onClick={handleCancelOnAddNew}
              className="text-[red]"
            />
          }
        >
          <SubCategory />
        </Modal>
      )}
      <Modal
        title="Add product"
        width="80rem"
        open={isModalOpen}
        closeIcon={
          <CloseOutlined onClick={handleCancel} className="text-[red]" />
        }
      >
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
          onFinish={handleSubmit(handleSubmits, onErrors)}
        >
          <div
            className={` space-x-0 md:space-x-6   md:flex  ${
              alertIndex !== null ? " mt-5 " : ""
            } `}
          >
            <Col
              span={24}
              md={12}
              className={` mb-3 border border-[black] p-3 
                
               `}
            >
              <Controller
                name="name"
                control={control}
                rules={registerinput.name}
                render={({ field }) => (
                  <Form.Item label="Product name">
                    <Input {...field} placeholder="Enter product name" />
                    <p className="text-[red]">{errors?.name?.message}</p>
                  </Form.Item>
                )}
              />

              <Controller
                control={control}
                rules={registerinput.description}
                name="description"
                render={({ field }) => (
                  <>
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onReady={(editor) => {
                        // console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        // console.log("Editor is ready to use!", editor);
                        const data = editor.getData();
                        field.onChange(data); // Update the form field value
                      }}
                    />
                    <p className="text-[red]">
                      {errors?.description && errors.description.message}
                    </p>
                  </>
                )}
              />
            </Col>
            <Col
              span={24}
              md={11}
              className="border mb-3 border-[black] py-10 px-5 "
            >
              <div className="">
                <button
                  onClick={handleOpenNewModel}
                  className="absolute right-5 font-bold  z-50 underline text-primary"
                >
                  Add New
                </button>

                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={registerinput.category}
                  render={({ field }) => (
                    <>
                      <Form.Item label="Select product Category">
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

                        <p className="text-[red]">
                          {errors?.category?.message}
                        </p>
                      </Form.Item>
                    </>
                  )}
                />
              </div>

              <div className="">
                <button
                  type="button"
                  onClick={handleOpenNewSubModel}
                  className="absolute right-5 font-bold z-50 underline text-primary"
                >
                  Add New
                </button>

                <Controller
                  name="subcategory"
                  control={control}
                  defaultValue=""
                  rules={registerinput.subcategory}
                  render={({ field }) => (
                    <>
                      <Form.Item
                        label="Select product sub-category"
                        className=""
                      >
                        {loadcategory ? (
                          <p>loading...</p>
                        ) : (
                          <Select
                            {...field}
                            showSearch
                            label="Text field"
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={subcategory?.length != 0 && subcategory}
                          />
                        )}

                        <p className="text-[red]">
                          {errors?.subcategory?.message}
                        </p>
                      </Form.Item>
                    </>
                  )}
                />
              </div>
            </Col>
          </div>
          <span className=" font-bold">Add Images</span>
          <div className="md:space-x-2 border  my-3 rounded  md:flex justify-between mt-3 p-3 ">
            <div className="w-full md:w-[40%] ">
              <span>Main product image</span>
              <p>Add product main image </p>
              <div className="flex flex-col justify-center items-center border rounded ">
                {/* <input
                  type="file"
                  {...register("productThumbnail", { required: true })}
                  placeholder="File"
                /> */}

                <Controller
                  name="productThumbnail"
                  control={control}
                  rules={{
                    required: "product main image is required",
                    max: {
                      value: 1,
                      message: "only one image is allowed",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Form.Item
                        label=""
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className=" text-center mt-2 "
                      >
                        <span className="">
                          Drop a main image here or click to upload.
                        </span>
                        <Upload
                          // beforeUpload={beforeUpload}
                          beforeUpload={handlebeforeThumbnail}
                          listType="picture"
                          maxCount={1}
                          name={field.name}
                          {...field}
                        >
                          <Button
                            className="bg-[red]"
                            icon={<FileImageOutlined />}
                          >
                            Upload
                          </Button>
                        </Upload>
                        <p className="text-[red]">
                          {errors?.productThumbnail?.message}
                        </p>
                      </Form.Item>
                    </>
                  )}
                />
              </div>
            </div>

            <div className=" w-full md:w-[65%] ">
              <span>Main product images</span>
              <p>Add product images </p>
              <div className="flex  flex-col justify-center items-center border rounded ">
                <Controller
                  name="otherImages"
                  control={control}
                  rules={{
                    required: "product productsimages is required",
                    max: {
                      value: 6,
                      message: "only one image is allowed",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      label=""
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      className=" text-center mt-2   "
                    >
                      <span className=" py-10 ">
                        Drop maximum of 6 images here or click to upload.
                      </span>
                      <br />
                      <Upload
                        beforeUpload={beforeUpload}
                        // listType="picture-card"
                        listType="picture"
                        maxCount={6}
                        {...field}
                        name={field.name}
                      >
                        <Button className="" icon={<FileImageOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                      <p className="text-[red]">
                        {errors?.otherImages?.message}
                      </p>
                    </Form.Item>
                  )}
                />
              </div>
            </div>
          </div>
          <span className="mt-2 font-bold ">Add Colors</span>
          <div className="w-[100%] border my-3 p-3 rounded ">
            <span>Add a color with it’s corresponding</span>
            <p>image </p>
            <div className="flex  w-[100%] p-5 flex-col justify-center items-center border  rounded ">
              {/* <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 2,
                        }}
                        align="baseline"
                      >
                        <Form.Item {...restField} name={[name, "first"]}>
                          <Input
                            placeholder="Enter Image Name"
                            name="colorNames"
                          />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, "last"]}>
                          <Upload
                            action="/upload.do"
                            listType="picture"
                            maxCount={7}
                            name="colorImages"
                          >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>
                        </Form.Item>
                        <MinusCircleOutlined
                          className="text-[red]"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        className="p-1 font-bold"
                        type="primary"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      />
                    </Form.Item>
                  </>
                )}
              </Form.List> */}

              {/* <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 2,
                        }}
                        align="baseline"
                      >
                        <Form.Item {...restField} name={[name, "first"]}>
                          <Controller
                            name="colorNames"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter Image Name"
                                name={field.name}
                              />
                            )}
                          />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, "last"]}>
                          <Controller
                            name="colorImages"
                            control={control}
                            render={({ field }) => (
                              <Upload
                                listType="picture"
                                beforeUpload={uploadColorImage}
                                maxCount={7}
                                name={field.name}
                                {...field}
                              >
                                <Button icon={<UploadOutlined />}>
                                  Upload
                                </Button>
                              </Upload>
                            )}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="text-[red]"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        className="p-1 font-bold"
                        type="primary"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      />
                    </Form.Item>
                  </>
                )}
              </Form.List> */}

              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 2,
                        }}
                        align="baseline"
                      >
                        <Form.Item {...restField} name={[name, "first"]}>
                          <Controller
                            name={`colorNames[${name}]`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter Image Name"
                                name={field.name}
                              />
                            )}
                          />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, "last"]}>
                          <Controller
                            name={`colorImages[${name}]`}
                            control={control}
                            render={({ field }) => (
                              <Upload
                                listType="picture"
                                beforeUpload={uploadColorImage}
                                maxCount={7}
                                name={field.name}
                                {...field}
                              >
                                <Button icon={<UploadOutlined />}>
                                  Upload
                                </Button>
                              </Upload>
                            )}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="text-[red]"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        className="p-1 font-bold"
                        type="primary"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <span className="mt-2 font-bold ">AvailableSizes</span>
          <div className="w-[100%] border my-3 p-3 rounded ">
            <span>Product availableSizes</span>
            <div className="flex  w-[100%] p-5 flex-col justify-center items-center border  rounded ">
              <Form.List name="user">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 2,
                        }}
                        align="baseline"
                      >
                        <Form.Item {...restField} name={[name, "first"]}>
                          <Controller
                            name={`availableSizes[${name}]`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter AvailableSizes"
                                name={field.name}
                              />
                            )}
                          />
                        </Form.Item>

                        <MinusCircleOutlined
                          className="text-[red]"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        className="p-1 font-bold"
                        type="primary"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          <span className="my-5 font-bold">More info</span>
          <div className="w-[100%] border p-3 mt-3  rounded">
            <div className="flex justify-between space-x-2 w-[100%]">
              {userRole == "seller" ? (
                <div className=" flex justify-center items-center ">{`Seller : ${user?.firstName}`}</div>
              ) : (
                <Controller
                  name="seller"
                  control={control}
                  defaultValue=""
                  rules={registerinput.seller}
                  render={({ field }) => (
                    <>
                      <Form.Item label="Select Seller" className=" w-[50%]">
                        {/* <Select
                        options={selectOptions}
                        {...field}
                        label="Text field"
                      /> */}
                        {loadcompany ? (
                          <p>loading...</p>
                        ) : (
                          <Select
                            {...field}
                            showSearch
                            label="Text field"
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={selectOptions}
                            // options={[
                            //   {
                            //     label: "Feli Technology Inv. Group",
                            //     value: "64fb3d689851a4c86d6182de",
                            //   },
                            //   {
                            //     value: "659310aa742a59c3314ef268",
                            //     label: "Oliviertech",
                            //   },
                            // ]}
                          />
                        )}

                        <p className="text-[red]">{errors?.seller?.message}</p>
                      </Form.Item>
                    </>
                  )}
                />
              )}

              <Controller
                name="brandName"
                control={control}
                rules={{
                  ...registerinput.brandName,
                }}
                render={({ field }) => (
                  <Form.Item label=" Brand name" className=" w-[45%]">
                    <Input
                      type="text"
                      name="brandName"
                      {...field}
                      placeholder="Enter Brand Name"
                    />
                    <p className="text-[red]">{errors?.brandName?.message}</p>
                  </Form.Item>
                )}
              />
            </div>

            <div className="grid grid-cols-2  md:flex justify-between  md:space-x-4">
              <Controller
                name="stockQuantity"
                control={control}
                rules={{
                  ...registerinput.stockQuantity,
                }}
                render={({ field }) => (
                  <Form.Item label="stockQuantity" className="md:w-[48%]">
                    <Input
                      type="text"
                      placeholder="stockQuantity"
                      name="stockQuantity"
                      {...field}
                    />
                    <p className="text-[red]">
                      {errors?.stockQuantity?.message}
                    </p>
                  </Form.Item>
                )}
              />

              <Controller
                name="price"
                control={control}
                rules={{
                  ...registerinput.price,
                }}
                render={({ field }) => (
                  <Form.Item label="Price" className="md:w-[48%]">
                    <InputNumber
                      className="w-full"
                      addonBefore="Rwf"
                      placeholder="amount"
                      name="price"
                      {...field}
                    />
                    <p className="text-[red]">{errors?.price?.message}</p>
                  </Form.Item>
                )}
              />

              <Controller
                name="discountPercentage"
                control={control}
                rules={{
                  ...registerinput.discountPercentage,
                }}
                render={({ field }) => (
                  <Form.Item label="Discount" className="md:w-[48%]">
                    <InputNumber
                      className="w-full"
                      addonBefore="%"
                      placeholder="discountPercentage"
                      name="discountPercentage"
                      {...field}
                    />
                    <p className="text-[red]">
                      {errors?.discountPercentage?.message}
                    </p>
                  </Form.Item>
                )}
              />

              <Controller
                name="quantityParameter"
                control={control}
                rules={{
                  ...registerinput.quantityParameter,
                }}
                render={({ field }) => (
                  <Form.Item label="Quantity parameter" className="md:w-[48%]">
                    <Input
                      type="text"
                      placeholder="Enter quantityParameter"
                      name="quantityParameter"
                      {...field}
                    />

                    <p className="text-[red]">
                      {errors?.quantityParameter?.message}
                    </p>
                  </Form.Item>
                )}
              />
            </div>
          </div>
          <ModalFooter
            onCancel={handleCancel}
            isload={load}
            // onOk={handleSubmitForm}
          />
          {/* <div className='flex  justify-end space-x-2 pr-0 mt-2'>
         <Button onClick={handleCancel} > <span> <CloseOutlined /> Cancel</span> </Button>
         <Button onClick={handleSubmitForm} style={{background:'#1D6F2B', color:'#FFFFFF',fontWeight:'bold'}} > <span>   <SaveOutlined /> Save</span> </Button>
      </div> */}
        </Form>
      </Modal>
    </>
  );
};

export default ProductModel;
