import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SessionCheckAdmin = () => {
    const router = useRouter();

    useEffect(() => {
        const sessionStorageAvailable = () => {
            try {
                return typeof sessionStorage !== "undefined";
            } catch (error) {
                return false;
            }
        };
        const isLoggedIn = sessionStorageAvailable() && sessionStorage.getItem("admin");
        if (!isLoggedIn) {
            router.push("/unauthorized");
        }
    }, [router]);



    return null; // Render nothing in the component
};

export default SessionCheckAdmin;
