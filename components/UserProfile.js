import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Posts from "./Posts";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalPostCount } from '../atoms/modalPostCount'



const UserProfile = ({ session, users }) => {
  //session => session user
  const router = useRouter(); // users => user details of profile page
  const { id } = router.query;
  const [postCount, setPostCount] = useRecoilState(modalPostCount)
  const [sessionUserFollowing, setSessionUserFollowing] = useState([]);
  const [curentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [currentUserFollowers, setCurrentUserFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const followUser = async () => {
    if (isFollowing) {
      await deleteDoc(
        doc(db, "users", session?.uid, "following", users?.userId)
      );
      await deleteDoc(
        doc(db, "users", users?.userId, "followers", session?.uid)
      );
      setIsFollowing(false);
      setSessionUserFollowing(
        sessionUserFollowing.filter((follow) => follow.id !== users?.userId)
      );
      setCurrentUserFollowers(
        currentUserFollowers.filter((follow) => follow.id !== session?.uid)
      );
    } else {
      await setDoc(doc(db, "users", session?.uid, "following", users?.userId), {
        username: users?.username,
        userId: users?.userId,
        userImage: users?.profileImg,
      });
      await setDoc(doc(db, "users", users?.userId, "followers", session?.uid), {
        username: session?.username,
        userId: session?.uid,
        userImage: session?.image,
      });
    }
  };
  useEffect(() => {
    onSnapshot(
      collection(db, "users", session?.uid, "following"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          setSessionUserFollowing(snapshot.docs);

        });
      }
    );
  }, [db, users.userId]);

  useEffect(() => {
    onSnapshot(
      collection(db, "users", users?.userId, "followers"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          setCurrentUserFollowers(snapshot.docs);
       
        });
      }
    );
  }, [db, users.userId]);
  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", users?.userId, "following"),
        (snapshot) => {
          snapshot.forEach((doc) => {
            setCurrentUserFollowing(snapshot.docs);

          });
        }
      ),
    [db, users.userId]
  );

  useEffect(() => {
    setIsFollowing(
      sessionUserFollowing.findIndex(
        (follow) => follow.id === users?.userId
      ) !== -1
    );
  }, [sessionUserFollowing]);

  return (
    <div>
      <Header />
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {/* <!-- profile image --> */}
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                       border-2 border-pink-600 p-1"
                src={users?.profileImg}
                alt="profile"
              />
            </div>

            {/* <!-- profile meta --> */}
            <div className="w-8/12 md:w-7/12 ml-8">
              <div className="flex flex-wrap items-center mb-2">
                <div className="mr-10 mb-5 flex flex-col ">
                  <h2 className="text-3xl font-light sm:mb-0">
                    {users?.name}
                  </h2>
                  <h3 className="text-sm text-gray-400 ">@{users?.username}</h3>
                </div>

                {/* <!-- follow button --> */}
                {users.username !== session.username && (
                  <div>
                    {!isFollowing ? (
                      <button
                        className="bg-blue-500 px-2 py-1 
                           text-white font-semibold text-sm rounded block text-center 
                           sm:inline-block"
                        onClick={followUser}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 px-2 py-1 
                          text-white font-semibold text-sm rounded block text-center 
                          sm:inline-block"
                        onClick={followUser}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* <!-- post, following, followers list for medium screens --> */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold mr-1">{postCount}</span>
                  posts
                </li>

                <li>
                  <span className="font-semibold mr-1">
                    {currentUserFollowers.length}
                  </span>
                  followers
                </li>
                <li>
                  <span className="font-semibold mr-1">
                    {curentUserFollowing.length}
                  </span>
                  following
                </li>
              </ul>

              {/* <!-- user meta form medium screens --> */}
              <div className="hidden md:block">
                <h1 className="font-semibold">Mr Travlerrr...</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>

            {/* <!-- user meta form small screens --> */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          {/* <!-- posts --> */}
          <div className="px-px md:px-3">
            {/* <!-- user following for mobile only --> */}
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
                  text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">{postCount}</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">
                  {currentUserFollowers.length}
                </span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">
                  {curentUserFollowing.length}
                </span>
                following
              </li>
            </ul>

            {/* <!-- insta freatures --> */}
            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
                      uppercase tracking-widest font-semibold text-xs text-gray-600
                      border-t"
            >
              {/* <!-- posts tab is active --> */}
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="#">
                  <i className="far fa-square text-xl md:text-xs"></i>
                  <span className="hidden md:inline">igtv</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="#">
                  
                  <span className="hidden md:inline">tagged</span>
                </a>
              </li>
            </ul>
            {/* <!-- flexbox grid --> */}
            <Posts username={users?.username} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
