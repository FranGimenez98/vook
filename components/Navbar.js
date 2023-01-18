/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import OptionsMenu from "./OptionsMenu";
import { FaSearch } from "react-icons/fa";
import { Combobox } from "@headlessui/react";
import axios from "axios";

export default function Navbar({ status, session, user }) {
  const [users, setUsers] = useState("");
  const [query, setQuery] = useState("");
  console.log("users", users);

  const filteredUsers = query
    ? users?.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (session) {
      async function fetchUsers() {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      }
      fetchUsers();
    }
  }, [session]);

  return (
    <header className=" w-full flex items-center justify-center bg-[#fcfcfc] top-0 fixed z-50 h-14">
      <nav className="md:w-[85%] flex container w-full h-14 justify-between items-center px-2 bg-whitefont-semibold top-0 fixed z-50">
        <div>
          <Link href="/">
            <a>
              <h1 className="font-bold text-lg md:flex md:text-2xl text-[#9d4edd]">
                VOOK
              </h1>
            </a>
          </Link>
        </div>
        {session && (
          <div className="flex items-center justify-center w-full h-6">
            <Combobox as="div" className="md:w-[50%] w-[85%] relative border-xl">
              <div
                className={`${
                  query
                    ? "bg-white border-gray-100 border-[0.5px] shadow-md border-b-0  outline-none hover:outline-transparent"
                    : "bg-[#f3f3f4]"
                } text-gray-600 py-1 px-3 text-base  outline-none rounded-lg w- h-[35px] transition-all duration-200 hover:bg-white outline-[3px] hover:outline-[#e0aaff]/40 flex gap-1 md:gap-2 items-center`}
              >
                <FaSearch className="text-slate-700" />
                <Combobox.Input
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  placeholder="Search users..."
                  className="outline-none bg-transparent text-sm text-slate-500 font-light w-[50%] md:w-full"
                />
              </div>

              <Combobox.Options
                className={`${
                  query.length < 0
                    ? "hidden"
                    : "bg-white p-2 rounded-b-lg overflow-y-scroll max-h-[15rem] absolute top-7 w-full flex flex-col gap-2 border-gray-100 border-[0.5px] shadow-md border-t-0"
                } `}
              >
                {filteredUsers?.map((user) => (
                  <Link key={user.userId} href={`/${user.username}`}>
                    <Combobox.Option>
                      <div className="flex gap-2 items-center cursor-pointer">
                        <div className="rounded-full h-7 w-7">
                          <img
                            src={user.image}
                            className="object-cover bg-center w-full h-full rounded-full"
                            alt="image"
                          />
                        </div>

                        <p className="text-slate-700 text-sm ">
                          {user.username}
                        </p>
                      </div>
                    </Combobox.Option>
                  </Link>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>
        )}
        <div className="flex gap-2 items-center">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <div>
              <div>
                <OptionsMenu
                  username={session.user.name}
                  user={session?.user.image}
                  ox={user?.image}
                />
                {/* <Link href={`/${session.user.name}`}>
                  <div className="rounded-full w-8 h-8 ">
                    
                  </div>
                  
                </Link> */}
              </div>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <button className="button py-1 px-3">
                  <a>Login</a>
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
