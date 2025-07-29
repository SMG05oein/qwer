import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import "./Login.style.css";
import { useNavigate } from "react-router-dom";
import { useTestUser } from "../../Hooks/useTestUser";
import { LoginContext } from "../../State/LoginState";
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginRequest } from "../../Hooks/useLogin";

const Login = ({ setIsProfile }) => {
    const { setLogin } = useContext(LoginContext);

    useEffect(() => {
        setIsProfile(true);
        return () => {
            setIsProfile(false);
        };
    }, [setIsProfile]);

    const [studentId, setStudentId] = useState("");
    const [passwd, setPasswd] = useState("");
    const studentIdRef = useRef(null);
    const passwdRef = useRef(null);
    const navigate = useNavigate();
    const user = useTestUser();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (studentId === "") {
            alert("아이디를 입력해주세요.");
            studentIdRef.current.focus();
            return;
        }

        if (passwd === "") {
            alert("비밀번호를 입력해주세요.");
            passwdRef.current.focus();
            return;
        }

        try {
            const { accessToken, refreshToken } = await loginRequest(studentId, passwd);
            alert("로그인 성공!");

            // ✅ LocalStorage에 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", studentId); // 사용자 아이디도 저장

            // ✅ LoginContext에 저장
            setLogin({
                isLogin: true,
                id: studentId,
                token: accessToken
            });
            localStorage.setItem("accessToken", accessToken); // ✅ 이 줄 꼭 필요
            console.log("✅ 로그인 성공");
            console.log("✅ 저장된 토큰:", accessToken);

            navigate("/");
        } catch (error) {
            alert("아이디 또는 비밀번호가 맞지 않습니다!");
        }
    };

    return (
        <Container className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        ref={studentIdRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        ref={passwdRef}
                    />
                </Form.Group>

                <div className="socialLogin">
                    일반회원
                    <Button variant="primary" type="submit">
                        일반 로그인
                    </Button>
                    <Button variant="info" type="button" onClick={() => navigate('/signUp')}>
                        회원가입
                    </Button>
                </div>

                <p />
                <p />
                <Button variant="dark" type="button" onClick={() => navigate('/')}>
                    홈으로
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
