import "@/ComponentCss/TaskPage.css"
import ListItem from "@/ClientComponent/ListItem";
import CreateToDo from "@/Components/CreateToDo";


const ManageTasks = async () => {

    return (
        <div className="taskPage">
            <CreateToDo />

            <ListItem />


        </div>
    );
}

export default ManageTasks;