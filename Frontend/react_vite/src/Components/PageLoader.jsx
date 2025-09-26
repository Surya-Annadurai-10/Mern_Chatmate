import {
  Loader,
  Loader2,
  Loader2Icon,
  LoaderCircle,
  LoaderPinwheel,
  LucideLoader2,
} from "lucide-react";
import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = ({connecting}) => {
  const {theme} = useThemeStore();

  return (
    <div data-theme={theme} className="w-full h-screen bg-black flex items-center justify-center flex-col gap-2">
      <Loader className="animate-spin" />
      {
       connecting &&  <p>Connecting...</p>
      }
    </div>
  );
};

export default PageLoader;
