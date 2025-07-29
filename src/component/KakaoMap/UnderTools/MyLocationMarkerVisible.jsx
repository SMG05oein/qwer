import React from 'react';
import {TbMapPin, TbMapPinOff} from "react-icons/tb";

const MyLocationMarkerVisible = ({isVisible, setIsVisible}) => {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => setIsVisible(!isVisible)}>
                내&nbsp;{isVisible ? <TbMapPinOff/>:<TbMapPin/>}
            </button>
        </div>
    );
};

export default MyLocationMarkerVisible;