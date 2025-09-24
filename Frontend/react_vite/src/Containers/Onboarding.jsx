import React, { useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { Locate, LocateFixedIcon, LocationEdit, MapPinIcon, ShipWheelIcon, Shuffle, ShuffleIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onBoardingMutation } from "../lib/apiCalls";
import { LANGUAGES } from "../constants";
import toast from "react-hot-toast";

const Onboarding = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();
  console.log(authUser, "authUser");
  const [formData, setFormData] = useState({
    username: authUser.user.username || "",
    email: authUser.user.email || "",
    learningLanguage: authUser.user.learningLanguage || "",
    nativeLanguage: authUser.user.nativeLanguage || "",
    profilePicture: "https://avatar.iran.liara.run/public/78.png",
    location: authUser.user.location || "",
    bio: authUser.user.bio || "",
  });

  const { mutate : mutateOnboarding, isPending, error } = useMutation({
    mutationFn: onBoardingMutation,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully!")
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError : () =>{
      toast.error(error.response.data.message);
    }
  });

  console.log(formData, "formData");
  console.log(error, "error");

  const handleGenerateAvatars = (e) => {
    e.preventDefault()
    const idx = Math.floor(Math.random() * 100) + 1;    
    const profilePic = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormData({
      ...formData,
      profilePicture: profilePic,
    });

  };


  const handleSubmit = (e) =>{
    e.preventDefault();
   mutateOnboarding(formData)
  }

  return (
    <div
     data-theme="forest"
      className="w-full h-screen grid place-items-center"
    >
      <form onSubmit={handleSubmit} className="lg:w-[40%] md:w-[80%] w-[90%] h-[85%] rounded-3xl bg-black p-6">
        <div className="w-[50%] flex items-center gap-2 justify-center flex-col m-auto ">
          <h1 className="md:text-2xl text-xl font-semibold">Complete Your Profile</h1>
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={formData.profilePicture}
            alt="profilePicture"
          />
          <button
            className="btn btn-primary rounded-full"
            onClick={handleGenerateAvatars}
          >
            <Shuffle size={15} />
            Generate Random Avatar
          </button>
        </div>

        {
          error && <>
          <div className="alert alert-error my-3">{error.response.data.message}</div>
          </>
        }

        {/* FULL NAME */}
        <div className="w-full flex flex-col gap-1 items-start h-[15%] ">
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            value={formData.username}
            id="fulName"
            name="fulName"
            type="text"
            placeholder="Full Name"
            className="input   w-full rounded-full h-[40px]"
          />
        </div>

        {/* BIO */}
        <div className="w-full flex flex-col gap-1 items-start h-[15%] ">
          <label htmlFor="bio">Bio</label>
          {/* <textarea className="textarea" > */}
          <textarea
            required
            id="bio"
            name="bio"
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            value={formData.bio}
            // type="text"
            placeholder="Bio"
            className="textarea   w-full rounded-2xl h-[70px]"
          ></textarea>
          {/* <input  className='w-full rounded-full h-[70%] border border-gray-600' type="text" name='fullName' id="fullName" /> */}
        </div>

        {/* LANGUAGE */}
        <div className="flex py-  justify-center items-center gap-2 pt-10 w-full ">
          <div className="w-[50%]">
            <label htmlFor="native">Native Language</label>
            {
              <select 
              value={formData.nativeLanguage}
              onChange={(e) =>{setFormData({...formData,nativeLanguage : e.target.value})}}
              className="select">
                <option >Select your native Language</option>
               {LANGUAGES.map((lang) =>{
                return <option key={lang} value={lang} >{lang}</option>
               })}
              </select>
            }
          </div>
          <div className="w-[50%]">
            <label htmlFor="native">Learning Language</label>
            {
              <select
               value={formData.learningLanguage}
              onChange={(e) =>{setFormData({...formData,learningLanguage : e.target.value})}}
              className="select">
                <option >Select language you're learning</option>
               {LANGUAGES.map((lang) =>{
                return <option key={lang} value={lang} >{lang}</option>
               })}
              </select>
            }
          </div>
        </div>

        {/* LOCATION */}
        <div className="w-full flex flex-col gap-1 items-start pt-7 ">
          <label htmlFor="location">Location</label>
          <div className="relative w-full">
            <MapPinIcon size="20" className="absolute z-10 text-[#6D6970] left-4 top-3" />
            <input
            required
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            value={formData.location}
            id="location"
            name="location"
            type="text"
            placeholder="City Name"
            className="input   w-full rounded-full pl-10 h-[40px]"
          />
          </div>
        </div>

        {/* COMPLETE BUTTON */}
        < button className="btn w-full mt-7  btn-primary flex items-center justify-center gap-3 btn-accent rounded-full ">
       {
        isPending ? <>
         <span className="loading loading-spinner"></span>
        <span>Onboarding...</span></> : <>
         <ShipWheelIcon/>
        <span>Complete Onboarding</span>
        </>
       }
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
