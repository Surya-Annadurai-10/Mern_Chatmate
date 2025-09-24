
import { axiosInstance } from "./axios";

export const getUser = async () => {
 try {
   console.log(" Api from getUser");

  const res = await axiosInstance.get(`/auth/me`);
  console.log(res.data, "ress----------->>>>>>");

  return res.data;
 } catch (error) {
  console.log("Error occured while fetching the auth data" , error);
  return null;
 }
};

export const signUpUser = async (data) => {
  console.log(data, "Data from useSignUp ");

  const res = await axiosInstance.post(`/auth/signup`, data);
  return res.data;
};

export const loginUser = async (data) => {
  console.log(data, "Data from useSignUp ");

  const res = await axiosInstance.post(`/auth/login`, data);
  return res.data;
};

export const logoutUser = async () => {
  // console.log(data, "Data from useSignUp ");

  const res = await axiosInstance.post(`/auth/logout`);
  return res.data;
};

export const onBoardingMutation = async (data) =>{
    const res = await axiosInstance.post("/auth/onboarding" ,data );
    return res.data;
}

export const getFriends = async () =>{
    const res = await axiosInstance.get("/user/getfriends" );
    return res.data;
}

export const getRecommendedFriends = async () =>{
    const res = await axiosInstance.get("/user/getrecommendedfriends"  );
    return res.data;
}

export const getOutgoingFriendRequests = async () =>{
    const res = await axiosInstance.get("/user/ongoing-friend-requests"  );
    return res.data;
}

export const sendFriendRequest = async (userId) =>{
    const res = await axiosInstance.post(`/user/friend-request/${userId}`  );
    return res.data;
}
