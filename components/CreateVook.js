/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";

export default function CreateVook({ open, onClose, vookData, refreshData }) {
  const [image, setimage] = useState("");
  const [loading, setLoading] = useState("");
  console.log('vookdata',vookData);

  const handleOnChange = async (e) => {
    const files = e.target.files;
    console.log("file", files);
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

    setimage(res.secure_url);
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
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-2 flex items-center justify-center flex-col">
          <Dialog.Title className="font-semibold text-lg mb-3">
            Add photo
          </Dialog.Title>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            onSubmit={async (values) => {
              const res = await axios.post("/api/post", {
                title: values.title,
                description: values.description,
                image: image,
                vookId: vookData.vook.id,
                userUserId: vookData.vook.User.userId,
              });

              if(res.status === 200){
                refreshData()
                onClose()
              }
            }}
          >
            <Form className="w-[80%]">
              <div className="min-h-[15rem] bg-purple-100 mb-1 rounded-lg flex items-center justify-center cursor-pointer relative">
                <input
                  type="file"
                  name="banner"
                  className="absoute z-50 opacity-0 h-full w-full cursor-pointer"
                  onChange={handleOnChange}
                />
                {loading && <p>Is Loading...</p>}
                {image ? (
                  <img
                    src={image}
                    className="object-cover bg-center w-full absolute h-[15rem] rounded-lg"
                    alt="image"
                  />
                ) : (
                  <BsFillCameraFill className="text-4xl text-purple-300 text-center absolute " />
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-normal">Title</label>
                <Field type="text" name="title" className="input w-full" />
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

              <div>
                <button type="submit" className="button px-2 py-1 mt-3 mb-1">
                  Post
                </button>
              </div>
            </Form>
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
