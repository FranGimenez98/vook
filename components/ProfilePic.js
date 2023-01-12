/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function ProfilePic({user, ox}) {
  return (
    <div className="rounded-full bg-purple-100 h-full w-full flex items-center justify-center">
      {/* <FaUserAlt className='text-purple-300 text-[80%]'/> */}
      <img
        src={ox}
        className="object-cover bg-center rounded-full w-full h-full"
        alt="profile-pic"
      />
    </div>
  );
}
