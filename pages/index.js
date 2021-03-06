import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Feed from "../components/Feed";
import FirebaseWrite from '../components/FirebaseWrite'
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  getDoc,
} from "@firebase/firestore";
import PopupLike from "../components/PopupLike";
import { async } from "@firebase/util";
// import {handleSignIn} from '../components/FirebaseWrite'

export default function Home() {
  

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PopupLike />
      <Header />
      {/* Body */}
      <Feed />
      <Modal />

      {/* Footer containing Icons */}
      {/* <Footer /> */}
      <Footer />
      {/* <FirebaseWrite /> */}
    </div>
  );
}
