import { Dialog } from "@headlessui/react";
import axios from "axios";
import React from "react";
import { useRouter } from 'next/router'

export default function DeletePostMessage({ open, onClose, post }) {
    const router = useRouter()
  const handleDeletePost = async () => {
    await axios.delete("/api/post", {data:{ id: post.id }});
    router.push(`/vook/${post.Vook.id}`)
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm min-h-[5rem] rounded-lg bg-white p-2 flex items-center flex-col">
          <Dialog.Title className="font-medium">Confirm</Dialog.Title>
          <Dialog.Description className="text-sm text-slate-500">
            Are you sure you want to delete this Post?
          </Dialog.Description>
          <div className="flex gap-1 pt-6 items-end">
            <button className="button px-2 py-1" onClick={() => handleDeletePost()}>
              Delete
            </button>
            <button className="alt_button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
