import React, { useState } from "react";
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { authPassword } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import MessageToast from "../../components/toasts/MessageToast/MessageToast";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();

    const [toast, setToast] = useState({ message: "", type: "", buttonText: null, onButtonClick: null });

    const showToast = (message, type = "success", buttonText = null, onButtonClick = null) => {
        setToast({ message, type, buttonText, onButtonClick });
    };

    const handleLogin = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            showToast("Por favor completa todos los campos", "error");
            return;
        }

        try {
            const response = await authPassword({ email, password });
            console.log("Login exitoso:", response.data);

            showToast(
                "Inicio de sesión exitoso",
                "success"
            );

            navigate(`/tasks`);

        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data || error.message);
            showToast("Credenciales inválidas o error del servidor", "error");
        }
    };

    return (
        <>
            <div className="container container--column">
                <div className="container__header">
                    <CheckCircle /> <span>Do-it</span>
                </div>
                <h1 className="container__title">
                    Iniciar sesión
                </h1>

                <div className="container__body">
                    <div className="icon-input">
                        <Mail />
                        <input type="text" placeholder="Email" id="email" />
                    </div>
                    <div className="icon-input">
                        <Lock />
                        <input type="password" placeholder="Contraseña" id="password" />
                    </div>
                    <button className="btn--primary" onClick={handleLogin}>Iniciar Sesión</button>
                    <p className="container__body-extra">
                        ¿No tienes cuenta? <a href="/register">Registrate</a>
                    </p>
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
};

export default Login;