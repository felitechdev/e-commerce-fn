import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { UpdateprofileInage } from "../../../APIs/UserAPIs";
import Cookies from "js-cookie";

export const ImageUpload = ({
  openmodel,
  handleupdateprofileModel,
  handleupdatestate,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { pimage, loadpimage, perr } = useSelector(
    (state) => state.profileimage
  );
  const dispatch = useDispatch();

  const token = Cookies.get("token");

  const handleUpload = (data) => {
    // console.log("dagggg", data.image[0]);
    // console.log("dataffff", data.image);
    const formData = new FormData();
    formData.append("profilePicture", data.image);

    dispatch(UpdateprofileInage({ data: formData, token: token }))
      .unwrap()
      .then((res) => {
        console.log("res", res);
        if (res.status === "success") {
          console.log(res?.data?.user, "success updated");
          handleupdatestate(res?.data?.user);
          reset({ image: "" });
          // handle success and close the modal
          handleupdateprofileModel(false);
        }
      })
      .catch((err) => {
        console.log("Update error response", err);
      });
  };

  return (
    <>
      {openmodel && (
        <div className="w-full h-screen z-50 fixed top-0 left-0 opacity-95  flex items-center justify-center bg-[#f4f4f4] ">
          {/* <div className="form-group  bg-primary p-1 font-bold rounded-md relative">
            <IoCloseSharp
              onClick={() => handleupdateprofileModel(false)}
              className="text-[red] bg-white rounded-md absolute -right-2 -top-5"
            />

            <form
              onSubmit={handleSubmit(handleUpload)}
              className="relative flex w-full flex-wrap items-stretch mb-3"
            >
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                )}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
              <button type="submit">Submit</button>
            </form>
          </div> */}

          <div className="form-group bg-primary px-4 py-1 font-bold rounded-md relative">
            <IoCloseSharp
              onClick={() => handleupdateprofileModel(false)}
              className="text-[red] bg-white rounded-md absolute -right-2 -top-5"
            />
            <label className="btn btn-outline-secondary btn-block px-2 text-left text-sm hover:underline hover:text-white">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <form onSubmit={handleSubmit(handleUpload)}>
                      {!field.value ? (
                        <>
                          Upload Image
                          <input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files[0])}
                            hidden
                          />
                        </>
                      ) : (
                        <button type="submit">
                          {" "}
                          {loadpimage ? "Loading ...." : "Update"}
                        </button>
                      )}
                    </form>
                  </>
                )}
              />
            </label>
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
