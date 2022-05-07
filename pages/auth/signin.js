import {useEffect, useState} from 'react';
import {getProviders, signIn} from "next-auth/react";

export default function SignIn({ providers }){

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h1 className="mt-2 text-2xl sm:text-4xl text-center font-bold">
        Sign in to your account
      </h1>
      {
        Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}