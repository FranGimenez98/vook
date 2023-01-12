import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import OptionsMenu from "./OptionsMenu";

export default function ProfileNavigation({session, user, image}) {
  return (
    <div className=" w-full flex items-center justify-center bg-transparent absolute top-0">
      <nav className="flex container w-full md:w-[85%] h-14 justify-between items-center px-4 bg-whitefont-semibold top-0 fixed z-50 ">
        <Link href="/">
        <div className="bg-purple-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-full h-9 w-9 flex items-center justify-center shadow-md cursor-pointer">
          <IoChevronBack className="text-2xl text-gray-200 font-bold" />
        </div>
      </Link>

      <div className="rounded-full w-8 h-8 ">
        <OptionsMenu username={session?.user.name} user={session?.user.image} ox={image}/>
      </div>
      </nav>
      
      
    </div>
  );
}
