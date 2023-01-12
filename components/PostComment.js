import React from "react";

export default function PostComment() {
  return (
    <form className="max-w-full">
      <textarea className="w-full h-24 mt-4 mb-1 resize-none text-gray-600 py-1 px-3 text-base bg-[#f3f3f4] outline-none rounded-lg  transition-all duration-200 hover:bg-white outline-[3px] hover:outline-[#e0aaff]/40" />
      <button className="button px-2 py-1">Response</button>
    </form>
  );
}
