import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field } from "formik";

export default function EditProfilePic() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-700/75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-2 flex items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="p-5 font-semibold">
              <h2>Change profile picture</h2>
            </div>
            <div className="p-3 w-full border-t text-center text-purple-500 text-sm  font-semibold cursor-pointer">
              <span>Upload photo</span>
            </div>
            <div className="p-3 w-full border-t text-center text-red-500 text-sm font-semibold cursor-pointer">
              <span>Delete current photo</span>
            </div>
            <div className="p-3 w-full border-t text-center  text-sm cursor-pointer">
              <span>Cancel</span>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
