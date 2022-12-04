import React from 'react'
import { Link } from "react-router-dom";

const MenuPacientes = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link collapsed" data-bs-target="#citas-medicas-nav" data-bs-toggle="collapse" to={"#"}>
                    <i className="bi bi-people-fill" /><span>Citas Medicas</span><i className="bi bi-chevron-down ms-auto" />
                </Link>
                <ul id="citas-medicas-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <Link to={"#"}>
                            <i className="bi bi-circle" /><span>Reservar Citas</span>
                        </Link>
                    </li>
                </ul>
            </li>
        </>
    );
}

export default MenuPacientes;