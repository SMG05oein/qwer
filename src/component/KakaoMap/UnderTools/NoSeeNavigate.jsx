import React from 'react';
import {LuNavigationOff} from "react-icons/lu";

const NoSeeNavigate = ({setNavigate}) => {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => setNavigate(false)}>
                <LuNavigationOff />
            </button>
        </div>
    );
};

export default NoSeeNavigate;