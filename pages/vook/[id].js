/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import Layout from "../../Layouts/Layout";
import { prisma } from "../../utils/db";
import ImageView from "../../components/ImageView";
import moment from "moment";
import { BsFillCameraFill } from "react-icons/bs";
import CreateVook from "../../components/CreateVook";
import { useRouter } from "next/router";
import VookOptions from "../../components/VookOptions";
import UpdateVook from "../../components/UpdateVook";
import DeleteMessage from "../../components/DeleteMessage";
import { useSession, getSession } from "next-auth/react";
import { CommentsContext } from "../../context/CommentsContext";
import Link from "next/link";

export default function VookScreen(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [image, setImage] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { data: session } = useSession();
  const context = useContext(CommentsContext);
  const router = useRouter();
  const { redirect } = router.query;
  // refresh props
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    if (!session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenImage = () => {
    setIsOpenImage(true);
  };

  const handleImage = (e) => {
    setImage(e);
  };

  const handleChangeEdit = () => {
    setIsOpenEdit(true);
  };

  const handleChangeDelete = () => {
    setIsOpenDelete(true);
  };

  console.log(props.vook);

  return (
    <Layout title={props?.vook?.title} user={props?.userData}>
      <CreateVook
        open={isOpen}
        onClose={() => setIsOpen(false)}
        vookData={props}
        refreshData={refreshData}
      />
      <ImageView
        open={isOpenImage}
        onClose={() => setIsOpenImage(false)}
        image={image}
        user={session?.user}
      />
      <UpdateVook
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        vookData={props.vook}
        refreshData={refreshData}
      />
      <DeleteMessage
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        vookData={props.vook}
      />
      <div className="w-screen mt-[4rem] md:w-[85vw] min-h-[calc(100vh-3rem)] flex flex-col items-center px-4 bg-white md:rounded-lg border-gray-100 border-[0.5px] pt-[0.5rem]">
        <div className="flex flex-col justify-start w-full mb-3">
          <div className="flex flex-col mb-6 w-full">
            <div className="flex items-center gap-2">
              <div className="max-h-14 max-w-[16rem] md:max-w-[25rem]">
                <h2 className="font-semibold text-xl">{props?.vook?.title}</h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {props?.vook?.Post.length} photos
              </p>
            </div>

            <p className="text-xs text-slate-500">
              {moment(props?.vook?.createdAt).format("lll")}
            </p>

            <div className="w-full flex flex-col mt-2">
              <div>
                <p>{props?.vook?.description}</p>
              </div>
            </div>
          </div>

          {session?.user.userId == props.vook.User.userId && (
            <div className="flex h-[2rem] gap-1">
              {props.vook.Post.length > 50 ? (
                <button
                  className='button bg-purple-300 py-1 px-2 text-sm flex items-center gap-2 cursor-not-allowed focus:outline-none disabled:opacity-100'
                >
                  Add photos <BsFillCameraFill className="text-lg" />
                </button>
              ) : (
                <button
                  className='button py-1 px-2 text-sm flex items-center gap-2'
                  onClick={handleOpen}
                >
                  Add photos <BsFillCameraFill className="text-lg" />
                </button>
              )}
              {/* <button
                className={`button py-1 px-2 text-sm flex items-center gap-2 ${
                  props.vook.Post.length > 0 &&
                  "cursor-not-allowed focus:outline-none disabled:opacity-100"
                }`}
                onClick={handleOpen}
              >
                Add photos <BsFillCameraFill className="text-lg" />
              </button> */}
              <VookOptions
                isOpenDelete={isOpenDelete}
                isOpenEdit={isOpenEdit}
                handleChangeEdit={handleChangeEdit}
                handleChangeDelete={handleChangeDelete}
              />
            </div>
          )}

          <div className="columns-2 md:columns-5 gap-y-6 mt-2">
            {props?.vook?.Post.map((post) => (
              <div
                key={post.id}
                className=" flex flex-col rounded-lg mb-4 relative"
              >
                {/* mobile */}
                <Link href={`/post/${post?.id}`}>
                  <img
                    src={post.image}
                    className="rounded-lg "
                    alt="posted-image"
                  />
                </Link>
                {/* pc */}
                {/* <img
                  src={post.image}
                  className=" hidden md:flex rounded-lg"
                  onClick={() => {
                    handleOpenImage(), handleImage(post);
                  }}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = await getSession(context);
  const { params } = context;
  const { id } = params;

  const intId = parseInt(id);

  const vook = await prisma.vook.findFirst({
    where: {
      id: intId,
    },
    select: {
      id: true,
      User: true,
      title: true,
      description: true,
      createdAt: true,
      Post: {
        select: {
          description: true,
          id: true,
          image: true,
          title: true,
          userUserId: true,
          vookId: true,
          User: true,
          comments: {
            select: {
              message: true,
              user: true,
              parent: true,
              children: true,
            },
          },
        },
      },
    },
  });

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
    },
  });

  return {
    props: {
      vook: JSON.parse(JSON.stringify(vook)),
      userData: JSON.parse(JSON.stringify(data)),
    },
  };
}
