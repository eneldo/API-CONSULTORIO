import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../componentes/BreadCrumb';
import Header from '../../componentes/Header';
import Sidebar from '../../componentes/Sidebar';
import APIInvoke from '../../helpers/APIInvoke.js';
import mensaje from '../../helpers/mensajes.js';
import { Link } from "react-router-dom";
import dominios from '../../helpers/dominios.js';
import formatoFecha from '../../helpers/formatoFecha.js';

const AgendaCitasAdmin = () => {

    const [arreglo, setArreglo] = useState([]);

    const obtenerListar = async () => {
        const response = await APIInvoke.invokeGET(`/api/agenda-citas`);
        setArreglo(response);
    }

    useEffect(() => {
        obtenerListar();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/agenda-citas/${id}`);

        if (response.ok === "SI") {
            mensaje('success', response.msg);
            obtenerListar();
        } else {
            mensaje('error', response.msg);
        }
    }

    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
            <main id="main" className="main">
                <BreadCrumb
                    breadCrumb1={"Citas Medicas"}
                    breadCrumb2={"Listado Agenda Citas"}
                    breadCrumb3={""}
                    ruta={"/agenda-citas-admin"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Agenda Citas</h5>
                                        <div className="col-lg-12 mb-3">
                                            <Link to={"/agenda-citas-crear"} className="btn btn-primary">Crear</Link>
                                        </div>
                                        {
                                            arreglo.length === 0 ?
                                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                    No existen agenda de citas.
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                                                </div>

                                                :

                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Id</th>
                                                                <th style={{ width: '20%', textAlign: "center" }}>Especialidad</th>
                                                                <th style={{ width: '20%', textAlign: "center" }}>Medico</th>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Fecha</th>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Hora</th>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Consultorio</th>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Estado</th>
                                                                <th style={{ width: '10%', textAlign: "center" }}>Opciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                arreglo.map(
                                                                    elemento =>
                                                                        <tr key={elemento._id}>
                                                                            <td style={{ textAlign: "center" }}>{elemento._id}</td>
                                                                            <td style={{ textAlign: "center" }}>{elemento.idEspecialidad.nombreEspecialidad}</td>
                                                                            <td>{elemento.idMedico.nombresUsuario} {elemento.idMedico.apellidosUsuario}</td>
                                                                            <td style={{ textAlign: "center" }}>{formatoFecha(elemento.fechaCita, 1)}</td>
                                                                            <td style={{ textAlign: "center" }}>{elemento.horaCita}</td>
                                                                            <td style={{ textAlign: "center" }}>{elemento.numeroConsultorio}</td>
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {elemento.estadoCita === dominios.ESTADO_AGENDA_CITA_DISPONIBLE ? <span className="text-success">DISPONIBLE</span> :
                                                                                    elemento.estadoCita === dominios.ESTADO_AGENDA_CITA_NODISPONIBLE ? <span className="text-danger">NO DISPONIBLE</span> :
                                                                                        <span className="text-warning">CANCELADA</span>
                                                                                }
                                                                            </td>
                                                                            <td style={{ textAlign: "center" }}>
                                                                                <Link to={`/agenda-citas-editar/${elemento._id}`} className="btn btn-primary btn-sm" title="Editar">
                                                                                    <i className="bi bi-pencil-square"></i>
                                                                                </Link>
                                                                                &nbsp;
                                                                                <button onClick={(e) => borrar(e, elemento._id)} type="button" className="btn btn-danger btn-sm" title="Borrar">
                                                                                    <i className="bi bi-trash-fill"></i>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AgendaCitasAdmin;