import axios from "axios";

export const loginRequest  = async (loginId, password) => {
    try {
        const response = await axios.post("/.netlify/functions/proxyPost?pullAddress=/api/users/login", {
            loginId: loginId,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        });

        console.log("로그인 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
    }
};
