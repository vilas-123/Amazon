import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const ContextProvider = ({ children }) => {
    const [userId, setUserId] = useState()
    const [superuser, setsuperuser] = useState(Boolean(localStorage.getItem("superuser")))
    

    useEffect(() => {
        console.log( Boolean(localStorage.getItem("superuser") ))
        if (localStorage.getItem("userId"))
        {
            setUserId(Number(localStorage.getItem("userId")))

        }
        
        if (localStorage.getItem("superuser")){

            setsuperuser(Boolean(localStorage.getItem("superuser")))
        }
         
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