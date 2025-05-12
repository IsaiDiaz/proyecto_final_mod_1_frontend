import "./navbar.css";
import React from "react";
import { Calendar, CalendarCheck, Search } from "lucide-react";

export function Navbar({ selected, setSelected, setStatus, status, searchTerm, setSearchTerm }) {
    return (
        <div className="navbar">
            <div className="navbar__header">

                <div className="navbar__heaeder-title">
                    <h1>Do-it</h1>
                    <p>Manage your tasks efficiently</p>
                </div>
            </div>
            <hr />
            <div className="navbar__body">
                <div className="navbar__body-element">
                    <Calendar
                        className={`element__icon ${selected === "today" ? "element__icon--selected" : ""}`}
                        size={24}
                    />
                    <button className="element__button" onClick={() => setSelected("today")}>
                        Tareas de hoy
                    </button>
                </div>
                <div className="navbar__body-element">
                    <CalendarCheck
                        className={`element__icon ${selected === "all" ? "element__icon--selected" : ""}`}
                        size={24}
                    />
                    <button className="element__button" onClick={() => setSelected("all")}>
                        Todas las tareas
                    </button>
                </div>
                <hr />
                <div className="navbar__body-element">
                    <span className="task__status task__status--pending element__icon"></span>
                    <button
                        className={`element__button ${status === "pending" ? "element__button--selected" : ""}`}
                        onClick={() => setStatus("pending")}
                    >
                        Pendiente
                    </button>
                </div>
                <div className="navbar__body-element">
                    <span className="task__status task__status--in-progress element__icon"></span>
                    <button
                        className={`element__button ${status === "in-progress" ? "element__button--selected" : ""}`}
                        onClick={() => setStatus("in-progress")}
                    >
                        En progreso
                    </button>
                </div>
                <div className="navbar__body-element">
                    <span className="task__status task__status--done element__icon"></span>
                    <button
                        className={`element__button ${status === "done" ? "element__button--selected" : ""}`}
                        onClick={() => setStatus("done")}
                    >
                        Completado
                    </button>
                </div>
                <div className="navbar__body-element">
                    <span className="task__status task__status--all element__icon"></span>
                    <button
                        className={`element__button ${status === "" ? "element__button--selected" : ""}`}
                        onClick={() => setStatus('')}
                    >
                        Todos
                    </button>
                </div>
                <hr />
                <div className="navbar__body-element">
                    <div className="icon-input">
                        <Search/>
                        <input 
                            type="text" 
                            placeholder="Buscar" 
                            id="task-contain" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;