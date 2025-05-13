import React, { useState } from "react";
import "./tasks.css"
import { useParams } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar/navbar";
import TasksBody from "../../components/layouts/TasksBody/tasksBody";
import MessageToast from "../../components/toasts/MessageToast/MessageToast";

const Tasks = () => {
    const [selectedView, setSelectedView] = useState("all");
    const [selectedStatus, setStatusFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('')
    const [searchEndDate, setSearchEndDate] = useState('')

    const [toast, setToast] = useState({
        message: "",
        type: "",
        buttonText: null,
        onButtonClick: null
    });

    const showToast = (message, type = "success", buttonText = null, onButtonClick = null) => {
        setToast({ message, type, buttonText, onButtonClick });
        setTimeout(() => {
            setToast({ message: "", type: "", buttonText: null, onButtonClick: null });
        }, 5000);
    };

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
                toast={toast}
                showToast={showToast}
            />
            <TasksBody
                selected={selectedView}
                status={selectedStatus}
                searchTerm={searchTerm}
                searchStartDate={searchStartDate}
                searchEndDate={searchEndDate}
                toast={toast}
                showToast={showToast}
            />
            <MessageToast
                message={toast.message}
                type={toast.type}
                buttonText={toast.buttonText}
                onButtonClick={toast.onButtonClick}
            />
        </div>
    );
};

export default Tasks