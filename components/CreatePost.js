import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export default function CreatePost({ open, onClose, userId, refreshData }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-2 flex items-center justify-center flex-col">
          <Dialog.Title className="font-semibold text-lg">
            Post a VOOK
          </Dialog.Title>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            onSubmit={async (values) => {
              const res = await axios.post("api/vooks", {
                title: values.title,
                description: values.description,
                userUserId: userId,
              }); 
              if (res.status < 300) {
                refreshData();
                onClose();
              }
        
              return res
            }}
          >
            <Form className="w-[80%]">
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
