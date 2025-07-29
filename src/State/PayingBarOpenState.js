import { createContext, useState } from 'react';
export const PayingBarOpenContext = createContext();

export const PayingBarOpenState = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PayingBarOpenContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </PayingBarOpenContext.Provider>
    );
};

export default PayingBarOpenState;
