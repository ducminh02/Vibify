'use client'
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()

  console.log(session)

  if (session) {
    return (
      <div className='p-6'>
        <p className='text-white font-normal text-xl mt-5 mb-2'>Signed In as</p>
        <span className='bold-txt'>{session?.user?.name}</span>
        <p className='opacity-70 mt-8 mb-5 underline cursor-pointer' onClick={() => signOut()}>Sign Out</p>
      </div>
    )
  } else {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">
          Personalize Your Music Experience
        </h1>
  
        <button
          onClick={() => signIn("spotify")}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
        >
          Log in with Spotify
        </button>
      </div>
    );
  }

}
