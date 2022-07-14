import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import {useSession, signOut} from 'next-auth/react'
import PopupLike from "./PopupLike";
import FirebaseWrite from "./FirebaseWrite";


const Feed = () => {

  const {data : session} = useSession();
  // console.log('userdata', session?.user)

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
      {/* Left Section */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
{session?.user &&(
      <>

      {/* Right Section */}
      <section className="hidden xl:inline-grid md:col-span-1 ">

        <div className="fixed top-10">

        

        <MiniProfile />
        {/* Suggestions */}
        <Suggestions />
        </div>
        {/* Mini Profile */}
      </section>
      {/* <PopupLike /> */}
      
      
      </>
      
)}
    </main>
  );
};

export default Feed;
