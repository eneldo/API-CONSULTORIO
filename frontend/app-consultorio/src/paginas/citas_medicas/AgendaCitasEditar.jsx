import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../componentes/BreadCrumb';
import Header from '../../componentes/Header';
import Sidebar from '../../componentes/Sidebar';
import APIInvoke from '../../helpers/APIInvoke.js';
import mensaje from '../../helpers/mensajes.js';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import dominios from '../../helpers/dominios.js';

const AgendaCitasEditar = () => {
    //recibir el id por la url
    const { id } = useParams();

    const navigate = useNavigate();

    const [medico, setMedico] = useState('-8');
    const [fecha, setFecha] = useState('');
    const [arregloMedicos, setArregloMedicos] = useState([]);
    const [especialidad, setEspecialidad] = useState('-8');
    const [arregloEspecialidades, setArregloEspecialidades] = useState([]);
    const [hora, setHora] = useState('');
    const [numeroConsultorio, setNumeroConsultorio] = useState('');
    const [estado, setEstado] = useState('');

    const comboMedicos = async () => {
        const response = await APIInvoke.invokeGET(`/api/usuarios/combo-medicos`);
        setArregloMedicos(response);
    }

    const comboEspecialidades = async () => {
        const response = await APIInvoke.invokeGET(`/api/especialidades`);
        setArregloEspecialidades(response);
    }

    const listarUno = async () => {
        const response = await APIInvoke.invokeGET(`/api/agenda-citas/${id}`);
        setMedico(response.idMedico);
        setFecha(response.fechaCita);
        setEspecialidad(response.idEspecialidad);
        setHora(response.horaCita);
        setNumeroConsultorio(response.numeroConsultorio);
        setEstado(response.estadoCita);
    }

    useEffect(() => {
        comboEspecialidades();
        comboMedicos();
        listarUno();
        document.getElementById('medico').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (medico === "-8") {
            mensaje('error', 'Debe seleccionar un medico.');
        } else if (especialidad === "-8") {
            mensaje('error', 'Debe seleccionar una especialidad.');
        } else {
            editar();
        }

    }

    const editar = async () => {
        const body = {
            idMedico: medico,
            idEspecialidad: especialidad,
            fechaCita: fecha,
            horaCita: hora,
            numeroConsultorio: numeroConsultorio,
            estadoCita: estado
        }

        const response = await APIInvoke.invokePUT(`/api/agenda-citas/${id}`, body);

        if (response.ok === "SI") {
            mensaje('success', response.msg);
            navigate("/agenda-citas-admin");
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
                    breadCrumb3={"Editar Agenda Cita"}
                    ruta={"/agenda-citas-admin"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Editar Agenda Citas</h5>

                                        <form onSubmit={onSubmit}>

                                            <div className="row mb-3">
                                                <label htmlFor="medico" className="col-sm-2 col-form-label">Seleccione un medico</label>
                                                <div className="col-sm-10">
                                                    <Form.Select aria-label="Default select example"
                                                        style={{ cursor: 'pointer' }}
                                                        id="medico"
                                                        name="medico"
                                                        value={medico}
                                                        onChange={e => setMedico(e.target.value)}
                                                    >
                                                        <option value="-8">SELECCIONE</option>
                                                        {
                                                            arregloMedicos.map(
                                                                opcion =>
                                                                    <option key={opcion._id} value={opcion._id}>{opcion.nombresUsuario} {opcion.apellidosUsuario}</option>
                                                            )
                                                        }

                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="especialidad" className="col-sm-2 col-form-label">Seleccione una especialidad</label>
                                                <div className="col-sm-10">
                                                    <Form.Select aria-label="Default select example"
                                                        style={{ cursor: 'pointer' }}
                                                        id="especialidad"
                                                        name="especialidad"
                                                        value={especialidad}
                                                        onChange={e => setEspecialidad(e.target.value)}
                                                    >
                                                        <option value="-8">SELECCIONE</option>
                                                        {
                                                            arregloEspecialidades.map(
                                                                opcion =>
                                                                    <option key={opcion._id} value={opcion._id}>{opcion.nombreEspecialidad}</option>
                                                            )
                                                        }

                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="fecha" className="col-sm-2 col-form-label">Fecha</label>
                                                <div className="col-sm-10">
                                                    <input type="date"
                                                        style={{ cursor: 'pointer' }}
                                                        className="form-control"
                                                        id="fecha"
                                                        name="fecha"
                                                        value={fecha}
                                                        onChange={e => setFecha(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="hora" className="col-sm-2 col-form-label">Hora</label>
                                                <div className="col-sm-10">
                                                    <input type="time"
                                                        className="form-control"
                                                        id="hora"
                                                        name="hora"
                                                        value={hora}
                                                        onChange={e => setHora(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="numeroConsultorio" className="col-sm-2 col-form-label">Nro Consultorio</label>
                                                <div className="col-sm-10">
                                                    <input type="number"
                                                        className="form-control"
                                                        id="numeroConsultorio"
                                                        name="numeroConsultorio"
                                                        value={numeroConsultorio}
                                                        onChange={e => setNumeroConsultorio(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="estado" className="col-sm-2 col-form-label">Seleccione un estado</label>
                                                <div className="col-sm-10">
                                                    <Form.Select aria-label="estado"
                                                        style={{ cursor: 'pointer' }}
                                                        id="estado"
                                                        name="estado"
                                                        value={estado}
                                                        onChange={e => setEstado(e.target.value)}
                                                    >
                                                        <option value="1">DISPONIBLE</option>
                                                        <option value="2">NO DISPONIBLE</option>
                                                        <option value="3">CANCELADA</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6 text-start">
                                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                                </div>
                                            </div>
                                        </form>
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

export default AgendaCitasEditar;