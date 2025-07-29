import React from 'react';
import "./Loaging.style.css"
const Loading = () => {
    return (
        <div className="loading-wrapper">
            <div className="spinner" />
            <p className="loading-text">잠시만 기다려주세요...</p>
        </div>
    );
};

export default Loading;
