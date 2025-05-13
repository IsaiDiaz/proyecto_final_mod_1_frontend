import "./navbar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CalendarCheck, Search, LogOut, Menu, X, CheckCircle } from "lucide-react";
import { logout } from "../../../services/userService";


export function Navbar({ selected, setSelected, setStatus, status, searchTerm, setSearchTerm, searchStartDate, setSearchStartDate, searchEndDate, setSearchEndDate, toast, showToast }) {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="navbar__toggle">
                <button onClick={toggleNavbar} className="navbar__toggle-button">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`navbar ${isOpen ? "navbar--open" : "navbar--closed"}`}>
                <div className="navbar__header">

                    <div className="navbar__heaeder-title">
                        <div className="icon-title">
                        <CheckCircle/>
                        <h1>Do-it</h1>
                        </div>
                        <p>Administra tus tareas eficientemente</p>
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
                        <div className="icon-input">
                            <span style={{ fontSize: 12 + "px" }}>Desde:</span>
                            <input
                                type="date"
                                id="search-start-date"
                                value={searchStartDate}
                                onChange={(e) => setSearchStartDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="navbar__body-element">
                        <div className="icon-input">
                            <span style={{ fontSize: 12 + "px" }} >Hasta:</span>
                            <input
                                type="date"
                                id="search-end-date"
                                value={searchEndDate}
                                onChange={(e) => setSearchEndDate(e.target.value)}
                            />
                        </div>
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
                            <Search />
                            <input
                                type="text"
                                placeholder="Buscar"
                                id="task-contain"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="navbar__body-element">
                        <LogOut />
                        <button
                            className={`element__button`}
                            onClick={() => {
                                showToast(
                                    "¿Estás seguro que desea salir?",
                                    "error",
                                    "Salir",
                                    () => {
                                        logout()
                                        navigate("/login")
                                    }
                                );

                            }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Navbar;