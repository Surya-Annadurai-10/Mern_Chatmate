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

const PageLoader = () => {
  const {theme} = useThemeStore();

  return (
    <div data-theme={theme} className="w-full h-screen bg-black grid place-items-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default PageLoader;
