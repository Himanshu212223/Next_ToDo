"use client"
import { Context } from "@/ClientComponent/Provider";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

const CreateToDo = () => {

    const { user } = useContext(Context);
    const router = useRouter();

    useEffect(()=>{
            router.refresh();
    },[]);

    if (!user._id) {
        return redirect("/login");
    }

    return (
        <Link href={"/createTask"} className="taskItem createTask">
            <i className="fa-solid fa-plus plusSign"></i>
            <p>Create Task</p>
        </Link>
    );
}

export default CreateToDo;