/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import moment from "moment";
import Link from "next/link";

export default function Comment({
  comment,
  userData,
  post,
  sessionUser,
  handleDeleteComment,
}) {
  return (
    <div className="flex flex-col gap-1 w-full md:max-w-full py-2 my-2 border-t-[1px] border-gray-100 relative">
      <div className="absolute top-2 right-1">
        {(comment?.user?.username === sessionUser?.name && (
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
                        onClick={() => handleDeleteComment(comment?.id)}
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
        )) ||
          (post?.User?.username === sessionUser?.name && (
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
                          onClick={() => handleDeleteComment(comment?.id)}
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
          ))}
      </div>
      <div className="flex gap-2 items-center">
        <div className="h-8 w-8 rounded-full">
          <div className="rounded-full bg-purple-100 h-full w-full flex items-center justify-center">
            <Link href={`/${comment.user?.username}`}>
              <img
                src={comment.user?.image}
                className="object-cover bg-center rounded-full w-full h-full cursor-pointer"
                alt="profile-pic"
              />
            </Link>
          </div>
        </div>

        <Link href={`/${comment.user?.username}`}>
          <span className="text-base font-semibold cursor-pointer">
            {comment.user?.username}
          </span>
        </Link>
      </div>

      <div className="break-words max-w-full">
        <p className="text-base">{comment.message}</p>
      </div>
      <div>
        <p className="text-xs text-slate-500">
          {moment(comment.createdAt).format("lll")}
        </p>
      </div>
    </div>
  );
}
