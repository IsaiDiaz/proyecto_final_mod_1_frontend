import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle, User} from 'lucide-react';
import MessageToast from "../../components/toasts/MessageToast/MessageToast";


const Register = () => {
    const navigate = useNavigate();

    const [toast, setToast] = useState({ message: "", type: "", buttonText: null, onButtonClick: null });

    const showToast = (message, type = "success", buttonText = null, onButtonClick = null) => {
        setToast({ message, type, buttonText, onButtonClick });
    };

    const createUser = async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm_password").value;

        if (!name || !email || !password || !confirm_password) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (password !== confirm_password) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await registerUser({ name, email, password });
            console.log(response);
            showToast(
                "Usuario creado con éxito",
                "success",
                "OK",
                () => navigate("/login")
            );
        } catch (error) {
            console.error(error);
            alert("Error al crear el usuario");
        }


    }

    return (
        <>
            <div className="container container--column">
                <div className="container__header">
                    <CheckCircle /> <span>Do-it</span>
                </div>
                <h1 className="container__title">
                    Crear cuenta
                </h1>

                <div className="container__body">
                    <div className="icon-input">
                        <User />
                        <input type="text" placeholder="Nombre completo" id="name" />
                    </div>
                    <div className="icon-input">
                        <Mail />
                        <input type="text" placeholder="Email" id="email" />
                    </div>
                    <div className="icon-input">
                        <Lock />
                        <input type="password" placeholder="Contraseña" id="password" />
                    </div>
                    <div className="icon-input">
                        <Lock />
                        <input type="password" placeholder="Confirmar contraseña" id="confirm_password" />
                    </div>
                    <button className="btn--primary" onClick={createUser}>Crear cuenta</button>
                    <p className="container__body-extra">
                        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
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
}

export default Register;