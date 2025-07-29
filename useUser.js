import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = (str) => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const pullAddress = `/api/users/info`;
            const url = `/.netlify/functions/proxyGet?pullAddress=${encodeURIComponent(pullAddress)}`;
            const token = localStorage.getItem("accessToken");
            console.log(token)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setUser(response.data);
            } catch (err) {
                console.error("Axios 요청 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [str]);

    return { user, isLoading, error };
};
