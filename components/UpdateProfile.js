/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export default function UpdateProfile({ user, open, onClose, refreshData }) {
  const [profilePic, setProfilePic] = useState(user?.image);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(user?.banner);

  useEffect(() => {
    setProfilePic(user?.image)
    setBanner(user?.banner)
  }, [user?.image, user?.banner])

  const handleOnChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "vook_store");

    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxwfqcx0v/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
      .then((r) => r.json())
      .catch((err) => console.log("error", err));

    setProfilePic(res.secure_url);
    setLoading(false);
  };

  const handleBannerOnChange = async (e) => {

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "vook_store");

    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxwfqcx0v/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
      .then((r) => r.json())
      .catch((err) => console.log("error", err));

   
    setBanner(res.secure_url);
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg max-h-[30rem] rounded-lg bg-white p-2 flex items-center flex-col overflow-y-scroll">
          <Formik
            initialValues={{
              firstName: user?.firstName,
              lastName: user?.lastName,
              description: user?.description,
            }}
            onSubmit={async (values) => {
              const res = await axios.put("api/users", {
                id: user.userId,
                firstName: values.firstName,
                lastName: values.lastName,
                description: values.description,

                image: profilePic,
                banner: banner,
              });

              if (res.status < 300) {
                refreshData();
                onClose();
              }

              return res;
            }}
          >
            <Form className="w-[98%] h-full relative flex items-center flex-col">
              <div className="w-full h-[8rem] bg-red-200 rounded-lg relative">
                {banner && (
                  <img
                    src={banner}
                    className="h-[8rem] object-cover bg-center w-full rounded-lg cursor-pointer relative"
                    alt="image"
                  />
                )}
                <div className="absolute top-0 w-full h-[8rem] flex items-center justify-center  bg-transparent">
                  <input
                    type="file"
                    name="banner"
                    onChange={handleBannerOnChange}
                    className="absoute z-10 opacity-0 h-full w-full cursor-pointer"
                  />
                </div>
              </div>
              <div className="absolute rounded-full bg-purple-100  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 w-[8rem] h-[8rem] top-[3.9rem] flex items-center justify-center cursor-pointer">
                {profilePic ? (
                  <img
                    src={profilePic}
                    className="object-cover bg-center rounded-full  w-[7.5rem] h-[7.5rem]"
                    alt="image"
                  />
                ) : (
                  <div className="object-cover bg-purple-400 rounded-full w-[7.5rem] h-[7.5rem]"></div>
                )}
                <div className="absolute w-full h-full rounded-full flex items-center justify-center  bg-transparent">
                  <input
                    type="file"
                    name="file"
                    onChange={handleOnChange}
                    className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full mt-[3rem]">
                {/* <div className="flex flex-col"></div> */}
                <div className="flex flex-col">
                  <label className="mb-1 font-normal">Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-normal">Last name</label>
                  <Field type="text" name="lastName" className="input w-full" />
                </div>
                <div className="flex flex-col">
                  <label className="my-1 font-normal">Description</label>
                  <Field
                    as="textarea"
                    type="text"
                    name="description"
                    className="w-full h-[4rem]  resize-none text-gray-600 py-1 px-3 text-base bg-[#f3f3f4] outline-none rounded-lg  transition-all duration-200 hover:bg-white outline-[3px] hover:outline-[#e0aaff]/40"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="button px-2 py-1 mt-3 mb-1">
                  Create
                </button>
              </div>
            </Form>
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
