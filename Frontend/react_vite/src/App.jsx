import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./Containers/SignUp";
import Login from "./Containers/Login";
import Home from "./Containers/Home";
import Notification from "./Containers/Notification";
import CallPage from "./Containers/CallPage";
import ChatPage from "./Containers/ChatPage";
import Onboarding from "./Containers/Onboarding";
import { useAuthUser } from "./hooks/useAuthUser";
import PageLoader from "./Components/PageLoader";
import Friends from "./Containers/Friends";
import Layout from "./Containers/Layout";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const {theme , setTheme} = useThemeStore();
  let authData;
  const { isLoading, authUser } = useAuthUser();
  console.log("authData", { authData });
  authData = authUser?.user;
  // console.log({ authData }, "authData");
  // console.log({ isLoading }, "isLoading");

  const isAuthenticated = Boolean(authData);
  const isOnboarded = authData?.onBoarded;
  // console.log(isAuthenticated, "IsAuthenticated");
  // console.log(isOnboarded, "isOnboarded");

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: isAuthenticated ? (
        <>
          {isOnboarded ? (
            <Navigate to={"/"} />
          ) : (
            <Navigate to={"/onboarding"} />
          )}
        </>
      ) : (
        <SignUp />
      ),
    },
    {
      path: "/login",
      element: isAuthenticated ? (
        <Navigate to={isOnboarded ? "/" : "/onboarding"} />
      ) : (
        <Login />
      ),
    },
    {
      element: isAuthenticated ? <Layout /> : <Navigate to={"/login"} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/notification",
          element: isAuthenticated && isOnboarded ? (
            <Notification />
          ) : (
            <Navigate to={"/login"} />
          ),
        },
        {
          path: "/friends",
          element: <Friends />,
        },
      ],
    },

    {
      path: "/call/:id",
      element: isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={"/login"} />,
    },
    {
      path: "/chat/:id",
      element: isAuthenticated && isOnboarded ? <ChatPage /> : <Navigate to={"/login"} />,
    },
    {
      path: "/onboarding",
      element: isAuthenticated ? (
        <>{isOnboarded ? <Navigate to={"/"} /> : <Onboarding />}</>
      ) : (
        <Navigate to={"/login"} />
      ),
    },
  ]);

  if (isLoading) return <PageLoader />;
  return (
    <>
      <RouterProvider data-theme={theme} router={router} />
    </>
  );
}

export default App;
