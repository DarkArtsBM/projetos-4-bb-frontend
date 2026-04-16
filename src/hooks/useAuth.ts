import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            const cargo = localStorage.getItem("cargo");

            setIsLoggedIn(!!token);
            setIsAdmin(cargo === "ADMIN" || cargo === "SUPER_ADMIN");
        };

        checkToken();
        window.addEventListener("storage", checkToken);

        return () => window.removeEventListener("storage", checkToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cargo");
        localStorage.removeItem("nome");

        setIsLoggedIn(false);
        setIsAdmin(false);

        window.dispatchEvent(new Event("storage"));

        router.push("/login");
        router.refresh();
    };

    return { isLoggedIn, handleLogout,isAdmin };
}