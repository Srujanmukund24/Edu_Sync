import { createContext, useState, useEffect, useContext } from "react";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [User, setUser] = useState(JSON.parse(localStorage.getItem('User')));

    const storeUserInLS = (User)=>{
        setUser(User);
        return localStorage.setItem("User", JSON.stringify(User))
    }

    let isLoggedIn = !!User;

    const removeUserFromLS = ()=>{
        setUser({});
        return localStorage.removeItem("User")
    }

    console.log("Context User", User);

    return (
        <UserContext.Provider value={{isLoggedIn, User, storeUserInLS , removeUserFromLS}}>
            {children}
        </UserContext.Provider>
    );
}

export const useCon = ()=>{
    const userContextValue = useContext(UserContext);
    if (!userContextValue) {
        throw new Error("useCon used outside of the Provider");
    }
    return userContextValue;    
}