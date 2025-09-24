import {
  BellIcon,
  LogOutIcon,
  PaintBucket,
  PaintBucketIcon,
  Palette,
  ShipWheelIcon,
} from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../lib/apiCalls";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const NavBar = () => {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const {theme , setTheme} = useThemeStore();
  const {
    mutate: logOutMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const handleLogout = (e) => {
    // e.preventDefault();
    logOutMutate();
    localStorage.removeItem("theme");
  };

  return (
    <div className="w-[100%] sticky right-0  top-0 z-50 backdrop-blur-2xl shadow-2xl px-10 h-[7vh] flex items-center justify-between">
      <div className="flex  items-center">
        {isChatPage && (
          <>
            <ShipWheelIcon className="size-9  mr-3 text-primary" />
            <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider  font-mono font-semibold">
              Streamify
            </h1>
          </>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <button className=" btn btn-ghost btn-circle">
          <BellIcon size="20" />
        </button>

        <div className="dropdown dropdown-end  ">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <Palette size="20" />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto"
          >
            {THEMES.map((themes) => {
              return (
              
                  <button 
                  key={themes.label}
                  onClick={() => setTheme(themes.name)}
                  className=" w-full cursor-pointer hover:bg-primary/10 px-4 py-3 rounded-xl flex items-center gap-3 transition-colors">
                    {" "}
                    <span className="w-[25%] flex items-center justify-center">
                      <Palette size="15" />
                    </span>
                   <div className="w-[75%]  flex items-center justify-between">
                    <span>{themes.label}</span>
                    <div className="flex items-center gap-1 justify-center">
                      {themes.colors.map((col) => {
                        return (
                          <div
                            style={{ backgroundColor: col }}
                            className={` w-[8px] rounded-full h-[8px]`}
                          ></div>
                        );
                      })}
                    </div>
                   </div>
                  </button>
               
              );
            })}
          </div>
        </div>
        {/* <button className=" w-[50px] h-[50px] grid place-items-center cursor-pointer rounded-full hover:bg-[#8080804a]">
         
        </button> */}
        <div>
          <img
            className="w-[35px] h-[35px]"
            src={authUser.user.profilePicture}
            alt=""
          />
        </div>
        <button
          onClick={() => handleLogout()}
          className=" btn btn-ghost btn-circle"
        >
          <LogOutIcon size="20" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
