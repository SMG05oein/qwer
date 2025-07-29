import React from 'react';
import {useMap} from "react-kakao-maps-sdk";
import {BiCurrentLocation} from "react-icons/bi";
/* global kakao */

const MoveToMyLocation = ({state, setIsVisible, reloadLocation}) => {
    const map = useMap();

    return (
        <div>
            <button className="btn btn-primary"
                    onClick={() => {
                        const moveLatLon = new kakao.maps.LatLng(state.center.lat, state.center.lng);
                        setIsVisible(true);
                        map.panTo(moveLatLon);
                        reloadLocation()
                    }}
            ><BiCurrentLocation /></button>
        </div>
    );
};

export default MoveToMyLocation;