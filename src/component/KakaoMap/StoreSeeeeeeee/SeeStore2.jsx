import React, {useContext} from 'react';
import {KakaoMapLngLatContext} from "../../../State/KaKaoMapLngLat";

const SeeStore2 = ({store, setStoreClick, setNavigate, setTemp, temp, storeClick}) => {
    const {KaLngLat, setKaLngLat} = useContext(KakaoMapLngLatContext);

    const fff = (store) => {
        // console.log(store);
        // setTemp(p => !p);
        setStoreClick(prev=>({
            id: store.id,
            bool: !prev.bool
        }));
    };
    return (
        <div className={"storeItem " + (storeClick?.id === store.id && temp?"bg-info bg-opacity-25":"")}>
            <div className="storeName d-flex justify-content-between align-items-center">
                <div>이름: {store.placeName}</div>
                <button className={"btn btn-primary"} onClick={() => {
                    setKaLngLat({lat: store.y, lng: store.x});setNavigate(p=>!p);
                    // window.location.href="https://map.kakao.com/?sName=강남역&eName=서울역"
                }
                }>길찾기</button>
            </div>
            <div onClick={(prev)=>{fff(store, prev)}}>
                <div className="storeCategory d-flex align-items-center justify-content-between" >
                    <div>분류: {store.category ? store.category : "없음"}</div>
                    <div>전화번호: {store.phone ? store.phone : "없음"}</div>
                </div>
                <div className="storeAdress">주소: {store.addressName ? store.addressName : "없음"}</div>
            </div>
        </div>
    );
};

export default SeeStore2;