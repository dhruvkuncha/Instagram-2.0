import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  DotsHorizontalIcon,
  ChatIcon,
  BookmarkAltIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { FiSend } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "@firebase/firestore";
import Moment from "react-moment";
import { HomeIcon, HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { modalLikeState } from "../atoms/modalLikeAtom";
import { modalPostState } from "../atoms/modalPostState";
import PostDropDown from "./PostDropDown";
import { useRouter } from "next/router";

 
const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [openLike, setOpenLike] = useRecoilState(modalLikeState);
  const [postId, setPostId] = useRecoilState(modalPostState);

  const router = useRouter();




  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        snapshot.forEach((doc) => {
          setLikes(snapshot.docs);
        });
      }),
    [db, id]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userId: session?.user.uid,
      userImage: session.user.image,
      timeStamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      setHasLiked(false);
      setLikes(likes.filter((like) => like.id !== session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session?.user.username,
        userId: session?.user.uid,
        userImage: session?.user?.image,
      });
    }
  };
  // const savePost = async () => {
  //   if (hasLiked) {
  //     await deleteDoc(doc(db, "posts", id, "saves", session.user.uid));
  //     setHasLiked(false)
  //     setLikes(likes.filter((like) => like.id !== session?.user?.uid))

  //   } else {
  //     await setDoc(doc(db, "posts", id, "saves", session.user.uid), {
  //       username: session?.user.username,
  //       userImage: session?.user?.image,
  //     });
  //   }
  // };
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          snapshot.forEach((doc) => {
            setComments(snapshot.docs);
          });
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );



  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="user-pic"
          className="rounded-full h-12 w-12 object-contain p-1 mr-3 cursor-pointer"
          onClick={() => router.push(`/${username}`)}
        />
        <p className="flex-1 font-bold cursor-pointer" onClick={() => router.push(`/${username}`)}>{username}</p>
        <PostDropDown id={id}/>
       
      </div>
      {/* Image */}
      <img src={img} alt="image" className="object-cover w-full" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <FiSend className="btn w-6" />
          </div>
          <BiBookmark className="btn w-6" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1 text-sm">
            {likes.length}{" "}
            <button
              type="button"
              onClick={() => {
                setOpenLike(true);
                setPostId(id);
              }}
            >
              likes
            </button>
          </p>
        )}
        <span className="font-bold mr-1 cursor-pointer" onClick={() => router.push(`/${username}`)}>{username}</span>
        {caption}
      </p>
      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt="user-img"
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* Input Box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="border-none flex-1 focus:ring-0"
            placeholder="Add a comment"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-500"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
      
    </div>
  );
};

export default Post;
