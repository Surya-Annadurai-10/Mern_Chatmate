import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiSecret = process.env.STREAM_SECRET_KEY
const apiKey = process.env.STREAM_API_KEY

const streamClient = StreamChat.getInstance(apiKey , apiSecret);

export async function upstreamClient (userData) {
    try {
        await streamClient.upsertUsers([userData]);
        
        console.error("Stream created from stream.js");
        return userData;
    } catch (error) {
        console.error("Error while upserting the user" , error);
        
    }
}

export async  function getStreamToken (userId){
   try {
     const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    return token;
   } catch (error) {
     console.log("Error occurred while generating streamclient token");

   }

}

