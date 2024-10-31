"use client"
import "@/ComponentCss/Login.css"
import Link from "next/link";
import { Context } from "@/ClientComponent/Provider"
import { useContext, useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const Register = () => {

    const { user, setUser } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method : "POST",    
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            const data = await response.json();

            if(!data.success){
                return toast.error(data.message) ;
            }

            await setUser(data.user) ;
            toast.success(data.message) ;
        }
        catch (error) {
            return toast.error(error.message) ;
        }
    }

    if (user._id) {
        return redirect("/ManageTasks");
    }


    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1 className="loginText">Sign Up...</h1>
                <p className="paragraph">Fill the details and get your Account created.</p>
                <form className="form" onSubmit={registerHandler}>
                    <input className="inputs" type="text" placeholder="Name" name="name" onChange={(e) => { setName(e.target.value) }} value={name} />
                    <input className="inputs" type="email" placeholder="Email" name="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input className="inputs" type="password" placeholder="Password" name="password" onChange={(e) => {setPassword(e.target.value)}} value={password} />
                    <button className="formButton formLogin" type="submit">Sign Up</button>
                </form>
                <p className="paragraph">Have an account...? <Link href={"/login"} >Login</Link></p>
            </div>
        </div>
    );
}

export default Register;