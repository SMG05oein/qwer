import React, {useContext} from 'react';
import"../NB.style.css"
import {LoginContext} from "../../State/LoginState";
import GNBPayingBarLoginF from "./GNBPayingBarLoginF";
import GNBPayingBarLoginT from "./GNBPayingBarLoginT";

const GnbPayingBar = ({ setIsOpen, isOpen }) => {
    const { login } = useContext(LoginContext);

    const isLoggedIn = login.isLogin && login.idx !== null && login.idx !== 0;

    return (
        <div className={"OnePayingBar"}>
            <div
                style={{
                    cursor: "pointer",
                    boxShadow: `${isOpen ? '0 10px 0 #0EB4FC' : 'none'}`
                }}
                onClick={() => { setIsOpen(!isOpen); }}
                className="PayingBar"
            >
                <div className={"Paying"}>{isOpen ? "닫기" : "결제하기"}</div>
            </div>

            <div
                className={`PayingUnderBar d-flex justify-content-center align-content-center ${isOpen ? 'open' : ''}`}
                style={{ display: `${isOpen ? 'block' : 'none'}` }}
            >
                {isLoggedIn ? (
                    <GNBPayingBarLoginT isOpen={isOpen} />
                ) : (
                    <GNBPayingBarLoginF isOpen={isOpen} />
                )}
            </div>
        </div>
    );
};


export default GnbPayingBar;