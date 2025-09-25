import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useState } from "react";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,

  useCallStateHooks,

} from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { getStreamClientTokenFn } from "../lib/apiCalls";

const CallPage = () => {
  const { id: callerId } = useParams();
  const { authUser } = useAuthUser();
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [connecting, setConnecting] = useState(true);

  console.log(callerId, "callerId");
  
  const { data: getToken } = useQuery({
    queryKey: ["getStreamClient"],
    queryFn: getStreamClientTokenFn,
    enabled: !!authUser,
  });

  console.log(authUser , getToken , client , call , "authUser , getToken , client , call");

  const callClientApiKey = import.meta.env.VITE_STREAM_CLIENT_API_KEY;
  console.log(callClientApiKey, "callClientApiKey");

  useEffect(() => {
    const initUser = async () => {

       if (!getToken?.token || !authUser || !callerId) return;
      try {
        console.log("Initializing Stream video client...");
        const user = {
          id: authUser.user._id,
          name: authUser.user.username,
          image: authUser.user.profilePicture || undefined,
        };

        const videoClient = new StreamVideoClient({
          callClientApiKey,
          user,
          token: getToken.token,
        });
        const callClient = videoClient.call("default", callerId);
        await callClient.join({ create: true });

        console.log("Joined call successfully");
        setClient(videoClient);
        setCall(callClient);
      } catch (error) {
        console.log("Error while creating a Video call", error);
        toast.error("Error while creating a Video call");
      }finally{
        setConnecting(false);
      }
    };

    initUser();
  }, [authUser, client, call]);
  return<>
   <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  </>;
};


const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
