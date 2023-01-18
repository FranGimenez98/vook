/* eslint-disable @next/next/no-img-element */
import Layout from "../Layouts/Layout";
import { getSession, useSession } from "next-auth/react";
import { prisma } from "../utils/db";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import {
  userSuggestionsReducer,
  initialState,
} from "../reducers/userSuggestionsReducer";
import { BsFillCameraFill } from "react-icons/bs";
import Loader from "../components/Loader/Loader";

export default function Home(props) {
  const [state, dispatch] = useReducer(userSuggestionsReducer, initialState);
  const [suggestions, setSuggestions] = useState(props.users);
  const { data: session } = useSession();
  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = "" }) => {
      await new Promise((res) => setTimeout(res, 1000));
      try {
        const res = await axios.get("/api/timeline?cursor=" + pageParam);
        if (res.data) {
          return res.data;
        }
      } catch (e) {
        console.log({ error: e });
      }
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextId ?? false,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }

    const fetchSuggestionsUsers = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        dispatch({ type: "FETCH_SUCCESS", payload: props.users });
      } catch (err) {}
    };
    fetchSuggestionsUsers();
  }, [inView, fetchNextPage, hasNextPage, props.users]);

  // if (isLoading) return <div>Is Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleFollowUser = async (followingId) => {
    await axios.put("/api/follow", {
      id: session?.user?.userId,
      followingId: followingId,
    });

    setSuggestions(suggestions.filter((u) => u.userId !== followingId));
  };

  console.log({ error: error });

  return (
    <Layout title="Home" user={props.userData}>
      <div className="mt-[4rem] w-screen md:w-[85vw] min-h-[calc(100vh-3rem)] flex flex-col items-center px-4 bg-white  md:rounded-lg border-gray-100 border-[0.5px]">
        <div className="flex flex-col w-full">
          <div className="mt-2 mb-2">
            <h2 className="text-lg md:text-base font-medium ">
              What&apos;s new
            </h2>
          </div>

          <div className="flex justify-between gap-11 md:w-[90%]">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center mt-[10rem]">
                <Loader />
              </div>
            ) : props.userData.following.length === 0 ? (
              <div>No seguis a nadie loco fijate</div>
            ) : (
              data && (
                <div className="columns-2 md:columns-5 gap-y-2 w-full md:w-[76%] mb-4">
                  {data?.pages &&
                    data?.pages?.map((page) => {
                      return (
                        <div key={page?.nextId ?? "lastPage"} className="mb-4">
                          {page?.timeline?.map((post, index) => (
                            <div
                              key={index}
                              className=" flex flex-col rounded-lg mb-4 relative"
                            >
                              <Link href={`/post/${post?.id}`}>
                                <img
                                  src={post?.image}
                                  alt="posted-image"
                                  className="rounded-lg"
                                />
                              </Link>
                              <Link href={`/${post?.User?.username}`}>
                                <div className="h-[2rem] p-2 w-full absolute bottom-0 flex items-center gap-1 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent">
                                  <div className="rounded-full w-5 h-5 cursor-pointer">
                                    <div className="rounded-full bg-purple-100 h-full w-full flex items-center justify-center">
                                      <img
                                        src={post?.User?.image}
                                        className="object-cover bg-center rounded-full w-full h-full"
                                        alt="profile-pic"
                                      />
                                    </div>
                                  </div>
                                  <span className="text-white cursor-pointer text-lg md:text-xs">
                                    {post?.User?.username}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                </div>
              )
            )}

            <div className="w-[20%] flex-col gap-5 hidden md:flex">
              <div>
                <div>
                  <h1 className="text-sm font-medium mb-1">
                    Your Latest VOOKS
                  </h1>
                </div>
                <div className="w-full flex flex-col gap-2">
                  {props?.userData?.Vook.length ? (
                    props?.userData?.Vook?.slice(0, 3).map((vook, i) => (
                      <Link key={i} href={`/vook/${vook?.id}`}>
                        <div className="relative w-[17rem] h-[7rem]">
                          {vook.Post.length === 0 ? (
                            <div className="bg-purple-100 w-[17rem] h-[7rem] rounded-lg flex items-center justify-center">
                              <BsFillCameraFill className="text-2xl text-purple-300" />
                            </div>
                          ) : (
                            <img
                              src={vook.Post[0]?.image}
                              className=" w-[17rem] h-[7rem] object-cover bg-center rounded-lg"
                              alt="profile-pic"
                            />
                          )}

                          <div className="h-[2rem] p-2 w-full absolute bottom-0 flex items-center gap-2 rounded-b-lg bg-gradient-to-t from-black/60 to-transparent">
                            <h1 className="absolute z-10 bottom-0 left-1 p-1 text-white">
                              {vook.title}
                            </h1>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div>
                      <p className="text-sm text-slate-400">
                        you don&apos;t have any vook, go post your first vook!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <h1 className="text-sm font-medium">Suggestions for you</h1>
                {suggestions.map((user) => {
                  return (
                    <div
                      className="w-full flex gap-2 items-center"
                      key={user.userId}
                    >
                      <Link href={`/${user.username}`}>
                        <div>
                          <img
                            src={user.image}
                            className="rounded-full h-8 w-8 cursor-pointer shadow-md object-cover bg-center"
                            alt="profile-pic"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col">
                        <Link href={`/${user.username}`}>
                          <span className="text-sm text-slate-700 cursor-pointer">
                            {user.username}
                          </span>
                        </Link>
                        <span
                          className="text-xs text-[#9d4edd] cursor-pointer"
                          onClick={() => handleFollowUser(user.userId)}
                        >
                          follow
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {isFetchingNextPage && (
          <div className="w-full flex items-center justify-start">
            <div className="w-[68%] flex items-center justify-center">
              <Loader />
            </div>
          </div>
        )}

        {/* {isFetchingNextPage && <Loader />} */}
        <span style={{ visibility: "hidden" }} ref={ref}>
          intersection observer marker
        </span>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = await getSession(context);
  if (user) {
    try {
      const data = await prisma.user.findFirst({
        where: {
          userId: user.user.userId,
        },
        select: {
          userId: true,
          username: true,
          email: true,
          image: true,
          firstName: true,
          description: true,
          Vook: {
            select: {
              title: true,
              id: true,
              createdAt: true,
              Post: {
                select: {
                  title: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          following: {
            select: {
              userId: true,
              Post: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  image: true,
                  User: true,
                  likes: true,
                  comments: {
                    select: {
                      message: true,
                      user: true,
                      parent: true,
                      children: true,
                    },
                  },
                },
                orderBy: {
                  description: "asc",
                },
              },
            },
          },
        },
      });

      const allUsers = await prisma.user.findMany();
      const userFilter = allUsers.filter((u) => u.userId !== user.user.userId);
      const usersWithoutFollowings = userFilter.filter(
        (u) => !data.following.some((x) => x.userId == u.userId)
      );
      const randomUsers = usersWithoutFollowings
        .sort(() => Math.random() - Math.random())
        .slice(0, 4);

      return {
        props: {
          userData: JSON.parse(JSON.stringify(data)),
          users: JSON.parse(JSON.stringify(randomUsers)),
        },
      };
    } catch (err) {
      console.log(err);
    }
  }
  return {
    redirect: {
      destination: "/login",
      statusCode: 307,
    },
  };
}
