import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const { faker } = require("@faker-js/faker");
  const createRandomUser = () => {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  };

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(4)].map((_, i) => ({
      ...createRandomUser(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="card bg-white shadow-lg rounded-2xl flex mb-5 m-10 w-full">
      <div className="flex-1 mr-5 ml-0">
        <div className="mt-4 ml-10">
          <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-400">
              Suggestions for you
            </h3>
            <button className="text-gray-600 font-semibold">See all</button>
          </div>
          {suggestions.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between mt-3"
            >
              <img
                src={profile.avatar}
                alt="profile-pic"
                className="w-10 h-10 rounded-full border p-[2px]"
              />
              <div className="flex-1 ml-4">
                <h2>{profile.username}</h2>
              </div>
              <button className="text-blue-400 text-sm font-bold">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
