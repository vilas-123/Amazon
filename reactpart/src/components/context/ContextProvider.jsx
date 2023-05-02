import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const ContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [superuser, setsuperuser] = useState(false)
    

    useEffect(() => {
        if (localStorage.getItem("userId"))
            setUserId(localStorage.getItem("userId"))
        
    }, [])

    return (
        <AuthContext.Provider value={{
            userId,
            setUserId,
            superuser,
            setsuperuser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;