import React from "react";

import { CalendarClock } from "lucide-react";

const TaskForm  = ({
    titleInput, 
    TITLE_LIMIT, 
    setTitleInput, 
    descriptionInput, 
    DESCRIPTION_LIMIT, 
    setDescriptionInput,
    dateTimeInputRef,
    getCurrentDateTimeLocal,
    handleDateChange,
    handleIconClick,
    handleSubmit,
    dateTimeValue
}) => {
    return (
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
            maxLength={TITLE_LIMIT}
            onChange={(e) => setTitleInput(e.target.value)}
        />

        <textarea
            placeholder="Descripción de la tarea (opcional)"
            className="form__input-description"
            value={descriptionInput}
            maxLength={DESCRIPTION_LIMIT}
            onChange={(e) => setDescriptionInput(e.target.value)}
        ></textarea>

        <div className="form__right-group">
            <div className="form__input-datetime">
                <input
                    ref={dateTimeInputRef}
                    type="datetime-local"
                    min={getCurrentDateTimeLocal()}
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
    )
}

export default TaskForm;