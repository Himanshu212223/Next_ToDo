"use client"

import { Context } from "@/ClientComponent/Provider";
import "@/ComponentCss/Login.css"
import Link from "next/link";
import { useContext, useState } from "react";
import {redirect} from "next/navigation" ;
import toast from "react-hot-toast";


const Login = () => {

    const [email, setEmail] = useState("") ;
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(Context) ;

    const loginHandler = async (event)=>{
        event.preventDefault();
        try{
            const response = await fetch("/api/auth/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password : password
                })
            });
            const data = await response.json();
            // console.log(data) ;

            
            if(!data.success){
                return toast.error(data.message) ;
            }
            
            await setUser(data.user);
            toast.success(data.message) ;
            // console.log(`User is`) ;
            // console.log(user)

        }
        catch(error){
            return toast.error(error.message) ;
        }
    }

    if(user._id){
        return redirect("/ManageTasks")
    }
    

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1 className="loginText">Log in...</h1>
                <p className="paragraph">Log in if you already have an account.</p>
                <form className="form" onSubmit={loginHandler}>
                    <input className="inputs" type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                    <input className="inputs" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <button className="formButton formLogin">Login</button>
                    <p>or</p>
                    <Link href={'/register'} className="formButton formSignup">Sign Up</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;