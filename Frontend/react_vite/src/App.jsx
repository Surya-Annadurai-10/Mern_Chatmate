import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Containers/SignUp";
import Login from "./Containers/Login";
import Home from "./Containers/Home";
import Notification from "./Containers/Notification";
import Call from "./Containers/Call";
import Chat from "./Containers/Chat";
import Onboarding from "./Containers/Onboarding";
import {
  
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import axios from "axios";



const router = createBrowserRouter([
  {
    path : "/signup",
    element : <SignUp />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/notification",
    element : <Notification />
  },
  {
    path : "/call",
    element : <Call />
  },
  {
    path : "/chat",
    element : <Chat />
  },
  {
    path : "/onboarding",
    element : <Onboarding />
  },
])


function App() {

  const {data , isLoading , error} = useQuery({
    queryKey  : ["todos"],
    queryFn : async () =>{
      const res = await axios.get('https://dummyjson.com/products') 
      return res.data
    }
  })

 console.log({data});
 console.log({isLoading});
 console.log({error});
 

  return (
    <>
    

    <RouterProvider router={router} />
  
      {/* <h1 className="bg-red-600 text-3xl font-bold text-yellow-400">Hello</h1>

      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button> */}
    </>
  );
}

export default App;
