import React, {useEffect, useRef} from "react";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

const Footer = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();

  const myRef = useRef(null)
  


  return (
    <>
      <footer className="fixed bg-white w-full bottom-0 pb-4 pt-2 lg:hidden md:hidden">
        <div className="flex flex-col justify-between  max-w-6xl mx-5">
          <div className="flex justify-evenly space-x-32 ">
            <HomeIcon
              className="navBtn-mobile"
              onClick={() => {
                router.push("/")
                
                
              }}
            />

            <PlusCircleIcon
              className="navBtn-mobile"
              onClick={() => setOpen(true) }
            />

            <HeartIcon className="navBtn-mobile" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
