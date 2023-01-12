/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { prisma } from "../utils/db";
import { useSession, getSession } from "next-auth/react";
import { BsFillCameraFill } from "react-icons/bs";
import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import CreatePost from "../components/CreatePost";
import ProfileLayout from "../Layouts/ProfileLayout";
import UpdateProfile from "../components/UpdateProfile";
import { followReducer, initialState } from "../reducers/followReducer";
import axios from "axios";

export default function ProfileScreen({ user, userLoggedData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [state, dispatch] = useReducer(followReducer, initialState);
  const [follows, setFollows] = useState([]);
  const [userData, setUserData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      dispatch({ type: "FETCH_SUCCESS", payload: userLoggedData.following });
    };
    fetchData();
    setFollows(state.follow);
    setUserData(user.followedBy);
  }, [state.follow, user, userLoggedData.following]);

  const router = useRouter();
  // refresh props
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenEdit = () => {
    setIsOpenEditProfile(true);
  };

  const handleFollowUser = async (followingId, user) => {
    await axios.put("/api/follow", {
      id: session?.user?.userId,
      followingId: followingId,
    });
    setFollows([...state.follow, user]);
    setUserData([...userData, userLoggedData]);
  };

  const handleUnfollowUser = async (followingId) => {
    await axios.put("/api/unfollow", {
      id: session?.user?.userId,
      followingId: followingId,
    });
    const unfollow = userLoggedData.following.filter(
      (f) => f.userId !== followingId
    );
    const userUnfollow = userData.filter(
      (f) => f.userId !== userLoggedData.userId
    );
    setFollows(unfollow);
    setUserData(userUnfollow)
  };

  return (
    <ProfileLayout
      title={user?.username}
      user={user}
      image={userLoggedData.image}
    >
      <div className="h-full w-full bg-white md:border-gray-100 md:border-[1px] md:border-t-0">
        <div className="flex flex-col h-full">
          <div className="h-52 w-full bg-purple-100 relative flex justify-center">
            <img src={user?.banner} className="object-cover bg-center w-full" />

            <div className="h-[9.5rem] w-[9.5rem] flex items-center justify-center absolute -bottom-16 rounded-full bg-purple-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg">
              <div className="h-[9rem] w-[9rem] absolute ">
                <div className="rounded-full bg-purple-100 h-full w-full flex items-center justify-center">
                  <img
                    src={user?.image}
                    className="object-cover bg-center rounded-full w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[4.5rem] flex items-center flex-col ">
            <h1 className="text-lg font-semibold">{user?.username}</h1>
            {user &&
              session?.user.userId !== user.userId &&
              (follows?.some((u) => u.username == user?.username) ? (
                <div>
                  <button
                    className="my-2 text-sm border-gray-200 border-[1px] py-1 px-2 rounded-md"
                    onClick={() => handleUnfollowUser(user?.userId)}
                  >
                    Unfollow
                  </button>
                </div>
              ) : (
                <button
                  className="my-2 text-sm border-gray-200 border-[1px] py-1 px-2 rounded-md"
                  onClick={() => handleFollowUser(user?.userId, user)}
                >
                  Follow
                </button>
              ))}

            {/* {session?.user.userId === user.userId && <div>Hola</div>} */}
            <div className="flex gap-4 items-center">
              <div>
                <span className="font-medium">
                  {userLoggedData?.following?.length}{" "}
                </span>
                <span className="text-slate-700">following</span>
              </div>
              <div>
                <span className="font-medium">
                  {userData?.length}{" "}
                </span>
                <span className="text-slate-700">followers</span>
              </div>
            </div>
            {session?.user.userId === user?.userId && (
              <button
                className="alt_button mt-1 mb-2"
                onClick={() => handleOpenEdit()}
              >
                Edit Profile
              </button>
            )}
            <div className="flex gap-1 mt-1">
              <p className="text-sm font-medium text-slate-700 ">
                {user?.firstName}
              </p>
            </div>
            <div className="max-w-[12rem] text-center">
              <p className="text-sm  font-normal text-slate-400">
                {user?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="p-1 mt-3 md:mt-7 flex justify-center flex-col h-full">
          <div className="px-2 mb-1 flex items-center gap-2">
            <span className="font-semibold">VOOKS</span>
            {session?.user.userId === user?.userId && (
              <button
                className="button rounded-full w-5 h-5 bg-red-200 flex items-center justify-center"
                onClick={() => handleOpen()}
              >
                <BsPlusLg className="text-xs" />
              </button>
            )}
          </div>
          <div className=" grid grid-cols-3 lg:grid-cols-4 gap-2 md:px-0 h-full px-2">
            {user?.Vook.map((vook) => (
              <Link href={`/vook/${vook.id}`} key={vook.id}>
                <a>
                  <div className="relative h-[7rem] md:h-[15rem] bg-purple-100 rounded-md">
                    <div className="p-2 w-full absolute bottom-0  flex items-center rounded-b-lg h-8 md:h-9 bg-gradient-to-t from-black/50 to-transparent">
                      <p className="text-white text-sm">{vook.title}</p>
                    </div>

                    {vook.Post.length <= 0 ? (
                      <div className="flex items-center justify-center h-full w-full">
                        <BsFillCameraFill className="text-2xl text-purple-300" />
                      </div>
                    ) : (
                      <img
                        src={
                          vook.Post.length <= 0 ? "Nada" : vook.Post[0].image
                        }
                        className="h-[7rem] md:h-[15rem] w-full rounded-md object-cover"
                      />
                    )}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CreatePost
        open={isOpen}
        onClose={() => setIsOpen(false)}
        userId={session?.user.userId}
        refreshData={refreshData}
      />

      <UpdateProfile
        user={user}
        open={isOpenEditProfile}
        onClose={() => setIsOpenEditProfile(false)}
        refreshData={refreshData}
      />
    </ProfileLayout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const { username } = params;
  const userLogged = await getSession(context);

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      userId: true,
      username: true,
      email: true,
      banner: true,
      image: true,
      firstName: true,
      lastName: true,
      description: true,
      following: {
        select: {
          username: true,
          Vook: true,
        },
      },
      following: true,
      followedBy: {
        select: {
          username: true,
          userId: true,
        },
      },
      Vook: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          Post: {
            select: {
              title: true,
              description: true,
              image: true,
              User: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const userLoggedData = await prisma.user.findFirst({
    where: {
      userId: userLogged?.user?.userId,
    },
    select: {
      userId: true,
      username: true,
      email: true,
      banner: true,
      image: true,
      firstName: true,
      lastName: true,
      description: true,
      following: {
        select: {
          username: true,
          Vook: true,
        },
      },
      following: true,
      followedBy: {
        select: {
          username: true,
        },
      },
      Vook: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          Post: {
            select: {
              title: true,
              description: true,
              image: true,
              User: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      userLoggedData: JSON.parse(JSON.stringify(userLoggedData)),
    },
  };
}
