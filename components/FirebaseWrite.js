import React, { useState, useEffect } from "react";
import "@firebase/firestore";
import firebase from "firebase/app";
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

const FirebaseWrite = () => {
  const { data: session } = useSession();
  const handleSignIn = async () => {
    // const { data: session } = useSession();
    // const [signed, setSigned] = useState([]);
    const usersRef = doc(db, "users", session?.user.uid);
    await getDoc(usersRef).then((doc) => {
      setSigned(doc.data());
    });


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
  };
  return <button className="w-20 h-20 bg-red-500" onClick={handleSignIn}>Click Me</button>
};

export default FirebaseWrite;
