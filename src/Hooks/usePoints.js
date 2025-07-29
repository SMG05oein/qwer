import { useState, useEffect } from "react";

export const usePoints = (str) => {
    const [point, setPoint] = useState([]);

    useEffect(() => {
        const fetchPoint = async () => {
            // const url = `http://54.180.25.62:8080/api/users/me/points/${str}`;
            const pullAddress =
                `/api/users/me/${str}`;

            const url = `/.netlify/functions/proxyGet?pullAddress=${encodeURIComponent(pullAddress)}`;
            // console.log(url);
            try {
                const response = await fetch(url);
                const data = await response.json();
                setPoint(data);
            } catch (error) {
                console.error("Fetch 실패:", error);
            }
        };

        fetchPoint();
    }, [str]);

    return point;
};
