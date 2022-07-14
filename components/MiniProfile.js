import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";



const MiniProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [signed, setSigned] = useState([]);

  

  useEffect(() => {
    async function handleSignIn() {
      await getDoc(doc(db, "users", session?.user.uid)).then((doc) => {
        setSigned(doc.data());
      });

      // const q = await getDocs(collection(db, "users"));

 

      if (!signed?.length) {
        await setDoc(doc(db, "users", session.user.uid), {
          username: session.user.username,
          userId: session.user.uid,
          email: session.user.email,
          name: session.user.name,
          profileImg: session.user.image,
          created: serverTimestamp(),
        });
      }
    }
    handleSignIn();
  }, [db]);

  



  return (
    <div className="card bg-white shadow-lg rounded-2xl flex mt-14 m-10">
      <div className="m-10 flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src={session?.user.image}
            alt="user-img"
            className="rounded-full border p-[2px] w-40 mb-10 cursor-pointer duration-300 ease-out hover:scale-110"
            onClick={() => router.push(`/${session.user.username}`)}
          />
        </div>

        <div className="flex flex-col mx-4 items-center justify-center">
          <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
            {session?.user.name}
          </h2>
          <h3 className="text-sm text-gray-400 cursor-pointer" onClick={() => router.push(`/${session.user.username}`)}>@{session?.user.username}</h3>
          <div className="flex items-center justify-between mt-3 space-x-2">
            <div className="flex">
              <span className="mr-1 font-semibold">55 </span> Post
            </div>
            <div className="flex">
              <span className="mr-1 font-semibold">10k </span> Followers
            </div>
            <div className="flex">
              <span className="mr-1 font-semibold">20</span> Following
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-7">
          <button
            onClick={signOut}
            type="button"
            className="text-blue-400 text-sm font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
