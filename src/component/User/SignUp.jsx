import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../State/LoginState";
import "./Login.style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signupRequest } from "../../Hooks/useSignup"; // ✅ 회원가입 API 함수 임포트

const SignUp = ({ setIsProfile }) => {
    useEffect(() => {
        setIsProfile(true);
        return () => {
            setIsProfile(false);
        };
    }, [setIsProfile]);

    const { setLogin } = useContext(LoginContext);

    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [passwdOk, setPasswdOk] = useState("");
    const [userType, setUserType] = useState("");

    const studentIdRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const passwdRef = useRef(null);
    const passwdOkRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (studentId === "") {
            alert("아이디를 입력해주세요.");
            studentIdRef.current.focus();
            return;
        }
        if (name === "") {
            alert("이름을 입력해주세요.");
            nameRef.current.focus();
            return;
        }
        if (email === "") {
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();
            return;
        }
        if (passwd === "") {
            alert("비밀번호를 입력해주세요.");
            passwdRef.current.focus();
            return;
        }
        if (passwd !== passwdOk) {
            alert("비밀번호가 일치하지 않습니다.");
            passwdOkRef.current.focus();
            return;
        }
        if (userType !== "0" && userType !== "1") {
            alert("사용자 구분을 선택해주세요.");
            return;
        }

        const signupData = {
            loginId: studentId,
            password: passwd,
            name: name,
            email: email,
            userType: userType === "0" ? "CONSUMER" : "MERCHANT"
        };

        try {
            await signupRequest(signupData);
            alert("회원가입 성공!");
            navigate("/login");
        } catch (error) {
            alert("회원가입 실패: 이미 존재하는 아이디/이메일이거나 서버 오류일 수 있습니다.");
        }
    };

    return (
        <Container className="Login">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={8}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                ref={studentIdRef}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={3} className="d-flex align-items-end">
                        <Button variant="primary" type="button" disabled>중복 확인</Button> {/* 추후 구현 */}
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
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

                <Form.Group className="mb-3" controlId="formBasicPasswordOk">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호 확인"
                        value={passwdOk}
                        onChange={(e) => setPasswdOk(e.target.value)}
                        ref={passwdOkRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicType">
                    <Form.Label>구분</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            label="소비자"
                            name="userType"
                            value="0"
                            checked={userType === "0"}
                            onChange={(e) => setUserType(e.target.value)}
                            inline
                        />
                        <Form.Check
                            type="radio"
                            label="판매자"
                            name="userType"
                            value="1"
                            checked={userType === "1"}
                            onChange={(e) => setUserType(e.target.value)}
                            inline
                        />
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                    확인
                </Button>
                <p />
                <Button variant="dark" type="button" onClick={() => navigate('/')}>
                    취소
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
