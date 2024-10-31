"use server"
import "@/ComponentCss/TaskPage.css"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import EditDeleteButton from "./EditDeleteBtn";

const fetchTask = async (token) => {
    try {
        const response = await fetch(`${process.env.URL}/api/tasks/myTasks`, {
            method: "GET",
            headers: {
                cookie: `token=${token}`
            },
            cache: "no-cache",

        });

        const data = await response.json();

        // console.log(data);

        if (!data.success) {
            return [];
        }

        return data.message;
    }
    catch (error) {
        return [];
    }
}


const ListItem = async () => {

    const token = cookies().get("token")?.value;


    if (!token) {
        return redirect("/login");
    }

    const tasks = await fetchTask(token);



    return (
        <div className="wrapper">
            {tasks?.map((task) => {
                return (
                    <div className={`taskItem createdTask ${task.isCompleted ? "lightGreen" : "lightWhite" }`} key={task._id} id={task._id}>
                        <div>
                            <h1>{task.title}</h1>
                            <p>{task.description}</p>
                        </div>
                        <div>
                            <EditDeleteButton id={task._id} />
                        </div>
                    </div>
                )
            })}
        </div>
    ); 
}


export default ListItem ;