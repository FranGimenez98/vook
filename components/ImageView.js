/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useReducer, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { LikesContext } from "../context/LikesContext";

export default function ImageView({ open, onClose, image, user }) {
  // const [state, dispatch] = useReducer(followReducer, initialState);
  // const likesContext = useContext(LikesContext);
  // console.log("like", image);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch({ type: "FETCH_REQUEST" });
  //       dispatch({ type: "FETCH_SUCCESS", payload: image.comments });

  //       likesContext.dispatch({ type: "FETCH_REQUEST" });
  //       likesContext.dispatch({ type: "FETCH_SUCCESS", payload: image.likes });
  //       setLike(image.likes);
  //     } catch (err) {}
  //   };
  //   fetchData();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [image.comments, image.likes]);

  // const handleCreateComment = async ({ postId, userUserId, message }) => {
  //   try {
  //     dispatch({ type: "CREATE_REQUEST" });
  //     const { data } = await axios.post(`/api/comment/`, {
  //       postId,
  //       userUserId,
  //       message,
  //     });
  //     dispatch({ type: "CREATE_SUCCESS", payload: data.newComment });
  //   } catch (err) {
  //     dispatch({ type: "CREATE_FAIL" });
  //   }
  // };

  // const handleLike = async (postId, userUserId) => {
  //   try {
  //     likesContext.dispatch({ type: "LIKE_REQUEST" });
  //     const { data } = await axios.post(`/api/likes/`, {
  //       postId,
  //       userUserId,
  //     });
  //     console.log("data", data);
  //     likesContext.dispatch({ type: "LIKE_SUCCESS", payload: data.like });
  //     setLike([...like, data.like]);
  //     return data
  //   } catch (err) {
  //     likesContext.dispatch({ type: "LIKE_FAIL" });
  //   }
  // };

  // const likeId = image?.likes?.find((l) => l.userUserId === user?.userId);

  // const handleDislike = async (id) => {
  //   try {
  //     likesContext.dispatch({ type: "DISLIKE_REQUEST" });
  //     const { data } = await axios.delete(`/api/likes/`, { data: { id: id } });
  //     console.log("dislike", data)
  //     likesContext.dispatch({ type: "DISLIKE_SUCCESS" });
  //     const dislike = like.filter((l) => l.userUserId !== data.dislike.userUserId);
  //     setLike(dislike);
  //     return data
  //   } catch (err) {
  //     likesContext.dispatch({ type: "DISLIKE_FAIL" });
  //   }
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh] z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black/75">
        <div className="fixed inset-0 flex flex-col items-center justify-center ">
          <Dialog.Panel className="max-w-full max-h-full p-2 flex justify-center items-center gap-2 relative">
            <div>

            <img src={image?.image} className="max-h-[85vh]" alt="image" />
            </div>
          </Dialog.Panel>
          
          
        </div>
      </Dialog.Overlay>
    </Dialog>
  );
}
