import React, { useState } from "react";
import "./tasks.css"
import { useParams } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar/navbar";
import TasksBody from "../../components/layouts/TasksBody/tasksBody";

const Tasks = () => {
    const [selectedView, setSelectedView] = useState("all");
    const [selectedStatus, setStatusFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchStartDate, setSearchStartDate] = useState(null)
    const [searchEndDate, setSearchEndDate] = useState(null)

    return (
        <div className="task-layout">
            <Navbar 
                selected={selectedView} 
                setSelected={setSelectedView} 
                setStatus={setStatusFilter} 
                status={selectedStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchStartDate={searchStartDate}
                setSearchStartDate={setSearchStartDate}
                searchEndDate={searchEndDate}
                setSearchEndDate={setSearchEndDate}
                />
            <TasksBody 
                selected={selectedView} 
                status={selectedStatus}
                searchTerm={searchTerm}
                searchStartDate={searchStartDate}
                searchEndDate={searchEndDate}
                />
        </div>
    );
};

export default Tasks