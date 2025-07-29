import React, {useContext, useState} from 'react';
import {Col} from "react-bootstrap";
import "./SeeStore.style.css"
import {BsCaretUpFill, BsFillCaretDownFill} from "react-icons/bs";
import {KakaoMapLngLatContext} from "../../../State/KaKaoMapLngLat";
import SeeStore2 from "./SeeStore2";

const SeeStore = ({storeClick ,seeStore, setStoreClick, setNavigate, setTemp, temp}) => {
    const [showStoreList, setShowStoreList] = useState(false);
    const {KaLngLat, setKaLngLat} = useContext(KakaoMapLngLatContext);

    const fff = (store) => {
        setTemp(p => !p);

        // console.log(store);
        setStoreClick(prev=>({id: store.id, bool: !prev.bool, temp: !prev.temp}));
    };

    return (
        <div>
            <div className={"storeBox"} style={{marginTop:"20px"}}>
                <Col>
                    <h5 onClick={()=> setShowStoreList(!showStoreList)}>
                        검색된 장소 {seeStore?.length ? seeStore?.length : 0 }개 {showStoreList ? <BsCaretUpFill /> : <BsFillCaretDownFill />}
                    </h5>
                    {showStoreList ? (
                        seeStore?.length > 0 ? (
                            seeStore.map((store) => (
                                <div className={"asd"} key={store.id} onClick={()=>{fff(store)}}>
                                    <SeeStore2 storeClick={storeClick} temp={temp} setTemp={setTemp} store={store} setStoreClick={setStoreClick} setNavigate={setNavigate}/>
                                </div>
                            ))
                        ) : (
                            <div>없음</div>
                        )
                    ) : null}
                </Col>
            </div>
        </div>
    );
    // <div className="storeName d-flex justify-content-between align-items-center">
    //     <div>이름: {store.placeName}</div>
    //     <button className={"btn btn-primary"} onClick={() => {
    //         setKaLngLat({lat: store.y, lng: store.x});setNavigate(true);
    //     }
    //     }>길찾기</button>
    // </div>
    // <div className="storeCategory d-flex align-items-center justify-content-between">
    //     <div>분류: {store.category ? store.category : "없음"}</div>
    //     <div>전화번호: {store.phone ? store.phone : "없음"}</div>
    // </div>
    // <div className="storeAdress">주소: {store.addressName ? store.addressName : "없음"}</div>
};

export default SeeStore;