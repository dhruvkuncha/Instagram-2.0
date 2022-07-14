import React, { useState, useEffect } from "react";
import Post from "./Post";
import { onSnapshot, collection } from "@firebase/firestore";
import { CollectionIcon } from "@heroicons/react/outline";
import { db } from "../firebase";
import { query, orderBy, docs } from "@firebase/firestore";
import { useRecoilState } from "recoil";
import { modalPostCount } from "../atoms/modalPostCount";

const Posts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useRecoilState(modalPostCount)

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        snapshot.forEach((doc) => {
          setPosts(snapshot.docs);
        });
      }
    );
  }, [db]);

  if (username) {

    setPostCount(posts
      .filter((post) => post.data().username === username).length)
    
 
      return (
        <div>
          {posts
            .filter((post) => post.data().username === username)
            .map((post) => (
              <Post
                key={post.id}
                id={post.id}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().image}
                caption={post.data().caption}
              />
            ))}
        </div>
      );
  }


  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
