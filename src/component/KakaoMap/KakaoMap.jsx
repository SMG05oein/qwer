import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Map, MapMarker, CustomOverlayMap, Polyline} from "react-kakao-maps-sdk";
import {Col, Container, Row} from "react-bootstrap";
import Loading from "../Loding/Loading";
import "./KakaoMap.style.css"
import {useStore} from "../../Hooks/useStore";
import useKakaoLoader from "./useKakaoLoader";
import ReSetttingMapBounds from "./UnderTools/ReSetttingMapBounds.jsx";
import MoveToMyLocation from "./UnderTools/MoveToMyLocation";
import {MdLocationPin} from "react-icons/md";
import MyLocationMarkerVisible from "./UnderTools/MyLocationMarkerVisible";
import StoreMarkerPin from "./storeMarkerPin/StoreMarkerPin";
import SeeStore from "./StoreSeeeeeeee/SeeStore";
import {MapLngLatContext} from "../../State/MapLngLat";
import {useSearchLoad} from "../../Hooks/useSearchLoad";
import KaKaoNavigation from "./Navigation/KaKaoNavigation";
import {KakaoMapLngLatContext} from "../../State/KaKaoMapLngLat";
import NoSeeNavigate from "./UnderTools/NoSeeNavigate";
/* global kakao */

