import { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Modal,
  Upload,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../../APIs/Product";

import Cookies, { set } from "js-cookie";
import {
  ExclamationCircleFilled,
  PlusOutlined,
  DeleteFilled,
  EyeFilled,
  EditFilled,
  CloseOutlined,
} from "@ant-design/icons";
import { Loader } from "../../Loader/LoadingSpin";
import { useUser } from "../../../../context/UserContex";
import { deleteproduct } from "../../../Apis/Product";
import UpdateProductModel from "../ProductModel/updateproductModel";

const { confirm } = Modal;

const UpdateModel = ({ setModel }) => {
  const [isModalOpen, setIsModalOpen] = useState(setModel);
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create company"
        width="50rem"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            label=""
            name="fileList"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Company Name" name="companyName">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item label="Phone number" name="phoneNumber">
            <Input placeholder="+250 788 284 364" />
          </Form.Item>
          <Form.Item label="Joined date" name="joinedDate">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export const SingleproductModel = (props) => {
  const [DBProductInfo, setDBProductInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user, onLogout } = useUser();
  const [id, setId] = useState(null);
  const { loading, users } = useSelector((state) => state.users);

  // Fetch Product
  useEffect(() => {
    async function getProduct() {
      try {
        const DBProductInfo = await fetchProduct(props.Id);
        setDBProductInfo(DBProductInfo);
      } catch (error) {
        // setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [props.Id]);

  const seller =
    user?.role == "seller"
      ? user?.firstName
      : !loading &&
        users?.find((user) => user?._id === DBProductInfo?.seller?._id)
          ?.firstName;

  return (
    <Modal
      title="Product"
      width="50rem"
      open={props.isModalOpen}
      closeIcon={
        <CloseOutlined
          onClick={props.handleCancelUppdate}
          className="text-[red]"
        />
      }
    >
      <>
        {isLoading ? (
          <Loader />
        ) : DBProductInfo != null && Object.keys(DBProductInfo)?.length > 0 ? (
          <div className="p-4 w-full overflow-auto  ">
            <h1 className="text-xl font-semibold">
              {DBProductInfo ? DBProductInfo?.name : ""}
            </h1>
            <p className="text-gray-500">
              <span className="text-black"> Category:</span>{" "}
              {DBProductInfo ? DBProductInfo?.category?.name : ""}
            </p>
            <p className="text-gray-500">
              <span className="text-black"> Price: </span>{" "}
              {DBProductInfo ? DBProductInfo?.price : ""}{" "}
              {DBProductInfo ? DBProductInfo?.currency : ""}
            </p>
            <p className="text-gray-500">
              <span className="text-black"> Description: </span>
              <div
                className="w-full overflow-auto  "
                dangerouslySetInnerHTML={{
                  __html: DBProductInfo ? DBProductInfo.description : "",
                }}
              />
            </p>
            <p className="text-gray-500">
              {/* Available Sizes: {DBProductInfo.availableSizes.join(", ")} */}
            </p>
            <p className="text-gray-500">
              <span className="text-black"> Stock Quantity: </span>{" "}
              {DBProductInfo ? DBProductInfo.stockQuantity : ""}
            </p>
            <div>
              <h2 className="text-lg font-semibold">Seller Information</h2>
              <p className="text-gray-500">
                <span className="text-black">Name: </span> {seller && seller}
              </p>
              <p className="text-gray-500">
                <span className="text-black">Email: </span>{" "}
                {DBProductInfo ? DBProductInfo?.seller?.email : ""}
              </p>
            </div>

            {/* Product Thumbnail */}
            <div className="flex justify-center mt-4">
              <Image
                src={DBProductInfo.productImages.productThumbnail.url}
                alt="Product thumbnail"
                width={200}
                className="border-1 border-black rounded-md"
              />
            </div>

            <div className="flex flex-wrap justify-around ">
              {/* Color Images */}
              {DBProductInfo?.colorMeasurementVariations?.variations?.map(
                (image, index) =>
                  (image.colorImg.url || image.measurementvalue) && (
                    <div key={index} className="m-2">
                      {image?.colorImg?.colorName && (
                        <Image
                          src={image?.colorImg?.url}
                          alt={image?.colorImg?.colorName}
                          width={100}
                          height={100}
                          className="border-2 border-gray-700 rounded-md"
                        />
                      )}
                      {image?.colorImg?.colorName && (
                        <p className="text-center text-gray-500 mt-1">
                          Color: {image?.colorImg?.colorName}
                        </p>
                      )}
                      {image?.colorMeasurementVariationQuantity && (
                        <p className="text-center text-gray-500 mt-1">
                          Qty: {image?.colorMeasurementVariationQuantity}
                        </p>
                      )}

                      {image?.measurementvalue && (
                        <p className="text-center text-gray-500 mt-1">
                          Available Sizes: {image?.measurementvalue}{" "}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>

            <div className="flex flex-wrap justify-around ">
              {" "}
              {DBProductInfo.productImages.otherImages.map((image, index) => (
                <div key={index} className="m-2">
                  <Image
                    src={image.url}
                    alt=""
                    className="border-2 border-gray-700 rounded-md"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Loader className="text-primary" />
          </div>
        )}
      </>
    </Modal>
  );
};

export const ActionButton = (props) => {
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateModelOpen, setUpdateModelOpen] = useState(false);

  const [err, setErr] = useState(null);
  const [onSuccess, setOnSuccess] = useState(null);
  const [isupdate, setIsupdate] = useState();

  const [productId, setProductId] = useState(null);

  // reducer state
  const { deletedCategory, loading, error } = useSelector(
    (state) => state.deletecat
  );
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const handleEditClick = (id) => {
    setShowUpdateModel(true);
    setIsupdate(id);
  };

  const handleclose = () => {
    setShowUpdateModel(false);
  };
  const handleClick = () => {
    <UpdateModel setModel={true} />;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (id) => {
    setIsModalOpen(true);
    setProductId(id);
  };
  const handleCancelUppdate = () => {
    setIsModalOpen(false);
  };

  const ShowDeleteConfirm = (productId) => {
    confirm({
      title: "Are you sure delete this Product?",
      icon: <ExclamationCircleFilled />,
      content: (
        <span>
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            `Error: ${err}`
          ) : (
            onSuccess !== null && <p>{onSuccess}</p>
          )}
        </span>
      ),
      okText: "Yes",
      okType: "danger",

      cancelText: "No",
      async onOk() {
        return await new Promise((resolve, reject) => {
          dispatch(deleteproduct({ id: productId, token: token }))
            .unwrap()
            .then((response) => {
              if (response.status === 201) {
                setOnSuccess("Product deleted successfully");

                // pass category id to update state instead of dispatch
                props.handleUpdatestate(productId);
                resolve(response);
              }
            })
            .catch((error) => {
              setErr(error.message);
              reject();
            });
        }).catch((error_1) => {});
      },
      onCancel() {
        handleCancel();
      },
    });
  };

  return (
    <>
      <div div className="flex   space-x-5 items-center  ">
        {/* <EditFilled className=" text-icon2 mr-2" onClick={() => handleOpen()} /> */}
        <DeleteFilled
          onClick={() => ShowDeleteConfirm(props.productId)}
          className=" text-icon3"
        />
        <EditFilled
          className=" text-icon2 mr-2"
          onClick={() => {
            handleEditClick(props.productId);
          }}
        />
        <EyeFilled
          className=" text-icon1 mr-2"
          onClick={() => {
            handleOpen(props.productId);
          }}
        />
        {productId && (
          <SingleproductModel
            isModalOpen={isModalOpen}
            handleCancelUppdate={handleCancelUppdate}
            Id={productId}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {isupdate && (
          <UpdateProductModel
            isModalOpen={showUpdateModel}
            handleclose={handleclose}
            Id={isupdate}
            setShowUpdateMode={setShowUpdateModel}
          />
        )}
        {/* <ActionButton /> */}
      </div>
    </>
  );
};
