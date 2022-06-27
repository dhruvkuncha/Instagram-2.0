import React from "react";
import { getProviders, signIn as SignInProvider } from "next-auth/react";
import Header from "../../components/Header";

const signIn = ({ providers }) => (
  <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
      <img src="https://links.papareact.com/ocw" alt="Logo" className="w-80" />
      <p className="font-xs italic">Welcome to Instagram 2.0 </p>
      <div className="mt-20">
        <button
          className="p-3 bg-blue-500 rounded-lg text-white"
          onClick={() =>
            SignInProvider("google", {
              callbackUrl:
                "https://instagram-2-0-beryl.vercel.app/api/auth/callback/google",
            })
          }
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </>
);

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;
