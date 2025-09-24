import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptFriendRequestFn, getFriendRequests } from "../lib/apiCalls";
import {
  BellIcon,
  Clock10Icon,
  Loader,
  MessageCircleCode,
  MessageSquareIcon,
  TimerIcon,
  UserCheck,
} from "lucide-react";
import { getFlag } from "../Components/FriendsList";
import NoFriends from "../Components/NoFriends";

const Notification = () => {
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friend-requests"],
    queryFn: getFriendRequests,
  });

  const queryClient = useQueryClient();
  const { mutate: acceptFriendRequest, isPending } = useMutation({
    mutationFn: acceptFriendRequestFn,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  console.log(friendRequests, "friendRequests");
  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];
  return (
    <>
     <div className="p-5">
      <h1 className="lg:text-3xl font-bold my-5 md:text-2xl text-xl ">
              Notifications
            </h1>
     </div>
      {incomingRequests.length === 0 &&
     acceptedRequests.length === 0 ? (
        <NoFriends NoFriends={false} />
      ) : (
        <>
        
        {
          isLoading ? <>
           <Loader className="animate-spin" />
          </> : <>
          <div className="p-5">
           
            <div className="flex items-center start gap-2">
              <UserCheck className="size-5 text-primary" />
              <h1 className="lg:text-xl md:text-md text-sm  font-bold">
                Friend Requests
              </h1>
              <span className=" badge badge-primary rounded-full ">
                {incomingRequests.length}
              </span>
            </div>
            {incomingRequests.length == 0 ? (
              <NoFriends NoFriends={true} />
            ) : (
              <>
                {incomingRequests.map((req) => {
                  console.log(req._id, "req ID");
                  return (
                    <div
                      key={req._id}
                      className="card  w-[50%]  bg-base-200 p-4 my-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex mb-5   items-center justify- gap-4">
                        <div className="w-[50px] h-[50px] rounded-full">
                          <img
                            src={req.sender.profilePicture}
                            alt={req.sender.profilePicture}
                          />
                        </div>
                        <div className="flex items-center justify-between w-[100%]">
                          <div>
                            <h1 className=" capitalize ">
                              {req.sender.username}
                            </h1>
                            <div className="flex  items-center justify-start gap-2">
                              <div className="flex text-[10px]   rounded-full bg-primary badge badge-secondary items-center justify-center gap-1">
                                <span>
                                  {getFlag(req.sender.nativeLanguage)}
                                </span>
                                <p className="text-black capitalize">
                                  Native : {req.sender.nativeLanguage}
                                </p>
                              </div>
                              <div className="flex border  text-[10px] badge badge-outline  rounded-full items-center justify-center gap-1">
                                <span>
                                  {getFlag(req.sender.learningLanguage)}
                                </span>
                                <p className="capitalize">
                                  Learning : {req.sender.learningLanguage}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                           disabled={isPending}
                            onClick={() => acceptFriendRequest(req._id)}
                            className="btn btn-primary badge badge-primary"
                          >
                            {
                              isPending ? "Accepting..." : "Accept"
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div>
              <div className="flex items-center justify-start gap-2">
                <BellIcon className="text-primary size-5" />
                <h1 className="text-xl font-bold">New Connections</h1>
              </div>

              {acceptedRequests.map((req) => {
                console.log(req._id, "req ID");
                return (
                  <div
                    key={req._id}
                    className="card  w-[50%]  bg-base-200 p-4 my-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex mb-5   items-center justify- gap-4">
                      <div className="w-[50px] h-[50px] rounded-full">
                        <img
                          src={req.recipient.profilePicture}
                          alt={req.recipient.profilePicture}
                        />
                      </div>

                      <div className="flex items-center justify-between w-[100%]">
                        <div>
                          <h1>{req.recipient.username}</h1>
                          <p className="">
                            {req.recipient.username} accepted your friend
                            request
                          </p>

                          <div className="flex items-center gap-2">
                            <Clock10Icon className="size-4" />
                            <div className="text-[10px]">Just Now</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 badge badge-primary">
                          <MessageSquareIcon size={13} />
                          <p className="text-sm">New Friend</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
        }
        
        </>
      )}
    </>
  );
};

export default Notification;
