import React from 'react'
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical, BsPencilFill, BsTrashFill } from "react-icons/bs";


export default function CommentOptions() {
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
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#e9bdff] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 `}
                  onClick={() => handleChangeDelete()}
                >
                  <BsTrashFill className="text-[#9d4edd]"/>
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}