import { useState, useEffect } from "react";

export const useStore = (key, coordinates) => {


    const [store, setStore] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    // console.log("음음 나는 뭐랄까:",coordinates);
    useEffect(() => {
        const fetchStore = async () => {
            setIsLoading(true);
            key = encodeURIComponent(key);
            const currentUrl = window.location.href;
            let pullAddress = "";

            // console.log("store: ",coordinates);
            // console.log(minX, minY, maxX, maxY);
            // const url = `http://localhost:8080/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;
            // const url = `http://54.180.25.62:8080/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;
            if(coordinates.length === 0){
                pullAddress =
                    `/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;
            }
            else {
                const centerX = coordinates[2].La;
                const centerY = coordinates[2].Ma;
                const minX = coordinates[0].La;
                const minY = coordinates[0].Ma;
                const maxX = coordinates[1].La;
                const maxY = coordinates[1].Ma;
                pullAddress =
                    `/store/map/search?keyword=${key}&centerY=${centerY}&centerX=${centerX}&minY=${minY}&maxY=${maxY}&minX=${minX}&maxX=${maxX}`;
            }
            const url = `/.netlify/functions/proxyGet?pullAddress=${encodeURIComponent(pullAddress)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setStore(data);
            } catch (error) {
                console.error("Fetch 실패:", error);
            } finally {
                setIsLoading(false); // 요청 완료 시 로딩 false
            }
        };

        fetchStore();
    }, [key]);

    return {store, isLoading};
};
