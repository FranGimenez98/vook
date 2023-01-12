
import {useState} from "react";
import { Menu } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import ProfilePic from "./ProfilePic";
import Link from "next/link";
import SignOutMessage from "./SignOutMessage";

export default function OptionsMenu({ username, user, ox }) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleChangeDelete = () => {
    setIsOpenDelete(true);
  };

  return (
    <div>
      <SignOutMessage 
          open={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
      />
      <Menu as="div" className="h-full">
        <div className="h-full">
          <Menu.Button className="bg-purple-100  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-full h-9 w-9 flex items-center justify-center cursor-pointer">
            <ProfilePic ox={ox} />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 md:mr-4 mr-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href={`/${username}`}>
                  <button
                    className={`${
                      active ? "bg-[#e9bdff] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-[#e9bdff] hover:text-white gap-2`}
                  >
                    <FaUser className="text-[#9d4edd] " />
                    Profile
                  </button>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#e9bdff] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                  onClick={handleChangeDelete}
                >
                  <BiLogOut className="text-[#9d4edd] " />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>

          {/* <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </button>
              )}
            </Menu.Item>
          </div> */}
        </Menu.Items>
      </Menu>
    </div>
  );
}
