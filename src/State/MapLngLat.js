import { createContext, useState } from 'react';
export const MapLngLatContext = createContext();

export const MapLngLat = ({ children }) => {
    const [mapLngLat, setMapLngLat] = useState([]);

    return (
        <MapLngLatContext.Provider value={{ mapLngLat, setMapLngLat }}>
            {children}
        </MapLngLatContext.Provider>
    );
};

export default MapLngLat;
