import React, {useContext, useEffect} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import "./NB.style.css"
import {IoReorderThreeOutline} from "react-icons/io5";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useTestUser} from "../Hooks/useTestUser";
import {LoginContext} from "../State/LoginState";
import {BiTestTube} from "react-icons/bi";

const TopMenu = () => {
    const user = useTestUser();
    const { login } = useContext(LoginContext);
    // console.log(login);
    // console.log(user[login.idx-1]);
    return (
        <div className="TopMenu">
            <Container fluid  className="topMenuBar justify-content-center NoPadding">
                <Row style={{margin: "10px 0px 10px 0px"}}>
                    <Col className="d-flex justify-content-left align-items-center">
                        <Link className={"NoPadding"} to="/"><div className='logo-pill'><Image className={"logo-img"} src={"CheonanLogo.png"} alt={"천안시 로고"}/>
                        <span className="logo-text"> | 디소상</span>
                        </div>
                        </Link>
                        {login.isLogin ? (
                        <span className="user-name">{user[login.idx - 1]?.name} 님</span>
                        ) : null}
                    </Col>
                    <Col className="d-flex justify-content-end NoPadding">
                        <Link to="/test"><BiTestTube size={"25"}/></Link>
                        <Link to="#"><IoIosNotificationsOutline size={"25"}/></Link>
                        <Link to="#"><IoReorderThreeOutline size={"25"} /></Link>
                    </Col>
                </Row>
            </Container>
            <Outlet/>
        </div>
    );
};

export default TopMenu;