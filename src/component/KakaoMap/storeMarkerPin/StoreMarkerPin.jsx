import React, { useEffect, useState } from 'react';
import { MapMarker, useMap } from "react-kakao-maps-sdk";
/* global kakao */

const StoreMarkerPin = ({ item, storeClick, setTemp }) => {
    const [isInfoWindow, setIsInfoWindow] = useState(false);
    const map = useMap();

    const moveCenterStore = (trigger, id) => {
        const isActive = id === item.id || trigger?.id === item.id;
        if (!isActive) return;
        setIsInfoWindow(prev => !prev);
        setTimeout(() => {
            map.panTo(new kakao.maps.LatLng(item.y, item.x));
        }, 0);
    };

    useEffect(() => {
        moveCenterStore(storeClick, storeClick?.id);
    }, [storeClick]);

    return (
        <div>
            <MapMarker
                key={item.id}
                position={{ lat: item.y, lng: item.x }}
                removable={true}
                clickable={true}
                image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    size: {
                        width: isInfoWindow ? 24 : 20,
                        height: isInfoWindow ? 35 : 30,
                    }
                }}
                onClick={(marker) => {
                    moveCenterStore(marker, item.id)
                    setTemp(p=>!p)
                }}
            >
                {isInfoWindow ? item.placeName : null}
            </MapMarker>
        </div>
    );
};

export default StoreMarkerPin;
