import { createContext, useContext, useState } from "react";

const HealthProfileContext = createContext();

export function HealthProfileProvider({ children }) {

    const [profile, setProfile] = useState(null);

    return (

        <HealthProfileContext.Provider
            value={{
                profile,
                setProfile,
            }}
        >
            {children}
        </HealthProfileContext.Provider>

    );

}

export function useHealthProfile() {
    return useContext(HealthProfileContext);
}