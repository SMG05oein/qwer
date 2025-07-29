import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="NotFoundPage">
            <h1>😵 404 - 페이지를 찾을 수 없습니다</h1>
            <p>요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
            <Link to="/" className="goHome">🏠 홈으로 돌아가기</Link>
        </div>
    );
};

export default NotFound;