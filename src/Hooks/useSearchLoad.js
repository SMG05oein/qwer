import { useEffect, useState, useRef } from "react";

export const useSearchLoad = (origin, destination) => {
    const [routeCoords, setRouteCoords] = useState([]);
    const lastParams = useRef(""); // 직전 요청 파라미터 기억
    const cache = useRef({}); // 동일 좌표 조합 캐싱

    useEffect(() => {
        if (!origin || !destination) return;

        const paramKey = `${origin.lng},${origin.lat}-${destination.lng},${destination.lat}`;
        if (paramKey === lastParams.current) return; // 동일 파라미터 중복 요청 방지
        lastParams.current = paramKey;

        if (cache.current[paramKey]) {
            setRouteCoords(cache.current[paramKey]); // 캐시된 결과 활용
            return;
        }

        const fetchRoute = async () => {
            const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.lng},${origin.lat}&destination=${destination.lng},${destination.lat}&vehicleType=1&road_details=true&alternatives=false`;

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: "KakaoAK f9d9343bc99472992db5921f258f85ca",
                    },
                });

                const data = await response.json();
                const roadCoords = [];

                data?.routes?.[0]?.sections?.[0]?.roads?.forEach((road) => {
                    for (let i = 0; i < road.vertexes.length; i += 2) {
                        roadCoords.push({
                            lat: road.vertexes[i + 1],
                            lng: road.vertexes[i],
                        });
                    }
                });

                const fullRoute = [origin, ...roadCoords, destination];
                setRouteCoords(fullRoute);
                cache.current[paramKey] = fullRoute; // 캐싱 저장
            } catch (error) {
                console.error("길찾기 API 오류:", error);
            }
        };

        fetchRoute();
    }, [origin, destination]);

    return routeCoords;
};
