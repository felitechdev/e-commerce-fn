// import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { IoCloseSharp } from "react-icons/io5";
// import { UpdateprofileInage } from "../../../APIs/UserAPIs";
// import Cookies from "js-cookie";

// export const ImageUpload = ({ openmodel, handleupdateprofileModel }) => {
//   const [values, setValues] = useState({
//     image: null,
//   });

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const onErrors = (errors) => console.error("errors", errors);

//   const { pimage, loadpimage, perr } = useSelector(
//     (state) => state.profileimage
//   );
//   const dispatch = useDispatch();
//   console.log("values", values);
//   const token = Cookies.get("token");

//   const handleupload = (values) => {
//     // const formData = new FormData();

//     // if (values?.image) {
//     //   //   formData.append("profilePicture", values?.image);
//     //   formData.append("profilePicture", values?.image, values?.image?.name);
//     // }

//     // for (var pair of formData.entries()) {
//     //   console.log(pair[0] + ": " + pair[1]);
//     // }
//     console.log("values", values);

//     // dispatch(UpdateprofileInage({ data: formData, token: token }))
//     //   .unwrap()
//     //   .then((res) => {
//     //     if (res.status === "success") {
//     //       console.log(res?.data?.profile, "sucesss updartee");

//     //       //   // handleupdatestateProfile
//     //       //   props.andleupdatestateProfile(payload);

//     //       //   // close model
//     //       //   props.handleCancel();
//     //       //   setUpdateError("");
//     //       //   setUpdateSuccess(res?.data?.profile);
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     // setUpdateError("Update Error");
//     //     // setUpdateSuccess("");
//     //     setValues({ image: null });
//     //     console.log("Update error response", err);
//     //   });
//   };

//   return (
//     <>
//       {openmodel && (
//         <div className="w-full h-screen z-50 fixed top-0 left-0 opacity-95  flex items-center justify-center bg-[#f4f4f4] ">
//           <div className="form-group  bg-primary p-1 font-bold rounded-md relative">
//             <IoCloseSharp
//               onClick={() => handleupdateprofileModel(false)}
//               className="text-[red] bg-white rounded-md absolute -right-2 -top-5"
//             />
//             <label className="btn btn-outline-secondary btn-block px-2 text-left text-sm hover:underline hover:text-white">
//               {!values?.image ? (
//                 <>
//                   Upload Image
//                   <input
//                     type="file"
//                     onChange={(e) => {
//                       setValues({ image: e.target.files[0] });
//                     }}
//                     // accept="image/*"
//                     hidden
//                   />
//                 </>
//               ) : (
//                 <button onClick={handleupload}>Update</button>
//               )}
//             </label>

//             <form
//               onSubmit={handleSubmit(handleupload, onErrors)}
//               className="relative flex w-full flex-wrap items-stretch mb-3"
//             >
//               <input
//                 type="file"
//                 // name="attach"
//                 {...register}
//                 id="file"
//               />
//               <button type="submit">submit</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
