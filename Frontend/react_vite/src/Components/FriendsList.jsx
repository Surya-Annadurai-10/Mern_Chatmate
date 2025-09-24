import React from "react";
import { LANGUAGE_TO_FLAG } from "../constants";
import { LocateIcon, LocateOff, LocationEdit, MapPinIcon, User2Icon, UserPlus, Users2, Users2Icon } from "lucide-react";

const FriendsList = (props) => {
  console.log(props, "props");
  console.log(props.recommended, "props.recommended");

  return (
    <div className=" my-4">
      <div className="flex mb-5  items-center justify-start gap-4">
        <div className="w-[40px] h-[40px] rounded-full">
          <img src={props.profilePicture} alt={props.profilePicture} />
        </div>
        <div>
          <h1 className="text-md capitalize ">{props.username}</h1>
        {props.recommended ? 
        <>
       <div className="flex items-center justify-start gap-2">
        <MapPinIcon size={"20"} />
        <p>{props.location}</p>
       </div>
        </>
        : null}
        </div>
      </div>
      <div className="flex mb-5 items-center justify-start gap-2">
        <div className="flex text-sm px-3 py-1  rounded-full bg-primary badge badge-secondary items-center justify-center gap-1">
          <span>{getFlag(props.nativeLanguage)}</span>
          <p className="text-black capitalize">
            Native : {props.nativeLanguage}
          </p>
        </div>
        <div className="flex border text-sm badge badge-outline px-3 py-1 rounded-full items-center justify-center gap-1">
          <span>{getFlag(props.learningLanguage)}</span>
          <p className="capitalize">Learning : {props.learningLanguage}</p>
        </div>
      </div>
      
      
      {props.recommended ? (
        <>
        <p className="line-clamp-1 mb-5">{props.bio}</p>
          <button className="w-full border hover:border-white/100 border-primary/0 flex items-center justify-center gap-2 p-4 py-3 my-2 hover:bg-primary/0 hover:text-white hover:border cursor-pointer bg-primary text-black rounded-full">
            <UserPlus size={15} />
            <p>Send Friend Requests</p>
          </button>
        </>
      ) : (
        <>
          <button className="w-full p-4 py-3 my-2 border cursor-pointer hover:bg-primary hover:text-black rounded-full">
            Message
          </button>
        </>
      )}
    </div>
  );
};

export default FriendsList;

export const getFlag = (value) => {
  const lower = value.toLowerCase();
  console.log(lower, "lower");
  const flagCode = LANGUAGE_TO_FLAG[lower];

  if (flagCode) {
    return (
      <img
        className="h-3 mr-1 inline-block"
        alt={`${lower} flag`}
        src={`https://flagcdn.com/24x18/${flagCode}.png`}
      />
    );
  }
};
