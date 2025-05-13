import React, { useEffect, useRef, useState } from "react";

import {
  getTodayTasksByUserId,
  getTasksByUserId,
  createTask,
  updateTask,
  updateProgress,
  deleteTask,
} from "../../../services/taskService";

import TaskForm from "../../elements/taskForm/taskForm";
import Task from "../../elements/task/task";
import MessageToast from "../../toasts/MessageToast/MessageToast";
import "./tasksBody.css";

const TITLE_LIMIT = 25;
const DESCRIPTION_LIMIT = 300;

const TasksBody = ({ selected, status, searchTerm, searchStartDate, searchEndDate, toast, showToast }) => {
    const title = selected === "today" ? "Tareas de hoy:" : "Todas las tareas:";
    const dateTimeInputRef = useRef(null);

    const [tasks, setTasks] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [dateTimeValue, setDateTimeValue] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("pending");

    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingDate, setEditingDate] = useState("");

    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16);
    };

    const handleIconClick = () => {
        if (dateTimeInputRef.current) {
            dateTimeInputRef.current.showPicker();
        }
    };

    const toggleExpand = (taskId) => {
        setExpandedTaskId(prev => prev === taskId ? null : taskId);
    }

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
        setEditingDescription(task.description || "");
        setEditingDate(task.dueDate.slice(0, 16));
    };
 

    const handleDateChange = (e) => {
        setDateTimeValue(e.target.value);
    };

    const handleSubmit = async () => {

        if (!titleInput.trim()) {
            showToast("Por favor completa el título", "error");
            return;
        }

        try {
            const newTask = {
                title: titleInput,
                description: descriptionInput,
                dueDate: dateTimeValue,
                status: selectedStatus
            };

            await createTask(newTask);

            setTitleInput("");
            setDateTimeValue("");
            setDescriptionInput("");

            const updatedTasks = selected === "today"
                ? await getTodayTasksByUserId(status, searchTerm)
                : await getTasksByUserId(status, searchTerm, searchStartDate, searchEndDate);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            showToast("Ocurrió un error al crear la tarea", "error");
        }
    }

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            const updatedTasks = selected === "today"
                ? await getTodayTasksByUserId(status, searchTerm)
                : await getTasksByUserId(status, searchTerm, searchStartDate, searchEndDate);
            setTasks(updatedTasks);
            setExpandedTaskId(null);
            showToast("Tarea eliminada correctamente", "success");
        } catch (err) {
            console.error("Error al eliminar:", err);
            showToast("Error al eliminar la tarea", "error");
        }
    };

    const handleProgressUpdate = async (taskId) => {
        try {
            await updateProgress(taskId);
            const updatedTasks = selected === "today"
                ? await getTodayTasksByUserId(status, searchTerm)
                : await getTasksByUserId(status, searchTerm, searchStartDate, searchEndDate);
            setTasks(updatedTasks);
        } catch (err) {
            console.error("Error al actualizar el progreso:", err);
        }
    };

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const data =
                    selected === "today"
                        ? await getTodayTasksByUserId(status, searchTerm)
                        : await getTasksByUserId(status, searchTerm, searchStartDate, searchEndDate);
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
        };

        fetchTasks();
    }, [selected, status, searchTerm, searchStartDate, searchEndDate]);

    return (
        <>
            <div className="tasks-body">
                <div className="tasks-header">
                    <h2>
                        {title}
                    </h2>
                </div>

               <TaskForm 
                    titleInput={titleInput}
                    TITLE_LIMIT={TITLE_LIMIT}
                    setTitleInput={setTitleInput}
                    descriptionInput={descriptionInput}
                    DESCRIPTION_LIMIT={DESCRIPTION_LIMIT}
                    setDescriptionInput={setDescriptionInput}
                    dateTimeInputRef={dateTimeInputRef}
                    getCurrentDateTimeLocal={getCurrentDateTimeLocal}
                    handleDateChange={handleDateChange}
                    handleIconClick={handleIconClick}
                    handleSubmit={handleSubmit}
                    dateTimeValue={dateTimeValue}
               />

                <div className="tasks-body__task-container">
                    {tasks.length > 0 ? (
                        tasks.map((task) => {
                            const isExpanded = expandedTaskId === task.id;
                            const isEditing = editingTaskId === task.id;

                            return (
                               <Task
                                key={task.id}
                                task={task}
                                handleProgressUpdate={handleProgressUpdate}
                                toggleExpand={toggleExpand}
                                isExpanded={isExpanded}
                                isEditing={isEditing}
                                editingTitle={editingTitle}
                                setEditingTitle={setEditingTitle}
                                editingDescription={editingDescription}
                                setEditingDescription={setEditingDescription}
                                editingDate={editingDate}
                                setEditingDate={setEditingDate}
                                selected={selected}
                                getTodayTasksByUserId={getTodayTasksByUserId}
                                getTasksByUserId={getTasksByUserId}
                                status={status}
                                searchTerm={searchTerm}
                                searchStartDate={searchStartDate}
                                searchEndDate={searchEndDate}
                                setTasks={setTasks}
                                setEditingTaskId={setEditingTaskId}
                                setExpandedTaskId={setExpandedTaskId}
                                startEditing={startEditing}
                                showToast={showToast}
                                handleDelete={handleDelete}
                                updateTask={updateTask}
                                getCurrentDateTiemLocal={getCurrentDateTimeLocal}
                               />
                            );
                        })
                    ) : (
                        <p className="message">No hay tareas para mostrar.</p>
                    )}
                </div>
            </div>
            <MessageToast
                message={toast.message}
                type={toast.type}
                buttonText={toast.buttonText}
                onButtonClick={toast.onButtonClick}
            />
        </>
    );
}

export default TasksBody