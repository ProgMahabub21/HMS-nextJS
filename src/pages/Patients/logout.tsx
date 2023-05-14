import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HandleLogout = () => {
    const router = useRouter();
    sessionStorage.clear();
    router.push('/login')
};

export default HandleLogout;