const KakaoMap = () => {
//https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/overlay/categoryMarker 다양한 이미지 마커
//https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/library/keywordBasic 키워드로 장소 검색
    const [keyword, setKeyword] = useState("");
    const {mapLngLat, setMapLngLat}= useContext(MapLngLatContext);
    const {store, isLoading} = useStore(keyword, mapLngLat);
    const [seeStore, setSeeStore] = useState(null); // 상점 리스트
    const [isVisible, setIsVisible] = useState(true); // 현위치 마커
    const [storeClick, setStoreClick] = useState({ id: 0, bool: false, temp: false, triggeredByList: 0 });
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false); // 음 예아
    const {KaLngLat, setKaLngLat} = useContext(KakaoMapLngLatContext); //길찾기할 때 씀
    const [temp, setTemp] = useState(false); //임시
    const [isNavigate, setNavigate] = useState(false);

    useEffect(()=>{
        console.log("temp: ",temp);
    },[temp])
    /**현위치 리로드 시작*/
    const reloadLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCenter = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    setState((prev) => ({
                        ...prev,
                        center: newCenter,
                    }));

                    mapRef.current?.panTo(new kakao.maps.LatLng(newCenter.lat, newCenter.lng));

                    const bounds = mapRef.current.getBounds();
                    const swLatLng = bounds.getSouthWest();
                    const neLatLng = bounds.getNorthEast();
                    const center = mapRef.current.getCenter();
                    setMapLngLat([swLatLng, neLatLng, center]);

                    setIsVisible(true);
                },
                (err) => {
                    console.error("위치 다시 가져오기 실패:", err);
                }
            );
        }
    };
    /**현위치 리로드 끝*/

    /** 현 위치 기반으로 마커 시작*/
    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                }
            )
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
            }))
        }
    }, [])
    /**현 위치 기반으로 마커 끝*/

    useEffect(()=>{
        searchStore();
    }, [store]);

    /**지도 범위 재설정 시작*/
    useKakaoLoader()
    const [points, setPoints] = useState([])
    /**지도 범위 재설정 끝*/

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        // console.log("움직");
        const handleIdle = () => {
            const bounds = map.getBounds();
            const swLatLng = bounds.getSouthWest();
            const neLatLng = bounds.getNorthEast();
            const center = map.getCenter()
            const tempLngLat = [swLatLng, neLatLng, center];
            setMapLngLat(tempLngLat);
        };

        kakao.maps.event.addListener(map, 'idle', handleIdle);

        return () => {
            kakao.maps.event.removeListener(map, 'idle', handleIdle);
        };
    }, [mapReady]);

    const toggleKeyword = (target) => {
        setKeyword("");
        setTimeout(()=>setKeyword(target), 0);
        setNavigate(false);
    };

    const searchStore = () => {
        // console.log("음 퍽킹 쒯: ",store); //와 진짜 하 진짜 진짜 진짜
        const filtered = store.length > 0 && keyword !== "" ? store : null;
        setSeeStore(filtered);

        /**지도 범위 재설정 시작*/
        if (filtered) {
            const markerPoints = filtered.map((item) => ({
                lat: item.y,
                lng: item.x,
            }));
            setPoints(markerPoints);
        } else {
            setPoints([]);
        }

        // if(seeStore === null){alert("검색 결과 없음")} else{alert("검색 완료!")}
        /**지도 범위 재설정 끝*/
        // console.log("Fuck:", store); //데이터 잘 오는지 확인용
        // console.log("Fuck:", seeStore); //데이터 잘 오는지 확인용
    };

    return (
        state.isLoading ? (
            <div><Loading /></div>
        ) : (
            <div className="KakaoMap">
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" id={"searchKeyword"} value={keyword}
                                onChange={(e) => {setKeyword(e.target.value);}}
                                placeholder="검색" aria-label="검색"/>
                            {/*<button className="btn btn-primary" type="button" id={"searchBtn"} onClick={searchStore}>검색</button>*/}
                            {/*모바일 환경에서 검색 버튼을 누를까?*/}
                        </form>
                    </div>
                </nav>
                <Container className={"NoPadding"} style={{width: '100%', height: '100%'}}>
                    <Row className={"NotFlex NoMargin"} style={{width: '100%', height: '100%'}}>
                        <div className={"KakaoMapBox"}>
                            <div className={"KaKaoMapOverTools"}>
                                {["착한가게", "음식점", "카페", "중앙시장",
                                    "서비스", "문화/레저", "의류/잡화", "교육", "노래방",
                                    "미용", "차량", "생활", "유통", "전자/가전",
                                    "기타", "식품", "건축", "의료", "숙박"]
                                    .map((category) => (
                                        <button className="btn btn-primary" onClick={() => toggleKeyword(category)}>{category}</button>
                                    ))}
                            </div>
                            <Map
                                center={state.center}
                                style={{width: '94%', height: '90%', borderRadius: '10px'}}
                                level={4} draggable={true}
                                onCreate={(map) => {
                                    mapRef.current = map;
                                    setMapReady(true);
                                }}
                                ref={mapRef}
                            >
                                {isLoading ? (
                                    <div><Loading /></div>
                                ) : (
                                    <>
                                        <CustomOverlayMap position={state.center} yAnchor={1}>
                                            {isVisible && <MdLocationPin style={{ fontSize: "32px", color: "red" }} />}
                                        </CustomOverlayMap>

                                        {seeStore &&
                                            seeStore.map((item) => (
                                                <StoreMarkerPin setTemp={setTemp} setStoreClick={setStoreClick} storeClick={storeClick} item={item} key={item.id} />
                                            ))
                                        }

                                        <KaKaoNavigation state_center={state.center} isNavigate={isNavigate}/>

                                        <div className="KaKaoMapUnderTools">
                                            <MoveToMyLocation reloadLocation={reloadLocation} state={state} setIsVisible={setIsVisible} />
                                            <MyLocationMarkerVisible isVisible={isVisible} setIsVisible={setIsVisible} />
                                            {seeStore && <ReSetttingMapBounds points={points} />}
                                            {isNavigate && <NoSeeNavigate setNavigate={setNavigate}/>}
                                        </div>
                                    </>
                                )}
                            </Map>
                        </div>
                    </Row>
                    <Row className={""}>
                        <SeeStore temp={temp} setTemp={setTemp} storeClick={storeClick} setStoreClick={setStoreClick} seeStore={seeStore} setNavigate={setNavigate}/>
                    </Row>

                </Container>
            </div>
        )
    );
};

export default KakaoMap;