import React, { useState } from "react";

import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const Search = ({ users }) => {
  // const [filterUsers, setFilterUsers] = useState([])

  // const handleFilter = (event) => {
  //     const searchWord = event.target.value;
  //     const newFilter = users.filter((value) => {
  //       const name = value.data().name.toLowerCase()
  //       return name.includes(searchWord.toLowerCase())
  //     })
  //     setFilterUsers(newFilter)

  //   }
  // //   console.log(filterUsers)

  const [value, setValue] = useState("");
  const router = useRouter();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);

    console.log("search ", searchTerm);
  };
  console.log(users);
  return (
    <>
      <div className="relative mt-1 p-3 rounded-md max-w-xs flex flex-col">
        <div className="">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            className="bg-gray-50 block w-full pl-10 sm:text-sm rounded-md focus:ring-black focus:border-black border-gray-300"
            type="search"
            placeholder="Search"
            value={value}
            onChange={onChange}
          />
          <div className="w-full absolute overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
            <div className="bg-white flex flex-col border shadow-md empty:border-none mt-3 mr-5 rounded-md">
              {users
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const fullName = item.data().name.toLowerCase();

                  return (
                    searchTerm &&
                    fullName.includes(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <div
                    onClick={() => onSearch(item.data().name)}
                    className="cursor-pointer text-start hover:bg-gray-100 hover:rounded-md"
                    key={item.data().name}
                  >
                    <div
                      className="flex items-center gap-3 m-2"
                      onClick={() => router.push(`/${item.data().username}`)}
                    >
                      <img
                        src={item.data().profileImg}
                        className="w-10 h-10 rounded-full border-red-500 border-2 object-contain"
                      />
                      <div className="flex flex-col w-full">
                        <span className="font-light text-gray-900">{item.data().name}</span>
                        <span className="text-sm text-gray-400 ">@{item.data().username}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
