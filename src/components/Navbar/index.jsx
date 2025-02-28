import React from 'react';
import './style.css';

const Navbar = ({ currentTab, setCurrentTab }) => {

    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div id="navbarNav">
                    <ul className="navbar-nav py-2">
                        <li className="nav-item" style={{ cursor: "pointer" }} onClick={() => setCurrentTab(1)}>
                            <p style={{ margin: 0 }} className={`nav-link${currentTab === 1 ? " active" : ""}`} aria-current="page">Agregar push notification</p>
                        </li>
                        <li className="nav-item" style={{ cursor: "pointer" }} onClick={() => setCurrentTab(2)}>
                            <p style={{ margin: 0 }} className={`nav-link${currentTab === 2 ? " active" : ""}`}>Crear nueva raíz</p>
                        </li>
                    </ul>
                </div>
                <p style={{ color: "white", margin: "0 2vw 0 0", cursor: "pointer" }} onClick={logout}>Cerrar sesión</p>
            </div>
        </nav>
    );
};

export default Navbar;