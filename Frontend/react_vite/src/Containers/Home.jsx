import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  getFriends,
  getOutgoingFriendRequests,
  getRecommendedFriends,
  sendFriendRequest,
} from "../lib/apiCalls";
import { Loader, User2Icon, Users2 } from "lucide-react";
import FriendsList from "../Components/FriendsList";
import NoFriends from "../Components/NoFriends";

const Home = () => {
  const queryClient = useQueryClient();
  const [OutgoingFriendReqsIDs, setOutgoingFriendReqsIDs] = useState(new Set());
  const { data: friendsObj = { friends: [] }, isLoading: getFriendsLoading } =
    useQuery({
      queryKey: ["friends"],
      queryFn: getFriends,
    });

  const { data: recommendedFriends, isLoading: recommendedFriendsLoading } =
    useQuery({
      queryKey: ["recommendedFriends"],
      queryFn: getRecommendedFriends,
    });

  const { data: outgoingFriendRequests } = useQuery({
    queryKey: ["outgoing-requests"],
    queryFn: getOutgoingFriendRequests,
  });
        console.log(outgoingFriendRequests , "outgoingFriendRequests");

  const { mutate: sendRequestsMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] }),
  });

  useEffect(() => {
    const outgoingIDs = new Set();
    if (outgoingFriendRequests?.data && outgoingFriendRequests?.data.length > 0) {
      outgoingFriendRequests.data.forEach((req) => {
        outgoingIDs.add(req.recipient._id);
        console.log("INSIDE USEEFFECT HOME");
        
        console.log(req.recipient._id , "req.recipient._id");
        
      });
      setOutgoingFriendReqsIDs(outgoingIDs);
    }
  }, [outgoingFriendRequests]);

  console.log(friendsObj, "Friends");
  // console.log(OutgoingFriendReqsIDs, "OutgoingFriendReqsIDs");
  // console.log(recommendedFriends, "recommendedFriends");
  // console.log(outgoingFriendRequests, "outgoingFriendRequests");

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl  font-semibold">Your Friends</h1>
        <button className="btn btn-outline hover:bg-primary px-4 hover:text-white rounded-full p-2 flex items-center justify-center gap-2">
          <Users2 size={"18"} />
          <h1>Friend Requests</h1>
        </button>
      </div>

      {/* Your FriendList */}

      <div className="my-4">
        {getFriendsLoading ? (
          <>
            <Loader className="animate-spin" />
          </>
        ) : (
          <div className={`${friendsObj && friendsObj[0]?.friends?.length != 0  ? "grid  grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4" : ""}`}>
            {friendsObj && friendsObj[0]?.friends?.length != 0
              ? friendsObj[0].friends.map((frnd) => {
                  return <FriendsList key={frnd.username} recommended = {false} {...frnd} />;
                })
              : <NoFriends  recommended={false}/>}
          </div>
        )}
      </div>

      {/* Recommended Friends */}
     <div className="my-7">
       <div className="mb-5">
       <h1 className="text-2xl  font-semibold">Meet New Learners</h1>
        <p>Discover perfect language exchange partners based on your profile</p>
      </div>
      <div >
        {
          recommendedFriendsLoading ? (
            <Loader className="animate-spin" />
          ) : recommendedFriends && recommendedFriends.length > 0 ? <>
        <div className={`${ recommendedFriends && recommendedFriends.length > 0 ? "grid  grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4" : ""}`}>
            {
            recommendedFriends.map(user =>{
              console.log(user , "user");
              return <FriendsList sendRequestsMutation ={sendRequestsMutation} isPending= {isPending} OutgoingFriendReqsIDs={OutgoingFriendReqsIDs}  key={user.username} {...user} recommended = {true} />
            })
          }
        </div>
          </> :(<NoFriends recommended={true} />)
        }
      </div>
     </div>

      <Toaster />
    </div>
  );
};

export default Home;
