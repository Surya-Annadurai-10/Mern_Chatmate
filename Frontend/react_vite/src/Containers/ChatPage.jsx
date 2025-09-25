import React, { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { get } from 'mongoose';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { getStreamClientTokenFn } from "../lib/apiCalls";
import toast, { ToastBar } from "react-hot-toast";
import NavBar from "./NavBar";
import { useThemeStore } from "../store/useThemeStore";
import CallButton from "../Components/CallButton";

const ChatPage = () => {
  const {theme} = useThemeStore() 
  const { id: targetId } = useParams();
  console.log(targetId, "targetId");

  const { authUser } = useAuthUser();
  console.log(authUser, "authUser in chat----------------------------");
  
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: getToken } = useQuery({
    queryKey: ["getStreamClient"],
    queryFn: getStreamClientTokenFn,
    enabled :!!authUser,
  });

  const streamApiKey = import.meta.env.VITE_STREAM_CLIENT_API_KEY;
  console.log(streamApiKey , "StreamKey");
  
  useEffect(() => {
    const initChat = async () => {
      if (!authUser || !getToken) return;

       try {
        console.log("Initializing the Chat channel....");
        
        const client = StreamChat.getInstance(streamApiKey);
        await client.connectUser(
          {
            id: authUser.user._id,
            name: authUser.user.username,
            image: authUser.user.profilePicture || undefined,
          },
          getToken.token
        );

        console.log(authUser.user._id , targetId , "User and Target ID");
        
        const channelId = [authUser.user._id, targetId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          // add as many custom fields as you'd like
          members: [authUser.user._id, targetId],
        });

        await currChannel.watch();
        setChannel(currChannel);
        setChatClient(client);
        console.log("Chat channel is ready");
       } catch (error) {
        console.log("Error in chat setup", error.message);
        toast.error("Error in setting up chat");
        
       }finally{
        setLoading(false);
       }
    }

    initChat();
  }, [authUser, getToken,targetId]);

    console.log(loading,chatClient,channel ,"loading chat channel");
  

  console.log(getToken, "getToken");

  const handleVideoCall = () =>{ 
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      // const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
   }


  if (loading || !chatClient || !channel) {
    return <div>Loading Chat...</div>;
  }


  return <div  data-theme={theme} className="w-full h-[90vh]">
    <NavBar />
      <Chat client={chatClient}>
     
      <Channel channel={channel} key={channel.id}>
        <div className="w-full relative">
          <CallButton handleVideoCall= {handleVideoCall} />
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput focus />
        </Window>
        <Thread />
        </div>
      </Channel>
    </Chat>
  </div>;


};

export default ChatPage;
