/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import { prisma } from "../../utils/db";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { CommentsContext } from "../../context/CommentsContext";
import Comment from "../../components/Comment";
import PostOptions from "../../components/PostOptions";
import { Form, Formik, Field } from "formik";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LikesContext } from "../../context/LikesContext";
import { useRouter } from "next/router";
import ImageView from "../../components/ImageView";
import moment from "moment";

export default function PostScreen({ post, userData }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([]);
  const commentsContext = useContext(CommentsContext);
  const likesContext = useContext(LikesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleImage = (e) => {
    setImage(e);
  };

  const router = useRouter();
  // refresh props
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        commentsContext.dispatch({ type: "FETCH_REQUEST" });
        commentsContext.dispatch({
          type: "FETCH_SUCCESS",
          payload: post.comments,
        });
        setComment(post.comments);

        likesContext.dispatch({ type: "FETCH_REQUEST" });
        likesContext.dispatch({ type: "FETCH_SUCCESS", payload: post.likes });
        setLikes(post.likes);
      } catch (err) {}
    };
    fetchData();
  }, [post.comments, post.likes]);

  const handleSubmit = async ({ postId, userUserId, message }) => {
    try {
      commentsContext.dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/comment/`, {
        postId,
        userUserId,
        message,
      });
      setComment([...comment, data.newComment]);
      commentsContext.dispatch({
        type: "CREATE_SUCCESS",
        payload: data.newComment,
      });
    } catch (err) {
      commentsContext.dispatch({ type: "CREATE_FAIL" });
    }
  };

  const likeId = post?.likes?.find((l) => l.userUserId === user?.userId);

  const handleLike = async (postId, userUserId) => {
    try {
      likesContext.dispatch({ type: "LIKE_REQUEST" });
      const { data } = await axios.post(`/api/likes/`, {
        postId,
        userUserId,
      });
      likesContext.dispatch({ type: "LIKE_SUCCESS", payload: data.like });
      setLikes([...likes, data.like]);
      refreshData();
    } catch (err) {
      likesContext.dispatch({ type: "LIKE_FAIL" });
    }
  };

  const handleDislike = async (id) => {
    try {
      likesContext.dispatch({ type: "DISLIKE_REQUEST" });
      const { data } = await axios.delete(`/api/likes/`, { data: { id: id } });
      likesContext.dispatch({ type: "DISLIKE_SUCCESS" });
      const dislike = likes.filter(
        (l) => l.userUserId !== data.dislike.userUserId
      );
      setLikes(dislike);
    } catch (err) {
      likesContext.dispatch({ type: "DISLIKE_FAIL" });
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      commentsContext.dispatch({ type: "DELETE_REQUEST" });
      const { data } = await axios.delete(`/api/comment/`, {
        data: { id: id },
      });
      console.log("delete_data", data);
      commentsContext.dispatch({ type: "DELETE_SUCCESS" });
      const deleteComment = comment.filter((c) => c.id !== id);
      setComment(deleteComment);
    } catch (err) {
      console.log("data", err);
    }
  };

  return (
    <Layout user={userData}>
      <ImageView
        open={isOpen}
        onClose={() => setIsOpen(false)}
        image={image}
        user={userData}
      />
      <div className="mt-[4rem] md:w-[60vw] w-screen min-h-[calc(100vh-3rem)] flex flex-col items-center px-4 bg-white md:rounded-lg border-gray-100 border-[0.5px] relative">
        {/* <div className="mt-[1rem] w-screen h-full flex flex-col items-center p-2 relative"> */}
        {post?.User?.userId === userData?.userId && (
          <div className="absolute right-3 top-2 w-[2rem] h-[2rem] flex items-center justify-center transition duration-100">
            {/* <BsThreeDotsVertical className="text-[1.5rem] text-slate-500"/> */}
            <PostOptions />
          </div>
        )}
        <div className="flex w-full gap-2 items-center mt-4 mb-2 ">
          <Link href={`/${post.User?.username}`}>
            <div className="rounded-full w-10 h-10 cursor-pointer border-gray-100 border-[0.5px]">
              <img
                src={post.User?.image}
                className="rounded-full w-full h-full object-cover bg-center"
              />
            </div>
          </Link>
          <Link href={`/${post.User?.username}`}>
            <h2 className="text-lg font-medium cursor-pointer">{post.User?.username}</h2>
          </Link>
        </div>
        <div className=" w-full">
          <div className="text-xl">
            <p>{post.title}</p>
          </div>
          <div className=" mb-2 text-base">
            <p>{post?.description}</p>
          </div>
        </div>
        <div
          className="hidden md:flex w-full bg-[#fafafa] max-h-[30rem] rounded-lg cursor-pointer "
          onClick={() => {
            handleOpen(), handleImage(post);
          }}
        >
          <img
            src={post.image}
            className="max-h-[26rem] w-auto m-auto"
            alt="image"
          />
        </div>
        <img
          src={post.image}
          className="md:hidden rounded-lg max-h-[26rem] w-auto m-auto"
          onClick={() => {
            handleOpen(), handleImage(post);
          }}
          alt="posted-image"
        />

        <div className="w-full mt-[1rem]">
          <div>
            {likes?.some((like) => like.userUserId === user?.userId) ? (
              <div className="flex items-center gap-1">
                <AiFillHeart
                  className="text-[1.7rem] text-red-500 hover:text-red-400 cursor-pointer"
                  onClick={() => handleDislike(likeId?.id)}
                />
                <p className="text-base text-slate-500 text-center">
                  {likes?.length} likes
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <AiOutlineHeart
                  className="text-[1.7rem] text-black hover:text-gray-400 cursor-pointer"
                  onClick={() => handleLike(post?.id, user?.userId)}
                />
                <p className="text-base text-slate-500">
                  {likes?.length} likes
                </p>
              </div>
            )}
          </div>
          <div className="w-full">
            <p className="text-sm text-slate-500">
              {moment(post?.createdAt).format("lll")}
            </p>
          </div>
          <Formik
            initialValues={{
              message: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit({
                postId: post?.id,
                userUserId: session?.user.userId,
                message: values.message,
              });
              resetForm();
            }}
          >
            <Form className="w-[98%] mt-2">
              <Field
                as="textarea"
                name="message"
                className="w-full h-28 mt-1 mb-1 resize-none text-gray-600 py-1 px-3 text-base bg-[#f3f3f4] outline-none rounded-lg  transition-all duration-200 hover:bg-white outline-[3px] hover:outline-[#e0aaff]/40"
              />
              <button type="submit" className="button px-2 py-1">
                Response
              </button>
            </Form>
          </Formik>
          <div className="mt-[1.5rem]">
            {comment.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                userData={userData}
                post={post}
                sessionUser={user}
                handleDeleteComment={handleDeleteComment}
              />
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

  const post = await prisma.post.findFirst({
    where: {
      id: intId,
    },
    select: {
      title: true,
      description: true,
      image: true,
      User: true,
      id: true,
      likes: true,
      comments: {
        select: {
          id: true,
          message: true,
          user: true,
          parent: true,
          children: true,
          createdAt: true,
        },
      },
      createdAt: true,
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
      post: JSON.parse(JSON.stringify(post)),
      userData: JSON.parse(JSON.stringify(data)),
    },
  };
}
