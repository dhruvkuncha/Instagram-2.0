import React, { useState, useEffect } from "react";
import Post from "./Post";
import { onSnapshot, collection } from "@firebase/firestore";
import { CollectionIcon } from "@heroicons/react/outline";
import { db } from "../firebase";
import { query, orderBy, docs } from "@firebase/firestore";

const Posts = () => {
  

  const [posts, setPosts] = useState([]);

  

  useEffect(
    () =>
    
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          snapshot.forEach((doc) => {
            setPosts(snapshot.docs);
            
          })          
        }
      ),[db]);

  // console.log(posts)




  return (
    <div>
      {posts.map((post) => (
            <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} 
            img={post.data().image} caption={post.data().caption}
            />
        ))}
    </div>
  );
};

export default Posts;
