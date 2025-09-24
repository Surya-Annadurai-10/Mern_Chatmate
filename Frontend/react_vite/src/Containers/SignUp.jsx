import  { useRef, useState } from "react";
import leftimg from "../../public/vc.png";
import { ShipWheelIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {  useQueryClient } from "@tanstack/react-query";


import { useSignUpUser } from "../hooks/useSignUpUser";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const checkBoxRef = useRef(null);
  const queryClient = useQueryClient();
  let fetchData = async (value) => {
    console.log(value, "value");
    // const res = await axios.post("http://localhost:8080/api/auth/signup", value,{credentials: "include"})

    // const res = await fetch("http://localhost:8080/api/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(value),
    //   credentials: "include",
    // });
    // const data = await res.json();
    // console.log(res.data, "SignUp res");
  };

  const {mutate : mutateSignUp , isPending , error} = useSignUpUser( )

  const handleSubmit = (e) => {
    e.preventDefault();

    //  if(!formData.username || !formData.email || !formData.password ){
    //   console.log("Error");

    //   toast.error("Enter details in all fields!")
    //   return;
    // }

    if (!checkBoxRef.current.checked) {
      console.log("Error");

      toast.error("Accept terms and condition to proceed further!");
      return;
    }
    console.log(checkBoxRef.current.checked, "value");

    console.log(formData, "formdata");
     let result =  mutateSignUp(formData);
     console.log(result , "result of mutation");
     
    // fetchData(formData);
  };

  return (
    <>
      <div
      
        className="w-full flex-col h-[100vh] flex items-center justify-center "
      >
        <h1 className="text-4xl font-bold my-4  font-mono ">Sign Up</h1>
        <div className="flex text-gray-200 items-center justify-between  overflow-hidden w-[80%] md:w-[95%] lg:w-[60%] h-[70vh] border border-gray-700  rounded-4xl">
          {/* Signup Left side */}
          <form
            onSubmit={handleSubmit}
            className="md:w-[50%] w-full lg:px-10 px-7 md:px-10 py-10 flex flex-col items-start justify-between h-[100%] "
          >
            <div className="flex  items-center">
              <ShipWheelIcon className="size-9  mr-3 text-primary" />
              <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider font-mono font-semibold">
                Streamify
              </h1>
            </div>
            <div>
              <h1 className="text-md font-semibold text-white">
                Create an Account
              </h1>
              <p className="text-sm text-gray-400">
                Join Langconnect and start your language learning journey.
              </p>
            </div>
           {/* Error section */}
           {
            error && <div className="alert alert-error  my-3">
              <span>{error.response.data.message}</span>
           </div>
           }
            <div className="w-full flex flex-col gap-1 items-start h-[15%] ">
              <label htmlFor="fullName">Full Name</label>
              <input
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                value={formData.username}
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full Name"
                className="input   w-full rounded-full h-[60px]"
              />
              {/* <input  className='w-full rounded-full h-[70%] border border-gray-600' type="text" name='fullName' id="fullName" /> */}
            </div>
            <div className="w-full  flex flex-col gap-1 items-start h-[15%]  ">
              <label htmlFor="email">Email</label>
              <input
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                name="email"
                value={formData.email}
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
                    setFormData({ ...formData, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  value={formData.password}
                  type="password"
                  placeholder="******"
                  className="input  w-full rounded-full h-[40px]"
                />
                {/* <input className='w-full rounded-full h-[70%] border border-gray-600' type="password" name='password' id="password" /> */}
              </div>
              <p className="text-sm text-gray-400">
                Password must be atleast 6 characters long.
              </p>
            </div>

            <div className="flex items-center justify-start gap-2">
              <input ref={checkBoxRef} type="checkbox" id="check" name="check" className="checkbox" />
              <label className="text-sm text-gray-400" htmlFor="check">
                I agree to the{" "}
                <a className="text-primary hover:underline" href="">
                  terms of service
                </a>{" "}
                and{" "}
                <a className="text-primary hover:underline" href="">
                  privacy policy
                </a>
              </label>
            </div>
            <button
              // onClick={}

              className="btn w-full text-[14px] rounded-full h-[11%]  btn-primary " type="submit"
            >
              {" "}
              {isPending ? <div>
                <span className="loading loading-spinner"></span>
                <span className="ml-2">Signing in...</span>
              </div>: "Create Account"}
            </button>

            <p className="text-center text-gray-400 text-sm w-full">
              Already have an account?{" "}
              <Link className={"text-primary hover:underline"} to={"/login"}>
                Sign in
              </Link>
            </p>
          </form>
          {/* Signup Right side */}
          <div className="w-[50%] p-15 md:flex hidden lg:flex justify-center items-center  flex-col bg-primary/10  h-[100%] ">
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
};

export default SignUp;
