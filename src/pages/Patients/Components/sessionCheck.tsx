import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SessionCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const sessionStorageAvailable = () => {
      try {
        return typeof sessionStorage !== "undefined";
      } catch (error) {
        return false;
      }
    };
    const isLoggedIn = sessionStorageAvailable() && sessionStorage.getItem("userid");
    if (!isLoggedIn) {
      router.push("/unauthorized");
    }
  }, [router]);



  return null; // Render nothing in the component
};

export default SessionCheck;
