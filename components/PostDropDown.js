import React, { useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { addDoc, serverTimestamp, collection, updateDoc, doc, deleteDoc } from "@firebase/firestore";
import {db, storage} from '../firebase'
import {useSession} from 'next-auth/react'


const PostDropDown = ({id}) => {

    
      const deletePost = async () => {
        
        await deleteDoc(doc(db, "posts", id));
    }   
        

  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        
        type="button"
      >
        <DotsHorizontalIcon className="h-5" />
      </Menu.Button>

      <Menu.Items
        id="dropdown"
        className="z-10 bg-white divide-y divide-gray-100 rounded shadow-xl w-44"
      >
        <Menu.Item>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-red-500 hover:text-white"
              onClick={deletePost}
            >
                
              Delete Post
            </a>
           
            </Menu.Item>

         <Menu.Item>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-red-500 hover:text-white"
            >
              Settings
            </a>
        </Menu.Item>
         
        <Menu.Item>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-red-500 hover:text-white"
            >
              Earnings
            </a>
        </Menu.Item>

        <Menu.Item>  
            <a
              href="#"
              className="block px-4 py-2 hover:bg-red-500 hover:text-white"
            >
              Sign out
            </a>
        </Menu.Item>
          
      </Menu.Items>
    </Menu>
    
  );
};

export default PostDropDown;
