import React, { useContext, useEffect } from 'react';
import './ProfilePage.style.css';
import { Container, Button, Image } from 'react-bootstrap';
import { LoginContext } from '../../State/LoginState';
import { useTestUser } from '../../Hooks/useTestUser';
import Loading from '../Loding/Loading';
import {useUser} from "../../Hooks/useUser";

const ProfilePage = ({ setIsProfile }) => {
    const user = useUser();

    console.log(user.user);
    const uuser = user.user;
    const { login, setLogin } = useContext(LoginContext);
    // const user = useTestUser();

    useEffect(() => {
        setIsProfile(true);
        return () => {
            setIsProfile(false);
        };
    }, [setIsProfile]);

    return (!user || user.length === 0 ? <Loading /> :
        <div className="ProfilePage">
            <Container className="profile-container">
                <div className="profile-card-toss">
                    <Image src="/profile.png" roundedCircle className="profile-image-toss" />
                    <h5 className="profile-name-toss">{uuser?.name} 님</h5>

                    <div className="section-label">계정찾기</div>
                    <Button variant="light" className="profile-button-toss">아이디 찾기</Button>
                    <Button variant="light" className="profile-button-toss">비밀번호 찾기</Button>

                    <div className="section-label mt-4">서비스</div>
                    <Button variant="outline-secondary" className="profile-button-toss">계정 삭제</Button>
                    <Button
                        variant="outline-secondary"
                        className="profile-button-toss"
                        onClick={() => {
                            if (window.confirm("로그아웃 하시겠습니까?")) {
                                setLogin(false, 0);
                                alert("로그아웃 되었습니다");
                            }
                        }}
                    >
                        로그아웃
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default ProfilePage;
