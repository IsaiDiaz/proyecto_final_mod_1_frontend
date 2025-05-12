import React, { useEffect, useRef, useState } from "react";
import { CircleDashed, LoaderCircle, Circle, ChevronDown, CalendarClock } from "lucide-react";
import { getTodayTasksByUserId, getTasksByUserId, createTask, updateTask, updateProgress, deleteTask } from "../../../services/taskService";
import MessageToast from "../../toasts/MessageToast/MessageToast";
import "./tasksBody.css"

const TasksBody = ({ selected, status, searchTerm }) => {
    const title = selected === "today" ? "Tareas de hoy:" : "Todas las tareas:";
    const dateTimeInputRef = useRef(null);
    const [dateTimeValue, setDateTimeValue] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("pending");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingDate, setEditingDate] = useState("");

    const [toast, setToast] = useState({ message: "", type: "", buttonText: null, onButtonClick: null });

    const showToast = (message, type = "success", buttonText = null, onButtonClick = null) => {
        setToast({ message, type, buttonText, onButtonClick });
        setTimeout(() => {
            setToast({ message: "", type: "", buttonText: null, onButtonClick: null });
        }, 5000);
    };

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
        setEditingDescription(task.description || "");
        setEditingDate(task.dueDate.slice(0, 16));
    };

    const toggleExpand = (taskId) => {
        setExpandedTaskId(prev => prev === taskId ? null : taskId);
    }

    const handleIconClick = () => {
        if (dateTimeInputRef.current) {
            dateTimeInputRef.current.showPicker();
        }
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
                : await getTasksByUserId(status, searchTerm);
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
                : await getTasksByUserId(status, searchTerm);
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
                : await getTasksByUserId(status, searchTerm);
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
                        : await getTasksByUserId(status, searchTerm);
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
        };

        fetchTasks();
    }, [selected, status, searchTerm]);

    return (
        <>
            <div className="tasks-body">
                <div className="tasks-header">
                    <h2>
                        {title}
                    </h2>
                </div>

                <div className="task tasks-body__form">
                    <div className="form__statuses">
                        <span className="task__status task__status--pending"></span>
                        <span className="task__status task__status--in-progress"></span>
                        <span className="task__status task__status--done"></span>
                    </div>

                    <input
                        type="text"
                        placeholder="¿Cuál es tu siguiente tarea?"
                        className="form__input-title"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />

                    <textarea
                        placeholder="Descripción de la tarea (opcional)"
                        className="form__input-description"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                    ></textarea>

                    <div className="form__right-group">
                        <div className="form__input-datetime">
                            <input
                                ref={dateTimeInputRef}
                                type="datetime-local"
                                onChange={handleDateChange}
                                className="hidden-datetime-input"
                            />

                            {dateTimeValue && (
                                <span className="datetime-display">
                                    {new Date(dateTimeValue).toLocaleString("es-ES", {
                                        day: "2-digit",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={handleIconClick}
                                className="calendar-button"
                            >
                                <CalendarClock size={18} />
                            </button>
                        </div>

                        <button className="form__submit-button" onClick={handleSubmit}>Agregar</button>
                    </div>
                </div>

                <div className="tasks-body__task-container">
                    {tasks.length > 0 ? (
                        tasks.map((task) => {
                            const isExpanded = expandedTaskId === task.id;
                            const isEditing = editingTaskId === task.id;

                            return (
                                <div className="task" key={task.id}>
                                    <div className="task__top-row">
                                        <span className={`task__status task__status--${task.status}`}></span>
                                        <span className="task__title">{task.title}</span>

                                        <div className="task__right-group">
                                            <span className="task__due-date">
                                                {task.dueDate ? new Date(task.dueDate).toLocaleString("es-ES", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }) : ""}
                                            </span>

                                            <button
                                                className="task__action"
                                                onClick={() => handleProgressUpdate(task.id)}
                                                title="Avanzar estado"
                                            >
                                                {task.status === "pending" && <CircleDashed size={18} />}
                                                {task.status === "in-progress" && <LoaderCircle size={18} className="animate-spin-slow" />}
                                                {task.status === "done" && <Circle size={18} />}
                                            </button>

                                            <button
                                                className="task__action"
                                                onClick={() => toggleExpand(task.id)}
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    style={{
                                                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                                        transition: "transform 0.2s ease"
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`task__description-wrapper ${isExpanded ? "expanded" : ""}`}>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editingTitle}
                                                    onChange={(e) => setEditingTitle(e.target.value)}
                                                    className="form__input-title"
                                                    placeholder="Título"
                                                />
                                                <textarea
                                                    value={editingDescription}
                                                    onChange={(e) => setEditingDescription(e.target.value)}
                                                    className="form__input-description"
                                                    placeholder="Descripción"
                                                />
                                                <input
                                                    type="datetime-local"
                                                    value={editingDate}
                                                    onChange={(e) => setEditingDate(e.target.value)}
                                                    className="form__input-title"
                                                />
                                                <div className="form__right-group">
                                                    <button
                                                        className="form__submit-button"
                                                        onClick={async () => {
                                                            try {
                                                                await updateTask(task.id, {
                                                                    title: editingTitle,
                                                                    description: editingDescription,
                                                                    dueDate: editingDate
                                                                });
                                                                const updatedTasks = selected === "today"
                                                                    ? await getTodayTasksByUserId(status, searchTerm)
                                                                    : await getTasksByUserId(status, searchTerm);
                                                                setTasks(updatedTasks);
                                                                setEditingTaskId(null);
                                                                setExpandedTaskId(null);
                                                            } catch (err) {
                                                                console.error("Error al actualizar:", err);
                                                            }
                                                        }}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingTaskId(null)}
                                                        className="form__submit-button"
                                                        style={{ backgroundColor: "#ccc" }}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="task__description">{task.description}</p>
                                                <div className="form__right-group">
                                                    <button
                                                        className="form__submit-button"
                                                        onClick={() => startEditing(task)}
                                                    >
                                                        Editar
                                                    </button>
                                                    {task.status === "done" && (
                                                        <button
                                                            className="form__submit-button"
                                                            style={{ backgroundColor: "#ff8888" }}
                                                            onClick={() => {
                                                                showToast(
                                                                    "¿Estás seguro de eliminar esta tarea?",
                                                                    "error",
                                                                    "Eliminar",
                                                                    () => handleDelete(task.id)
                                                                );
                                                            }}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    )}

                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
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