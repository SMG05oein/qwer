// ✅ GNB.jsx (검증된 아이콘만 사용)

import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import "./NB.style.css";

// ✅ 실제 존재하는 아이콘 출처:
// - https://react-icons.github.io/react-icons
// - react-icons/io5: Ionicons v5
// - react-icons/ri: Remix Icon
// - react-icons/fa6: Font Awesome 6 (react-icons/fa6)

import { IoPerson, IoPersonOutline } from "react-icons/io5"; // 프로필
import { RiBankCardFill, RiBankCardLine } from "react-icons/ri"; // 카드
import { FaMap, FaRegMap } from "react-icons/fa6"; // 지도
import { FaHouse, FaHouseChimney } from "react-icons/fa6"; // 홈 (실제 존재하는 아이콘)

import GNBPayingBar from "./GNB/GNBPayingBar";
import { PayingBarOpenContext } from "../State/PayingBarOpenState";

const Gnb = ({isProfile}) => {
    const [open, setOpen] = useState(false);
    const {isOpen, setIsOpen} = useContext(PayingBarOpenContext);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const isCurrent = (path) => location.pathname === path;

    return (
        <div className="NB">
            <Container fluid style={{borderRadius: isProfile ? '0px' : '50px 50px 0 0'}}  className="GNB justify-content-center">
                {isProfile ? null :
                    <GNBPayingBar isOpen={isOpen} setIsOpen={setIsOpen}/>
                }
                <Row style={{margin: "10px 0px 10px 0px"}}>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to="/cheonancard" className={`gnb-link ${isCurrent('/cheonancard') ? 'active' : ''}`}>
                            {isCurrent('/cheonancard') ? <RiBankCardFill/> : <RiBankCardLine/>}<br/>천안<br/>사랑카드
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to="/map" className={`gnb-link ${isCurrent('/map') ? 'active' : ''}`}>
                            {isCurrent('/map') ? <FaMap/> : <FaRegMap/>}<br/>가맹점<br/> 지도
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to="/" className={`gnb-link ${isCurrent('/') ? 'active' : ''}`}>
                            {isCurrent('/') ? <FaHouseChimney/> : <FaHouse/>}<br/>홈
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Link to="/profile" className={`gnb-link ${isCurrent('/profile') ? 'active' : ''}`}>
                            {isCurrent('/profile') ? <IoPerson/> : <IoPersonOutline/>}<br/>프로필
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Gnb;
