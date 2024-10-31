"use client"

import { createContext, useContext, useEffect, useState } from 'react';

export const Context = createContext({user:{}}) ;

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({id : null, name : null, email : null, password : null});

    useEffect(()=>{
        fetch("/api/auth/me").then((response) => response.json()).then((data) => {
            if(data.success){
                setUser(data.user);
            }
        })
    },[]);


    return <Context.Provider value={{user, setUser}}>
        {children}
    </Context.Provider>
}