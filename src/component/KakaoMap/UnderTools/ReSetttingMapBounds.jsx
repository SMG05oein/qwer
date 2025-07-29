import React, {useEffect, useMemo} from 'react';
import {useMap} from "react-kakao-maps-sdk";
import {RiResetRightLine} from "react-icons/ri";
/* global kakao */

const ReSetttingMapBounds = ({points}) => {
    const map = useMap()

    const bounds = useMemo(() => {
        const bounds = new kakao.maps.LatLngBounds()
        points.forEach((point) => {
            bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
        })
        return bounds
    }, [points])

    // 이거 활성화하면 검색하면 바로 리로드
    // useEffect(() => {
    //     if (points.length > 0) {
    //         map.setBounds(bounds);
    //     }
    // }, [bounds]);

    return (
        <div>
            <button className={"btn btn-primary"} onClick={() => {
                if(points.length === 0) {
                    alert("검색된 장소가 없습니다!");
                    return;
                }
                map.setBounds(bounds)
            }}>
                지도 범위&nbsp;<RiResetRightLine />
            </button>
        </div>
    )
};

export default ReSetttingMapBounds;