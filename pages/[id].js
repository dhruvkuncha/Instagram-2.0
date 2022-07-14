import React, { useEffect, useState } from "react";
import { db } from "../firebase";
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
import Header from "../components/Header";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import UserProfile from "../components/UserProfile";

const UserDetail = ({ user }) => {
  const router = useRouter();
 
  const [routerId, setRouterId] = useState([])
  const [users, setUsers] = useState([]); // users => user profile currently on display

  useEffect(() => {
    const { id } = router.query;
    if(id){
      setRouterId(id)
    }
  })

  useEffect(() => {
  
    async function getUser() {
      const q = query(collection(db, "users"), where("username", "==", routerId));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUsers(doc.data());
      });
    }

    getUser();
  }, [routerId]);

  // console.log("hello", users);

  if(users.length === 0){
    return <p>Loading...</p>
  }


  return (
    <div>
      
      <UserProfile session={user} users={users} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: {},
    };
  }
  const { user } = session;
  return {
    props: { user },
  };
}

export default UserDetail;
