import { getStreamToken } from "../lib/streamChat.js";

export const generateStreamClientController= async (req , res) =>{
       try {
        const token = getStreamToken(req.user.id);
        res.status(200).json({
            success : true,
            message : "StreamClient token created succcessfully",
            token : token
        })
       } catch (error) {
        console.log("Error while creating token");
        res.status(400).json({
            success : false,
            message : error.message
        })
        
       }

}

