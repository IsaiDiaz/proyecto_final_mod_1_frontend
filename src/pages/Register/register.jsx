import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle, User } from 'lucide-react';
import MessageToast from "../../components/toasts/MessageToast/MessageToast";
import "./register.css"


const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const [toast, setToast] = useState({ message: "", type: "", buttonText: null, onButtonClick: null });

    const showToast = (message, type = "success", buttonText = null, onButtonClick = null) => {
        setToast({ message, type, buttonText, onButtonClick });
        setTimeout(() => {
            setToast({ message: "", type: "", buttonText: null, onButtonClick: null });
        }, 5000);
    };

    const validate = (field, value) => {
        let error = "";

        if (field === "name") {
            if (!value) error = "El nombre es obligatorio";
            else if (value.length < 3) error = "El nombre debe tener al menos 3 caracteres";
        }

        if (field === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = "El correo es obligatorio";
            else if (!emailRegex.test(value)) error = "Correo inválido";
        }

        if (field === "password") {
            if (!value) error = "La contraseña es obligatoria";
            else if (value.length < 6) error = "Mínimo 6 caracteres";
        }

        if (field === "confirmPassword") {
            if (value !== form.password) error = "Las contraseñas no coinciden";
        }

        return error;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });

        const errorMsg = validate(id, value);
        setErrors((prev) => ({ ...prev, [id]: errorMsg }));
    };

    const handleSubmit = async () => {
        const newErrors = {};
        for (const field in form) {
            const error = validate(field, form[field]);
            if (error) newErrors[field] = error;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            showToast("Por favor corrige los errores del formulario", "error");
            return;
        }

        try {
            await registerUser({ name: form.name, email: form.email, password: form.password });
            showToast("Usuario creado con éxito", "success", "OK", () => navigate("/login"));
        } catch (err) {
            console.error(err);
            showToast("Error al crear el usuario", "error");
        }
    };

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
                    {errors.name && <p className="error-text">{errors.name}</p>}
                    <div className="icon-input">
                        <User />
                        <input type="text" placeholder="Nombre completo" id="name" value={form.name} onChange={handleChange} />
                    </div>
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <div className="icon-input">
                        <Mail />
                        <input type="text" placeholder="Email" id="email" value={form.email} onChange={handleChange} />
                    </div>
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <div className="icon-input">
                        <Lock />
                        <input type="password" placeholder="Contraseña" id="password" value={form.password} onChange={handleChange} />
                    </div>
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                    <div className="icon-input">
                        <Lock />
                        <input type="password" placeholder="Confirmar contraseña" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
                    </div>

                    <button className="btn--primary" onClick={handleSubmit}>Crear cuenta</button>
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