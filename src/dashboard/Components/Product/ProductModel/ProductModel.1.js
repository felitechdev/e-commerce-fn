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
  Space,
  Image,
} from "antd";
import {
  PlusOutlined,
  FileImageOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import ModalFooter from "../../Button/Modelfooter";
import { ProductCatery } from "../../Category/AddCategory/Category";
import { SubCategory } from "../../Category/AddCategory/SubCategory";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../Apis/Product";
import { fetchCompany } from "../../../Apis/Company";
import { fetchCategory, fetchSubCategory } from "../../../Apis/Categories";
import Cookies from "js-cookie";
import { useRef } from "react";
import Alerts from "../../Notifications&Alert/Alert";
import { useUser } from "../../../../context/UserContex";
import UploadWidget from "../../../../components/CLOUDIMAGES/UploadWidget";
import { colorOptions } from "../../../../common/productpossibleColors";
import { normFile } from "./ProductModel";

export const ProductModel = (props) => {
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

  // ahndel ulpad images on frontend
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [otherImageUrls, setOtherImageUrls] = useState([]);
  const [imageError, setImageError] = useState("");
  const [otherimagesError, setOtherimagesError] = useState("");
  const [colorImageUrls, setColorImageUrls] = useState("");
  // const [colorVariations, setColorVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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

  const [colorVariations, setColorVariations] = useState([
    // Initial color variation object
    {
      colorName: null,
      availableSizes: null,
      stock: 0,
      colorImageUrl: null, // URL of the color image
    },
  ]);

  const [index, setIndex] = useState(-1); //index for  color and size variations

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

  let stockQuantity = colorVariations.reduce((acc, variation) => {
    return acc + parseInt(variation.stock);
  }, 0);

  // const handleSubmits = (data) => {
  //   if (!mainImageUrl) {
  //     setImageError("Product main image is required");
  //     return;
  //   }
  //   // Validate otherImageUrls
  //   if (otherImageUrls.length === 0) {
  //     setOtherimagesError("At least one product image is required");
  //     return;
  //   }
  //   setOtherimagesError("");
  //   setImageError("");
  //   // data.availableSizes = Array.isArray(data.availableSizes)
  //   //   ? data.availableSizes
  //   //   : [data.availableSizes];
  //   // setAvailableSizes(data.availableSizes);
  //   // console.log(
  //   //   "datasive",
  //   //   availableSizes,
  //   //   JSON.stringify(data.availableSizes)
  //   // );
  //   const formData = new FormData();
  //   console.log("type", typeof data.name);
  //   formData.append("name", JSON.stringify(data.name)); // Replace 'seller_id' with the actual ID of the seller
  //   if (userRole == "seller") {
  //     formData.append("seller", user.id);
  //   } else {
  //     formData.append("seller", data.seller);
  //   }
  //   formData.append("category", data.category); // Replace 'category_id' with the actual ID of the category
  //   formData.append("subcategory", data.subcategory); // Replace 'subcategory_id' with the actual ID of the subcategory
  //   formData.append("description", JSON.stringify(data.description)); // Replace 'subcategory_id' with the actual ID of the subcategory
  //   // formData.append("otherImages", otherImages);
  //   formData.append("price", Number(data.price));
  //   // formData.append("productThumbnail", data.productThumbnail.file);
  //   // formData.append("productThumbnail", mainImageUrl);
  //   formData.append("brandName", data.brandName);
  //   {
  //     stockQuantity !== 0
  //       ? formData.append("stockQuantity", stockQuantity)
  //       : formData.append("stockQuantity", data.stockQuantity);
  //   }
  //   formData.append("discountPercentage", data.discountPercentage);
  //   formData.append("quantityParameter", data.quantityParameter);
  //   // for (let i = 0; i < otherImages.length; i++) {
  //   //   formData.append("otherImages", otherImages[i]);
  //   // }
  //   // for (let i = 0; i < otherImageUrls.length; i++) {
  //   //   formData.append("otherImages", otherImageUrls[i]);
  //   // }
  //   const colorMeasurementVariations = {
  //     measurementType: "size",
  //     variations: colorVariations.map((variation) => ({
  //       measurementvalue: variation.availableSizes,
  //       colorImg: {
  //         url: variation.colorImageUrl,
  //         // colorName:  variation?.colorName  ,
  //         colorName: "red",
  //       },
  //       colorMeasurementVariationQuantity: parseInt(variation.stock),
  //     })),
  //   };
  //   // hasColors: {
  //   //   type: Boolean,
  //   // },
  //   // hasMeasurements: {
  //   //   type: Boolean,
  //   // },
  //   let hasColors = colorVariations[0].colorImageUrl !== null ? true : false;
  //   let hasMeasurements =
  //     colorVariations[0].availableSizes !== null ? true : false;
  //   formData.append("hasColors", hasColors);
  //   formData.append("hasMeasurements", hasMeasurements);
  //   // Append productImages
  //   const productImages = {
  //     productThumbnail: {
  //       public_id: "Feli Technology Inv. Group/",
  //       url: mainImageUrl,
  //     },
  //     otherImages: otherImageUrls?.map((image) => {
  //       return {
  //         public_id: "Feli Technology Inv. Group/",
  //         url: image,
  //       };
  //     }),
  //   };
  //   formData.append("productImages", JSON.stringify(productImages));
  //   formData.append(
  //     "colorMeasurementVariations",
  //     JSON.stringify(colorMeasurementVariations)
  //     // colorMeasurementVariations
  //   );
  //   // data?.availableSizes?.forEach((size) => {
  //   //   formData.append("availableSizes[]", size);
  //   // });
  //   // for (let i = 0; i < colorImages.length; i++) {
  //   //   formData.append("colorImages", colorImages[i]);
  //   // }
  //   // data?.colorNames?.forEach((size) => {
  //   //   formData.append("colorNames[]", size);
  //   // });
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }
  //   dispatch(createProduct({ productData: formData, token: token }))
  //     .unwrap()
  //     .then((data) => {
  //       if (data && data?.status == "success") {
  //         // update get product state
  //         props.handlecreateproduct(data?.data?.product);
  //         setProducts(data?.data?.product);
  //         setAlertIndex("success");
  //         setAlertDescription(`${"product created successfully"}`);
  //         setTimeout(() => {
  //           handleCancel();
  //         }, 3000);
  //       }
  //     })
  //     .catch((er) => {
  //       setAlertIndex("error"); // Display error alert on error
  //       setAlertDescription("Error: " + er.message);
  //       console.log("error while creating product on product model", er);
  //     });
  // };
  const handleSubmits = (data) => {
    if (!mainImageUrl) {
      setImageError("Product main image is required");
      return;
    }

    // Validate otherImageUrls
    if (otherImageUrls.length === 0) {
      setOtherimagesError("At least one product image is required");
      return;
    }

    setOtherimagesError("");
    setImageError("");

    // Convert stockQuantity to a number if it's not already
    const stockQty =
      stockQuantity !== 0 ? stockQuantity : parseInt(data.stockQuantity);

    const payload = {
      name: data.name,
      seller: userRole === "seller" ? user.id : data.seller,
      category: data.category,
      subcategory: data.subcategory,
      description: data.description,
      price: Number(data.price),
      brandName: data.brandName,
      stockQuantity: stockQty,
      discountPercentage: data.discountPercentage,
      quantityParameter: data.quantityParameter,
      hasColors: colorVariations[0].colorImageUrl !== null ? true : false,
      hasMeasurements:
        colorVariations[0].availableSizes !== null ? true : false,
      productImages: {
        productThumbnail: {
          public_id: "Feli Technology Inv. Group/",
          url: mainImageUrl,
        },
        otherImages: otherImageUrls?.map((image) => ({
          public_id: "Feli Technology Inv. Group/",
          url: image,
        })),
      },
      colorMeasurementVariations: {
        measurementType: "size",
        variations: colorVariations.map((variation) => ({
          measurementvalue: variation.availableSizes,
          colorImg: {
            url: variation.colorImageUrl,
            colorName: variation?.colorName, // or variation?.colorName if needed
          },
          colorMeasurementVariationQuantity: parseInt(variation.stock),
        })),
      },
    };

    // Dispatch API call with the payload
    dispatch(createProduct({ productData: payload, token: token }))
      .unwrap()
      .then((data) => {
        if (data && data?.status == "success") {
          // update get product state
          props.handlecreateproduct(data?.data?.product);
          setProducts(data?.data?.product);
          setAlertIndex("success");
          setAlertDescription("Product created successfully");
          setTimeout(() => {
            handleCancel();
          }, 3000);
        }
      })
      .catch((er) => {
        setAlertIndex("error"); // Display error alert on error
        setAlertDescription("Error: " + er.message);
        console.log("Error while creating product:", er);
      });
  };
  // close alert window
  const handleAlertClose = () => {
    setAlertIndex(null);
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
        value: 1e-10,
        message: "price must be greater than zero",
      },
      validate: {
        isNumber: (value) => !isNaN(value) || "price must be a number",
      },
    },
    // stockQuantity : {
    //    required: "Quantity is required",
    //   min: {
    //     value: 0.0000000001,
    //     message: "Quantity must be greater than 0",
    //   },
    //   validate: {
    //     isNumber: (value) => !isNaN(value) || "Quantity must be a number",
    //   },
    // },
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
        value: 0,
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

  function handleOnUpload(error, result, widget) {
    if (error) {
      setImageError(error);
      widget.close({ quiet: true });
      return;
    }
    // Assuming the main product image URL is stored in the secure_url property of the result object
    setMainImageUrl(result?.info?.secure_url);
    setImageError("");
  }

  // function handleuploadcolorimage(
  //   error,
  //   result,
  //   widget,
  //   colorName,
  //   availableSizes,
  //   stock
  // ) {
  //   if (error) {
  //     console.log("error  while uploadnif", error);
  //     setImageError(error);
  //     widget.close({ quiet: true });
  //     return;
  //   }
  //   console.log(
  //     "data to send on create color images",
  //     widget,
  //     colorName,
  //     availableSizes,
  //     stock
  //   );
  //   setColorVariations((prevVariations) => [
  //     ...prevVariations,
  //     {
  //       measurementvalue: availableSizes,
  //       colorImg: {
  //         url: result?.info?.secure_url,
  //         colorName: colorName,
  //       },
  //       colorMeasurementVariationQuantity: stock,
  //     },
  //   ]);
  // }
  // const handleColorChange = (index, field, value) => {
  //   console.log("index", index, field, value);
  //   setColorVariations((prevVariations) =>
  //     prevVariations.map((variation, i) =>
  //       i === index ? { ...variation, [field]: value } : variation
  //     )
  //   );
  // };
  // const handleColorChange = (index, field, value) => {
  //   console.log("index", index, field, value);
  //   setColorVariations((prevVariations) => {
  //     return prevVariations.map((variation, i) => {
  //       if (i === index) {
  //         return { ...variation, [field]: value };
  //       } else {
  //         return variation;
  //       }
  //     });
  //   });
  // };
  const handleColorChange = (index, field, value) => {
    console.log("index", index, field, value);
    setColorVariations((prevVariations) => {
      // Deep copy the array using slice()
      const updatedVariations = [...prevVariations.slice(0)];

      // Update the specific object at the given index
      updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: value,
      };

      return updatedVariations;
    });
  };
  // function handleuploadcolorimage(error, result, widget) {
  //   if (error) {
  //     console.log("error  while uploadnif", error);
  //     // setImageError(error);
  //     widget.close({ quiet: true });
  //     return;
  //   }
  //   console.log("result", result?.info?.secure_url);
  //   {
  //     /* Input for color image URL */
  //   }
  //   handleColorChange(index, "colorImageUrl", result?.info?.secure_url);
  //   setColorImageUrls(result?.info?.secure_url);
  // }
  function handleonuploadOtherImages(error, result, widget) {
    if (error) {
      console.log("error  while uploadnif", error);
      setImageError(error);
      widget.close({ quiet: true });
      return;
    }
    console.log("resulthandleonuploadOtherImages", result?.info?.secure_url);
    // Limit the number of images to 6
    // if (otherImageUrls.length < 6) {
    //   setOtherImageUrls([...otherImageUrls, result?.info?.secure_url]);
    // }
    setOtherImageUrls((prevUrls) => [...prevUrls, result?.info?.secure_url]);
  }

  console.log("colorVariations ", colorVariations, "index", index);
  return (
    <>
      <Button onClick={showModal}>Add a product</Button>

      {/* open addnew category model */}
      {userRole == "admin" && addnew && (
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
      {userRole == "admin" && addnewsub && (
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
                {userRole == "admin" && (
                  <button
                    onClick={handleOpenNewModel}
                    className="absolute right-5 font-bold  z-50 underline text-primary"
                  >
                    Add New
                  </button>
                )}

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
                {userRole == "admin" && (
                  <button
                    type="button"
                    onClick={handleOpenNewSubModel}
                    className="absolute right-5 font-bold z-50 underline text-primary"
                  >
                    Add New
                  </button>
                )}

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
          <div className="md:space-x-2  border  border-[black]  my-3 rounded  md:flex justify-between mt-3 p-3 ">
            <div className="w-full md:w-[40%] ">
              <span>Main product image</span>
              <p>Add product main image </p>
              <div className="flex flex-col justify-center items-center border rounded ">
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

                    <UploadWidget onUpload={handleOnUpload}>
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

                    {!mainImageUrl && (
                      <p className="text-[red]">{imageError}</p>
                    )}
                  </Form.Item>

                  <div className=" relative ">
                    {mainImageUrl && (
                      <>
                        <Image width={70} height={70} src={mainImageUrl} />
                        <MinusCircleOutlined
                          className="text-[red] text-xl absolute -top-3 font-bold -right-2"
                          onClick={() => {
                            setMainImageUrl("");
                          }}
                        />
                      </>
                    )}
                  </div>
                </>
              </div>
            </div>

            <div className=" w-full md:w-[65%] ">
              <span>Main product images</span>
              <p>Add product images </p>
              <div className="flex  flex-col justify-center items-center border rounded ">
                <Form.Item
                  label=""
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className=" text-center mt-2   "
                >
                  <span className=" py-10 ">
                    Click to upload. maximum of 6 images
                  </span>

                  <br />

                  <UploadWidget
                    onUpload={handleonuploadOtherImages}
                    uploadmultiple={true}
                  >
                    {({ open }) => (
                      <Button
                        className=""
                        icon={<FileImageOutlined />}
                        onClick={open}
                      >
                        {/* <button className="" onClick={open}>
                          Upload
                        </button>{" "} */}
                        Upload
                      </Button>
                    )}
                  </UploadWidget>

                  {otherImageUrls.length == 0 && (
                    <p className="text-[red]">{otherimagesError}</p>
                  )}
                </Form.Item>
                <div className="flex justify-center border space-x-4">
                  {otherImageUrls.slice(0, 6).map((url, index) => {
                    return (
                      <div className=" relative" key={index}>
                        <Image
                          key={index}
                          width={70}
                          height={70}
                          src={url}
                          alt="otherimages"
                        />
                        <MinusCircleOutlined
                          className="text-[red] text-xl absolute -top-3 font-bold -right-2"
                          onClick={() => {
                            setOtherImageUrls(
                              otherImageUrls.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <span className="mt-2 font-bold ">
            Add Colors images here or Available Sizes
          </span>
          <div className="w-[100%] border  border-[black] my-3 p-3 rounded ">
            <span>
              Add a color or zize with it’s corresponding size and stockQuantity
            </span>
            <p>image </p>
            <div className="flex  w-[100%] p-5 flex-col justify-center items-center border    rounded ">
              <Form.List name="colors" className="bg-black">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <>
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 2 }}
                          align="baseline"
                        >
                          {/* Input for color name */}
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            label={
                              <div
                                style={{ backgroundColor: selectedColor }}
                                className={` w-20 h-5 border border-[black] rounded-full`}
                              ></div>
                            }
                          >
                            <div className="flex-col">
                              {/* <div
                              style={{ backgroundColor: selectedColor }}
                              className={`w-5 h-5 border border-[black] rounded-full`}
                            ></div> */}

                              <Select
                                options={colorOptions}
                                onChange={(value) => {
                                  setSelectedColor(value);
                                  handleColorChange(index, "colorName", value);
                                }}
                                onSearch={onSearch}
                                showSearch
                              />
                            </div>
                          </Form.Item>
                          {/* Input for available sizes */}
                          <Form.Item
                            {...restField}
                            name={[name, "availableSizes"]}
                            label="Available Sizes"
                          >
                            <Select
                              options={colorOptions}
                              onChange={(value) => {
                                setSelectedSize(value);
                                handleColorChange(
                                  index,
                                  "availableSizes",
                                  e.target.value
                                );
                              }}
                              onSearch={onSearch}
                              showSearch
                            />

                            <Input
                              placeholder="Enter Available Sizes"
                              onChange={(e) =>
                                handleColorChange(
                                  index,
                                  "availableSizes",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Item>
                          {/* Input for number available in stock */}
                          <Form.Item
                            {...restField}
                            name={[name, "stock"]}
                            label="Available Stock"
                          >
                            <Input
                              placeholder="Enter Available Stock"
                              type="number"
                              onChange={(e) =>
                                handleColorChange(
                                  index,
                                  "stock",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Item>
                          <div className="flex flex-col">
                            {" "}
                            <Form.Item>
                              <UploadWidget
                                // onUpload={handleuploadcolorimage}
                                onUpload={(error, result, widget) => {
                                  if (error) {
                                    console.log(
                                      "error  while uploadnif",
                                      error
                                    );
                                    // setImageError(error);
                                    widget.close({ quiet: true });
                                    return;
                                  }
                                  console.log(
                                    "result",
                                    result?.info?.secure_url
                                  );

                                  {
                                    /* Input for color image URL */
                                  }
                                  handleColorChange(
                                    index,
                                    "colorImageUrl",
                                    result?.info?.secure_url
                                  );
                                  // setColorImageUrls(
                                  //   result?.info?.secure_url
                                  // );
                                }}
                                uploadmultiple={false}
                              >
                                {({ open }) => (
                                  <Button
                                    type="primary"
                                    onClick={open}
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    Add Image
                                  </Button>
                                )}
                              </UploadWidget>
                            </Form.Item>
                            {colorVariations[index]?.colorImageUrl && (
                              <Image
                                src={colorVariations[index]?.colorImageUrl}
                                width={50}
                                height={50}
                              />
                            )}
                          </div>

                          {/* Button to remove color entry */}
                          <MinusCircleOutlined
                            className="text-[red]"
                            onClick={() => {
                              remove(name);
                              setIndex(index - 1);
                              colorVariations.length > 0 &&
                                colorVariations.splice(index, 1);
                            }}
                          />
                        </Space>
                      </>
                    ))}
                    {/* Button to add new color entry */}

                    <Form.Item>
                      <Button
                        type="default"
                        onClick={() => {
                          add();
                          setIndex(index + 1);
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        + fields
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

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
                          <Form.Item {...restField} name={[name, "first"]}>
                            <Controller
                              name={`availableSizes[${name}]`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="number avaieable instock "
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
                          style={{ width: "50px" }}
                          className="p-1 font-bold w-[50px] "
                          type="primary"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        />
                      </Form.Item>
                    </>
                  )}
                </Form.List> */}
          {/* <span className="mt-2 font-bold  ">AvailableSizes</span>
            <div className="w-[100%] border my-3 p-3  border  border-[black] rounded ">
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
                          style={{ width: "50px" }}
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
            </div> */}

          <span className="my-5 font-bold">More info</span>
          <div className="w-[100%] border p-3 mt-3  border  border-[black] rounded">
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
              {/* <Controller
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
            /> */}

              {stockQuantity !== 0 ? (
                <Form.Item label="stockQuantity" className="md:w-[48%]">
                  {/* <Input
            type="text"
            placeholder="stockQuantity"
            name="stockQuantity"
            {...field}
          /> */}

                  <Input
                    type="text"
                    placeholder="stockQuantity"
                    name="stockQuantity"
                    defaultValue={stockQuantity}
                    readOnly
                  />
                  <p className="text-[red]">
                    {/* {errors?.stockQuantity?.message} */}
                  </p>
                </Form.Item>
              ) : (
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
              )}

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
          <ModalFooter onCancel={handleCancel} isload={load} />
          {/* <div className='flex  justify-end space-x-2 pr-0 mt-2'>
           <Button onClick={handleCancel} > <span> <CloseOutlined /> Cancel</span> </Button>
           <Button onClick={handleSubmitForm} style={{background:'#1D6F2B', color:'#FFFFFF',fontWeight:'bold'}} > <span>   <SaveOutlined /> Save</span> </Button>
        </div> */}
        </Form>
      </Modal>
    </>
  );
};
