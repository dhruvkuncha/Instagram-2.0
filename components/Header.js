import React, {useEffect, useState} from "react";
import Image from "next/dist/client/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
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
import { db } from "../firebase";
// import { Search, Grid } from 'semantic-ui-react'
import { HomeIcon } from "@heroicons/react/solid";
import {useSession, signOut, signIn} from 'next-auth/react'
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import {useRecoilState} from 'recoil'
import Search from "./Search";



const Header = () => {

  const {data: session} = useSession()

  const [open, setOpen] = useRecoilState(modalState)
  const [users, setUsers] = useState([])
  

  const router = useRouter();
  
  useEffect(() => {
    onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          setUsers(snapshot.docs);
          // console.log('user', session?.uid)
        });
      }
    );
  }, [db]);



// console.log(filterUsers)


  

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
            {/* Logo */}
            <div onClick={() => router.push('/')} className=" relative w-24 cursor-pointer flex-shrink-0">
                <Image
                    src="https://links.papareact.com/ocw"
                    layout="fill"
                    objectFit="contain"
                />
             </div>

        {/* Search */}
         
    <Search users={users}/>
     

        {/* Icons */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push('/')}/>
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-1 -right-3 text-xs w-5 h-5 bg-red-500 rounded-md flex items-center justify-center text-white">
              3
            </div>
          </div>
          <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            src={session.user?.image}
            alt="profile-pic"
            className="h-10 rounded-full cursor-pointer hover:scale-125 ease-in-out"
            onClick={signOut}
          />
          </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
