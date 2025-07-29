import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import "./GNBPayingBar.style.css"
import {Link} from "react-router-dom";
import {PayingBarOpenContext} from "../../State/PayingBarOpenState";

const GnbPayingBarLoginF = () => {
    const {isOpen} = useContext(PayingBarOpenContext);

    return (
        <div className="GNBPBBox" style={{display: `${isOpen ? 'flex' : 'none'}`}}>
            <div className="GNBBox">
                <Container fluid>
                    <Row className="text-center mb-2">
                        <Col style={{ fontWeight: 'bold' }}>아직 로그인되지 않았습니다</Col>
                    </Row>
                    <Row className="text-center">
                        <Col><Link to={"/profile"} style={{color:'black',fontWeight: 'bold'}} className={"btn btn-outline-dark"}>로그인</Link></Col>
                        <Col><Link to={"/signUp"} style={{color:'black',fontWeight: 'bold'}} className={"btn btn-outline-dark"}>회원가입</Link></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
// return null;
};

export default GnbPayingBarLoginF;