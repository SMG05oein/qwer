import React, {useContext} from 'react';
import {Polyline} from "react-kakao-maps-sdk";
import {useSearchLoad} from "../../../Hooks/useSearchLoad";
import {KakaoMapLngLatContext} from "../../../State/KaKaoMapLngLat";


const KaKaoNavigation = ({state_center, isNavigate}) => {
    const {KaLngLat, setKaLngLat} = useContext(KakaoMapLngLatContext);


    const destination = { lat: 36.845306, lng: 127.1553351 };
    const routeCoords = useSearchLoad(state_center, KaLngLat);

    return (
        <div>
            {routeCoords?.length > 0 && isNavigate === true ? (
                <Polyline
                    path={routeCoords}
                    strokeWeight={5}
                    strokeColor={"#FF6347"}
                    strokeOpacity={0.8}
                    strokeStyle={"solid"}
                />
            ) : null}
        </div>
    );
};

export default KaKaoNavigation;