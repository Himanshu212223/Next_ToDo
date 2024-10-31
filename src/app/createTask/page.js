"use client"

import "@/ComponentCss/Login.css"
import { useState } from "react";
import toast from "react-hot-toast";
import {redirect, useRouter} from "next/navigation" ;

const CreateTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const submitHander = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/tasks/newTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            const data = await response.json();

            if (!data.success) {
                return toast.error(data.message);
            }

            toast.success(data.message);
            setTitle("") ;
            setDescription("") ;   
            redirect("/ManageTasks") ;
        }
        catch (error) {
            // return toast.error(error.message);
        }
    }

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1 className="loginText">Create Task</h1>
                <p className="paragraph">Below Fields are mandatory to be filled.</p>
                <form className="form" onSubmit={submitHander}>
                    <input className="inputs" type="text" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                    <input className="inputs" type="text" placeholder="Description" onChange={(e) => { setDescription(e.target.value) }} value={description} />
                    <button className="formButton formLogin">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;