"use client"

import {Context} from "@/ClientComponent/Provider";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const LoginLogoutButton = () => {

    const {user, setUser} = useContext(Context);

    const logoutHandler = async () => {
        try{
            const response = await fetch("/api/auth/logout", {
                method : "GET"
            });

            const data = await response.json();
            if(!data.success){
                return toast.error(data.message);
            }

            setUser({});

            toast.success(data.message) ;
        }
        catch(error){
            return toast.error(error.message);
        }
    }

    return (
        <>
        {
            user._id ? <button className='btn logout' onClick={logoutHandler}>Logout</button> : <Link href={"/login"} className='btn login'>login</Link>  
        }
            
            
        </>
    );
}

export default LoginLogoutButton ;