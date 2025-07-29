import { createContext, useState } from 'react';
export const KakaoMapLngLatContext = createContext();

export const KaKaoMapProvider = ({ children }) => {
    const [KaLngLat, setKaLngLat] = useState({ lat: 0, lng: 0 });

    return (
        <KakaoMapLngLatContext.Provider value={{ KaLngLat, setKaLngLat }}>
            {children}
        </KakaoMapLngLatContext.Provider>
    );
};

export default KaKaoMapProvider;