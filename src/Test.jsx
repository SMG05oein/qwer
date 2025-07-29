import {Link} from "react-router-dom";
import {usePoints} from "./Hooks/usePoints";
import {useEffect, useState} from "react";
import {useUser} from "./Hooks/useUser";
import {useSearchLoad} from "./Hooks/useSearchLoad";
import {Map, MapMarker, Polyline} from "react-kakao-maps-sdk";

const Test = () => {
    const [str, setStr] = useState("");
    const WhatIsThis = ["balance", "transactions", "cancel", "charge", "pay"];
    const WhoIsThis = ["/me", "/1", ""];
    // const points = usePoints(str);
    const user = useUser(str);
    // const load = useSearchLoad();
    const TestShift = (num) => {
        let localStr;
        if(num === 1) {localStr = WhatIsThis[0]}
        if(num === 2) {localStr = WhatIsThis[1]}
        // if(num === 3) {localStr = WhatIsThis[2]} post인데 get요청 때리고 있었네ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        // if(num === 4) {localStr = WhatIsThis[3]}
        // if(num === 5) {localStr = WhatIsThis[4]}
        setStr(localStr);
    };
    const TestShift2 = (num) => {
        let localStr;
        if(num === 1) {localStr = WhoIsThis[0]}
        if(num === 2) {localStr = WhoIsThis[1]}
        if(num === 3) {localStr = WhoIsThis[2]}
        setStr(localStr);
    };

    // useEffect(() => {
    //     // console.log("points:", points);
    //     console.log("user:", user);
    // }, [/*points,*/ user]);



    const origin = { lat: 36.833705, lng: 127.14896 };
    const destination = { lat: 36.845306, lng: 127.1553351 };

    const routeCoords = useSearchLoad(origin, destination);


    console.log("daaaddadasda: ",routeCoords);
    // console.log("load:", load);
    return (
        <div>
            <style>
                {
                    'div{margin: 10px 0px 10px 0px}'
                }
            </style>
            <div style={{margin: '10px 0px 10px 0px'}} className={"d-flex justify-content-center align-items-center"}>
                <Link className={"btn btn-dark"} to="/">홈</Link>
            </div>
            <div style={{margin: '10px 0px 10px 0px'}} className={"btn-group d-flex justify-content-center align-items-center"}>
                <button className={"btn btn-primary"} onClick={() => {TestShift(1)}}>Bal<br/>잔액</button>
                <button className={"btn btn-secondary"} onClick={() => {TestShift(2)}}>Tra<br/>내역</button>
                {/*<button className={"btn btn-success"} onClick={() => {TestShift(3)}}>Can<br/>취소</button>*/}
                {/*<button className={"btn btn-dark"} onClick={() => {TestShift(4)}}>Charge<br/>충천</button>*/}
                {/*<button className={"btn btn-danger"} onClick={() => {TestShift(5)}}>Pay<br/>결제</button>*/}
            </div>

            <div className={"btn-group d-flex justify-content-center align-items-center"}>
                <button className={"btn btn-primary"} onClick={() => {TestShift2(1)}}>내 정보 조회</button>
                <button className={"btn btn-secondary"} onClick={() => {TestShift2(2)}}>특정 사용자 조회</button>
                <button className={"btn btn-dark"} onClick={() => {TestShift2(3)}}>전체 사용자 조회</button>
            </div>

            <Map
                center={origin}
                level={5}
                style={{ width: "100%", height: "500px", borderRadius: "12px" }}
            >
                <MapMarker position={origin}>
                </MapMarker>

                <MapMarker position={destination}>
                </MapMarker>

                {routeCoords.length > 0 && (
                    <Polyline
                        path={routeCoords}
                        strokeWeight={5}
                        strokeColor={"#FF6347"}
                        strokeOpacity={0.8}
                        strokeStyle={"solid"}
                    />
                )}
            </Map>

        </div>
    );
};

export default Test;