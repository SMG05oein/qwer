import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginProvider from "./State/LoginState";
import PayingBarOpenState from "./State/PayingBarOpenState";
import MapLngLat from "./State/MapLngLat";
import KaKaoMapProvider from "./State/KaKaoMapLngLat";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <LoginProvider>
                <PayingBarOpenState>
                    <MapLngLat>
                        <KaKaoMapProvider>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </KaKaoMapProvider>
                    </MapLngLat>
                </PayingBarOpenState>
            </LoginProvider>
        </React.StrictMode>
    </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
