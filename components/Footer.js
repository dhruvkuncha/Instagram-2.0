import React from 'react'

import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
  } from "@heroicons/react/outline";

  import { HomeIcon } from "@heroicons/react/solid";

const Footer = () => {
  return (
    <>
    <footer className="fixed bottom-5">
        <div className='flex flex-col justify-between bg-white max-w-6xl mx-5 lg:hidden'>
        <div className="flex items-center justify-between space-x-24 ">
          <HomeIcon className="navBtn" />
          <PaperAirplaneIcon className="navBtn-mobile"/>
          <PlusCircleIcon className="navBtn-mobile"/>
          <UserGroupIcon className="navBtn-mobile" />
          <HeartIcon className="navBtn-mobile" />
        </div>
        </div>
    </footer>
    </>
  )
}

export default Footer