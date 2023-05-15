import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HandleLogout = () => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        router.push('/login');
      }
    if(typeof sessionStorage !== 'undefined' ){
        sessionStorage.clear();
        router.push('/login');

    }
 
  
};

export default HandleLogout;


