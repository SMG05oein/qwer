import React from 'react';
import './CheonanCardPage.style.css';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

const CheonanCardPage = () => {
    const cardItems = [
        {
            title: '행복콜택시',
            description: '어르신의 발이 되어 드립니다',
            image: '/taxi.png', // public 폴더에 taxi.png 넣어줘!
        },
        // 나중에 여기 추가 가능
    ];

    return (
        <div className="cheonan-card-page">
            {/* 상단 헤더 */}
            <div className="header">
                <img src="/logo.png" alt="로고" className="logo" />
                <span className="username">이우용</span>
                <div className="alarm">🔔</div>
            </div>

            {/* 캐러셀 안내 */}
            <Carousel className="carousel-box">
                <Carousel.Item>
                    <div className="carousel-banner">
                        <h5>천안사랑카드 사용안내</h5>
                        <p>사용방법을 확인해주세요</p>
                        <span className="carousel-index">2/8</span>
                    </div>
                </Carousel.Item>
                {/* 추가 캐러셀 아이템 가능 */}
            </Carousel>

            {/* 카드 리스트 */}
            <Container className="card-list">
                <h5 className="section-title">천안사랑카드</h5>
                <Row>
                    {cardItems.map((item, index) => (
                        <Col xs={6} key={index} className="card-col">
                            <div className="card-box">
                                <img src={item.image} alt="icon" className="card-icon" />
                                <div className="card-title">{item.title}</div>
                                <div className="card-desc">{item.description}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default CheonanCardPage;
