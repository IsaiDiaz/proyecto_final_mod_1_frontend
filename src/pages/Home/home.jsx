import React from "react";
import { CalendarCheck, CheckCircle, Layers, LucideRocket } from "lucide-react";
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <section className="home__hero">
                <div className="home__content">
                    <h1 className="home__title">Bienvenid@ a Do-it</h1>
                    <p className="home__subtitle">
                        Organiza tus tareas, alcanza tus metas y mantente productivo con una interfaz simple y poderosa.
                    </p>
                    <div className="home__cta">
                        <a href="/register" className="btn--primary">Regístrate gratis</a>
                        <a href="/login" className="btn--secondary">Inicia sesión</a>
                    </div>
                </div>
                <div className="home__image-preview">
                    <img src="/assets/demo.png" alt="Vista previa de la aplicación" />
                </div>
            </section>

            <section className="home__features">
                <h2>¿Por qué usar Task Manager?</h2>
                <div className="features__grid">
                    <div className="feature">
                        <CalendarCheck size={32} />
                        <h3>Agenda inteligente</h3>
                        <p>Planifica tus tareas con recordatorios y fechas límite.</p>
                    </div>
                    <div className="feature">
                        <Layers size={32} />
                        <h3>Organización por estado</h3>
                        <p>Clasifica tareas como pendientes, en progreso o completadas.</p>
                    </div>
                    <div className="feature">
                        <CheckCircle size={32} />
                        <h3>Interfaz simple</h3>
                        <p>Interfaz amigable y coherente con tus necesidades reales.</p>
                    </div>
                </div>
            </section>

            <section className="home__footer">
                <div className="footer__content">
                    <h2>¿Listo para mejorar tu productividad?</h2>
                    <p>Únete hoy y transforma tu forma de trabajar con Task Manager.</p>
                    <a href="/register" className="btn--primary">Crear cuenta gratuita</a>
                </div>
                <div className="footer__decoration">
                    <LucideRocket size={120} color="#7e4bf6" />
                </div>
            </section>
        </div>
    );
};

export default Home;