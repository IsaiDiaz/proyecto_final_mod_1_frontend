import React, { useState } from "react";
import "./tasks.css"
import { useParams } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar/navbar";
import TasksBody from "../../components/layouts/TasksBody/tasksBody";

const Tasks = () => {
    const [selectedView, setSelectedView] = useState("all");
    const [selectedStatus, setStatusFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="task-layout">
            <Navbar 
                selected={selectedView} 
                setSelected={setSelectedView} 
                setStatus={setStatusFilter} 
                status={selectedStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
            <TasksBody 
                selected={selectedView} 
                status={selectedStatus}
                searchTerm={searchTerm}
                />
        </div>
    );
};

export default Tasks