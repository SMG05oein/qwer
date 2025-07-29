import { useState, useEffect } from "react";

export const useUser = (str) => {


    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const pullAddress =
                `/api/users/me/${str}`;

            const url = `/.netlify/functions/proxyGet?pullAddress=${encodeURIComponent(pullAddress)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Fetch 실패:", error);
            }
        };

        fetchUser();
    }, [str]);

    return user;
};
