import React from "react";
import {
    CircleDashed,
    LoaderCircle,
    Circle,
    ChevronDown,
} from "lucide-react";

const Task = ({
    task,
    handleProgressUpdate,
    toggleExpand,
    isExpanded,
    isEditing,
    editingTitle,
    setEditingTitle,
    editingDescription,
    setEditingDescription,
    editingDate,
    setEditingDate,
    selected,
    getTodayTasksByUserId,
    getTasksByUserId,
    status,
    searchTerm,
    searchStartDate,
    searchEndDate,
    setTasks,
    setEditingTaskId,
    setExpandedTaskId,
    startEditing,
    showToast,
    handleDelete,
    updateTask,
    getCurrentDateTiemLocal
}) => {
    return (
        <div className="task">
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
                        {task.status === "in-progress" && <LoaderCircle size={18} />}
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
                            min={getCurrentDateTiemLocal()}
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
                                            : await getTasksByUserId(status, searchTerm, searchStartDate, searchEndDate);
                                        setTasks(updatedTasks);
                                        setEditingTaskId(null);
                                        setExpandedTaskId(null);
                                    } catch (err) {
                                        showToast("Error al actualizar", "error")
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
                            {task.status !== "done" && (
                                <button
                                    className="form__submit-button"
                                    onClick={() => startEditing(task)}
                                >
                                    Editar
                                </button>
                            )}
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
    )
}

export default Task;
