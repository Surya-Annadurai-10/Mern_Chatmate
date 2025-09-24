import {
  Bell,
  BellDot,
  BellElectricIcon,
  BellIcon,
  Dot,
  DotIcon,
  EggFriedIcon,
  Home,
  ShipWheelIcon,
  Users2,
  Users2Icon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

const SideBar = () => {
  const { authUser } = useAuthUser();
  console.log(authUser, "AuthUser");

  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div
      // data-theme="coffee"
      className="min-h-[100vh] bg-primary/5 shadow-2xl relative  flex items-center justify-start flex-col gap-4 w-[15%] \"
    >
      <div className="flex mt-5  justify-center w-full">
        <ShipWheelIcon className="size-9  mr-3 text-primary" />
        <h1 className="text-2xl  bg-clip-text tracking-wider  text-transparent bg-gradient-to-r from-primary to-secondary font-mono font-semibold">
          Streamify
        </h1>
      </div>
      <div className="w-[100%] flex items-start justify-center gap-3 flex-col">
        <Link
          className={`w-[90%] ${
            currentPath == "/" ? "bg-primary/30" : ""
          }  px-3 py-2 flex gap-2 text-base-content opacity-70 hover:bg-primary/10   rounded-full `}
          to={"/"}
        >
          <Home size="20" />
          <span>Home</span>
        </Link>
        <Link
          className={`w-[90%] ${
            currentPath == "/friends" ? "bg-primary/30 " : ""
          }  px-3 py-2 flex gap-2 text-base-content opacity-70 hover:bg-primary/10   rounded-full `}
          to={"/friends"}
        >
          {" "}
          <Users2  size="20"/>
          <span>Friends</span>
        </Link>
        <Link
          className={`w-[90%] ${
            currentPath == "/notification" ? "bg-primary/30 " : ""
          }  px-3 py-2 flex gap-2 text-base-content opacity-70  hover:bg-primary/10   rounded-full `}
          to={"/notification"}
        >
          <BellIcon  size="20" />
          <span>Notification</span>
        </Link>
      </div>
      <div className=" flex gap-2 absolute left-5 bottom-10 ]">
        <div>
          <img
            className="w-[35px]"
            src={authUser.user.profilePicture}
            alt="profilepicture"
          />
        </div>
        <div>
          <h1 className="text-md capitalize">{authUser.user.username}</h1>
          <div className="flex items-center justify-start gap-1">
            <div className="bg-success w-[5px] h-[5px] rounded-full" />
            <p className="text-xs text-success ">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
