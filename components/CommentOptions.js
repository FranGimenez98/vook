import React from "react";
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import axios from "axios";

export default function CommentOptions(id, handleDeleteComment) {
  // const handleDeleteComment = async (id) => {
  //   const { data } = await axios.delete(`/api/comment/`, { data: { id } });
  //   console.log("data", data);
  //   return data;
  // };


  // const handleDeleteComment = async (commentId) => {
  //   try {
  //     const { data } = await axios.delete(`/api/comment/`, {
  //       data: { id: commentId },
  //     });
  //     console.log("data", data);
  //   } catch (err) {
  //     console.log("data", err);
  //   }
  // };

  return (
    <div>
      <Menu as="div" className="h-full relative">
        <div className="h-full">
          <Menu.Button className="alt_button flex items-center text-sm gap-2 h-full">
            <BsThreeDotsVertical className="text-lg text-slate-600" />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute hover:bg-gray-50 -left-[10.8rem] mt-1 md:mr-4 mr-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#e9bdff] text-white" : "text-gra<y-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm  gap-2`}  onClick={() => handleChangeEdit()}
                >
                  <BsPencilFill className="text-[#9d4edd]"/>
                  Edit
                </button>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#e9bdff] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 `}
                  onClick={() => handleDeleteComment(id.id)}
                >
                  <BsTrashFill className="text-[#9d4edd]" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
