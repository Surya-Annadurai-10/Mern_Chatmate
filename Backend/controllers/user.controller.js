import FriendRequestModel from "../model/FriendRequestModel.js";
import UserModel from "../model/userModel.js";

export const GetFriendsController = async (req, res) => {
  try {
    const getFriends = await UserModel.find(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "username nativeLanguage learningLanguage profilePicture bio "
      );

    return res.status(200).json(getFriends);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetRecommendedFriendsController = async (req, res) => {
  // console.log(req.user, "user");

  try {
    // const currentUserId = req.user.id;
    const recommended = await UserModel.find({
      $and: [
        { _id: { $ne: req.user._id } }, //exclude current user id
        { _id: { $nin: req.user.friends } }, // exclude current user's friends
        { onBoarded: true }, // selecting only who is onBoarded
      ],
    });

    // console.log(recommended , "recommended");
    return res.status(200).json(recommended);
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

export const SendFriendRequestController = async (req, res) => {
  try {
    console.log(req.user, "user SendRequest");
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res.status(401).json({
        success: false,
        message: "You cannot send request to yourself",
      });
    }

    const recipient = await UserModel.findById(recipientId);
    console.log(recipient.username, "recipientName");

    if (!recipient) {
      return res.status(401).json({
        success: false,
        message: "Recipient Not Found",
      });
    }

    const alreadyFriends = recipient.friends.includes(recipientId);

    if (alreadyFriends)
      res.status(401).json({
        success: false,
        message: "You are already Friends ",
      });
    // checking if the request already exists
    const existingRequest = await FriendRequestModel.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(401).json({
        success: false,
        message: "Friend Request already exists between you and this user",
      });
    }

    const FriendRequest = await FriendRequestModel.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json({
      success: true,
      message: "Friend Request Send Successfully",
      data: FriendRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptFriendRequestController = async (req, res) => {
  
  const { id: requestId } = req.params;
  console.log(requestId , "requestId");
  try {

    const friendRequest = await FriendRequestModel.findById( requestId );
    
    if (!friendRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend Request does not exist!",
      });
    }

    if (friendRequest.recipient != req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You are not authorised to accept the friend request",
      });
    }

    (friendRequest.status = "accepted"), friendRequest.save();

    const updatedFriendListSender = await UserModel.findByIdAndUpdate(
      friendRequest.sender,
      {
        $addToSet: { friends: friendRequest.recipient },
      }
    );

    const updatedFriendListRecipient = await UserModel.findByIdAndUpdate(
      friendRequest.recipient,
      {
        $addToSet: { friends: friendRequest.sender },
      }
    );

    res.status(200).json({
      success: true,
      message: "Friend Request accepted",
    });
  } catch (error) {
    console.log("Error while accepting the friend request ", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetFriendRequestController = async (req, res) => {
  try {
    const incomingRequests = await FriendRequestModel.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "username profilePicture nativeLanguage learningLanguage"
    );

    const acceptedRequests = await FriendRequestModel.find({
      sender: req.user.id,
      status: "accepted",
    }).populate(
      "recipient",
      "username profilePicture "
    );

    console.log(acceptedRequests , "acceptedRequests");
    console.log(incomingRequests , "IncomingRequests");
    

    res.status(200).json({
      success: true,
      message: "Incoming and Outgoing Requests fetched successfully",
      incomingRequests: incomingRequests,
      acceptedRequests: acceptedRequests,
    });
  } catch (error) {
    console.log("Error while listing the friend Requests", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const OngoingGetFriendRequestController = async (req, res) => {
  try {
    const pendingRequests = await FriendRequestModel.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "username profilePicture nativeLanguage learningLanguage"
    );

    res.status(200).json({
      success: true,
      message: "Yet to be accepted",
      data: pendingRequests,
    });
  } catch (error) {
    console.log(
      "Error while listing the friend Requests status",
      error.message
    );
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
