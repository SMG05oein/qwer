// src/Hooks/useSignup.js
import axios from "axios";

export const signupRequest = async (signupData) => {
    try {
        const response = await axios.post(
            "/.netlify/functions/proxyPost?pullAddress=/api/users/signup",
            signupData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
    }
};
