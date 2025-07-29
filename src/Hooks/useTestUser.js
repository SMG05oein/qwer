import { useState, useEffect } from "react";

export const useTestUser = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            // let url = `http://localhost:5000/user`;
            let url = `https://my-json-server.typicode.com/SMG05oein/9oormthonUNIV_temp6/user`;
            let response = await fetch(url);
            let data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    return user;
};
