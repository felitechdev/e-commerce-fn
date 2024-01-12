import React from "react";
import { useEffect, useState } from "react";

import { IoCloseSharp } from "react-icons/io5";

export const ImageUpload = ({
  //   values,
  //   setValues,
  setLoading,
  openmodel,
  handleupdateprofileModel,
}) => {
  const [values, setValues] = useState();
  console.log("values", values);
  return (
    <>
      {openmodel && (
        <div className="w-full h-screen z-50 fixed top-0 left-0 opacity-95  flex items-center justify-center bg-[#f4f4f4] ">
          <div className="form-group  bg-primary p-1 font-bold rounded-md relative">
            <IoCloseSharp
              onClick={() => handleupdateprofileModel(false)}
              className="text-[red] bg-white rounded-md absolute -right-2 -top-5"
            />
            <label className="btn btn-outline-secondary btn-block px-2 text-left text-sm hover:underline hover:text-white">
              Upload Image
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setValues({ ...values, image: e.target.files[0] });
                }}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
};
