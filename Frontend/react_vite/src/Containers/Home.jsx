import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <ul data-theme="cyberpunk" className='flex w-full h-[10vh] bg-red-400 text-black font-bold text-2xl justify-around items-center'>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/notification"}>Notification</Link>
        <Link to={"/chat"}>Chat</Link>
        <Link to={"/call"}>Call</Link>
        <Link to={"/onboarding"}>Onboarding</Link>
      </ul>

<Toaster />
      <button onClick={() => toast.success('Here is your toast.')}>Toaster</button>
    </div>
  )
}

export default Home