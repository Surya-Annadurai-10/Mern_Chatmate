import React, { useState } from 'react'
import { useAuthUser } from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../lib/apiCalls';
import {  ShipWheelIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import leftimg from "../../public/vc.png"
import { Link } from 'react-router-dom';

const Login = () => {
  // const {isLoading , authData} = useAuthUser();
  const [loginFormData , setLoginFormData] = useState({
    email :"",
    password : ""
  })

  console.log(loginFormData , "loginFormData");
  
  const queryClient = useQueryClient();
  const {mutate :loginMutateFn, isPending , error} = useMutation({
    mutationFn : loginUser,
    onSuccess : () => queryClient.invalidateQueries({queryKey :["auth"]})
  })

  const handleLogin = (e) =>{
    e.preventDefault();
    loginMutateFn(loginFormData);
  }
   return (
    <>
      <div
        
        className="w-full flex-col h-[100vh] flex items-center justify-center "
      >
        <h1 className="text-4xl font-bold my-4  font-mono ">Sign in</h1>
        <div className="flex text-gray-200 items-center justify-between  overflow-hidden w-[80%] md:w-[95%] lg:w-[60%] h-[70vh] border border-gray-700  rounded-4xl">
          {/* Signup Left side */}
          <form
            onSubmit={handleLogin}
            className="md:w-[50%] w-full lg:px-10 px-7 md:px-10 py-10 flex flex-col items-start justify-between h-[100%] "
          >
            <div className="flex  items-center">
              <ShipWheelIcon className="size-9  mr-3 text-[#1fb854]" />
              <h1 className="text-3xl text-[#1fb854] font-mono font-semibold">
                Streamify
              </h1>
            </div>
            <div>
              <h1 className="text-md font-semibold text-white">
                Welcome back
              </h1>
              <p className="text-sm text-gray-400">
                Sign in to your account to continue your language journey.
              </p>
            </div>
           {/* Error section */}
           {
            error && <div className="alert alert-error my-3">
              <span>{error.response.data.message}</span>
           </div>
           }
         
            <div className="w-full  flex flex-col gap-1 items-start h-[15%]  ">
              <label htmlFor="email">Email</label>
              <input
                required
                onChange={(e) =>
                  setLoginFormData({ ...loginFormData, email: e.target.value })
                }
                id="email"
                name="email"
                value={loginFormData.email}
                type="text"
                placeholder="Email"
                className="input w-full rounded-full h-[60px]"
              />
              {/* <input className='w-full rounded-full h-[70%] border border-gray-600' type="email" name='email' id="email" /> */}
            </div>
            <div className="w-full flex flex-col gap-2items-start h-[20%] ">
              <div className="w-full h-full">
                <label htmlFor="password">Password</label>
                <input
                  required
                  onChange={(e) =>
                    setLoginFormData({ ...loginFormData, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  value={loginFormData.password}
                  type="password"
                  placeholder="*******"
                  className="input  w-full rounded-full h-[40px]"
                />
                {/* <input className='w-full rounded-full h-[70%] border border-gray-600' type="password" name='password' id="password" /> */}
              </div>
              <p className="text-sm text-gray-400">
                Password must be atleast 6 characters long.
              </p>
            </div>
            <button
              // onClick={}

              className="btn w-full text-[14px] rounded-full h-[11%] text-black bg-[#1fb854]"
            >
              {" "}
              {isPending ? <div>
                <span className="loading loading-spinner"></span>
                <span className="ml-2">Logging...</span>
              </div>: "Sign in"}
            </button>

            <p className="text-center text-gray-400 text-sm w-full">
             Don't have an account?{" "}
              <Link className={"text-[#1fb854] hover:underline"} to={"/signup"}>
                Create one
              </Link>
            </p>
          </form>
          {/* Signup Right side */}
          <div className="w-[50%] p-15 md:flex hidden lg:flex justify-center items-center  flex-col bg-[#1fb85528] h-[100%] ">
            <div className="w-[100%]  h-[100%] m-auto">
              <img className="w-full h-full" src={leftimg} alt="" />
            </div>

            <div className="w-[80%]   flex flex-col items-center justify-center ">
              <h1 className="text-xl font-semibold text-center ">
                Connect with language partners worldwide
              </h1>
              <p className="= text-gray-400 text-center text-sm ">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Login