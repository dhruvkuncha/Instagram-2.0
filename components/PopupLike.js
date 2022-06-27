import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalLikeState } from "../atoms/modalLikeAtom";
import {modalPostState} from '../atoms/modalPostState'
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

const PopupLike = () => {
  const [openLike, setOpenLike] = useRecoilState(modalLikeState);
  const [likes, setLikes] = useState([]);
  const [postId, setPostId] = useRecoilState(modalPostState)
 

  console.log("pop", postId);

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', postId, 'likes'), (snapshot) => {
        snapshot.forEach((doc) => {
          setLikes(snapshot.docs);
        });
      }),
    [db, postId]
  );

  return (
    <Transition.Root show={openLike} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-auto"
        onClose={setOpenLike}
        
        
      >
        <div
          className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 
        pb-40 w-full ml-0 text-center sm:block sm:p-0
        "
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></Dialog.Overlay>
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 traslate-y-4 sm:traslate-y-0 sm:scale-95"
            enterTo="opacity-100 traslate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 traslate-y-0 sm:scale-100"
            leaveTo="opacity-0 traslate-y-4 sm:traslate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
                shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Likes
                    </Dialog.Title>
                    

                    <div className="mt-10">
                      {/* list of likes */}
                      {likes.length > 0 ? (
                        <div className="ml-10 h-30 w-50 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                          {likes.map((like) => (
                            <div
                              key={like.id}
                              className="inline-flex items-center space-x-2 w-60 mb-5"
                            >
                              <img
                                src={like.data().userImage}
                                alt="user-img"
                                className="h-7 rounded-full "
                              />
                              <p className="text-sm">
                                <span className="font-bold">
                                  {like.data().username}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      ): (<p>No Likes yet</p>)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                        px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                        disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={() => setOpenLike(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    
      
  );
};

export default PopupLike;
