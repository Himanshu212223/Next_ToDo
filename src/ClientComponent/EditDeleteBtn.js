"use client"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditDeleteButton = (props) => {

    const id = props.id;
    const router = useRouter();

    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!data.success) {
                return toast.error(data.message);
            }

            toast.success(data.message);
            router.refresh() ;
        }
        catch(error){
            return toast.error(error.message) ;
        }
    }


    const updateHandler = async (id) => {
        try{
            const response = await fetch(`/api/tasks/${id}`, {
                method : "PUT"
            });

            const data = await response.json() ;
            
            if(!data.success){
                return toast.error(data.message) ;
            }

            toast.success(data.message) ;
            router.refresh() ;
        }
        catch(error){
            return toast.error(error.message) ;
        }
    }

    return (
        <>
            <i className={"fa-solid fa-check icons"} onClick={() => {updateHandler(id)}}></i>
            <i className="fa-solid fa-trash icons" onClick={() => { deleteHandler(id) }}></i>
        </>
    );
}

export default EditDeleteButton;