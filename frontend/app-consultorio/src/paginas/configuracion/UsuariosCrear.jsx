import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../componentes/BreadCrumb';
import Header from '../../componentes/Header';
import Sidebar from '../../componentes/Sidebar';
import APIInvoke from '../../helpers/APIInvoke.js';
import dominios from '../../helpers/dominios.js';
import mensaje from '../../helpers/mensajes.js';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const UsuariosCrear = () => {

    const navigate = useNavigate();

    const [nuevo, setNuevo] = useState({
        rol: '-8',
        nombres: '',
        apellidos: '',
        celular: '',
        correo: '',
        direccion: '',
        usuario: '',
        clave: '',
        estado: dominios.ESTADO_USUARIO_ACTIVO
    });

    const { rol, nombres, apellidos, celular, correo, direccion, usuario, clave } = nuevo;

    const onChange = (e) => {
        setNuevo({
            ...nuevo,
            [e.target.name]: e.target.value
        })
    }

    const [arregloRoles, setArregloRoles] = useState([]);

    const comboRoles = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles/combo-roles`);
        setArregloRoles(response);
    }

    useEffect(() => {
        comboRoles();
        document.getElementById('rol').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (nuevo.rol === "-8") {
            mensaje('error', 'Debe seleccionar un rol.');
            document.getElementById('rol').focus();
        } else {
            crear();
        }
    }

    const crear = async () => {
        const body = {
            idRol: nuevo.rol,
            nombresUsuario: nuevo.nombres,
            apellidosUsuario: nuevo.apellidos,
            celularUsuario: nuevo.celular,
            correoUsuario: nuevo.correo,
            direccionUsuario: nuevo.direccion,
            usuarioAcceso: nuevo.usuario,
            claveAcceso: nuevo.clave,
            estadoUsuario: nuevo.estado
        }

        const response = await APIInvoke.invokePOST(`/api/usuarios`, body);

        if (response.ok === "SI") {
            setNuevo({
                rol: '-8',
                nombres: '',
                apellidos: '',
                celular: '',
                correo: '',
                direccion: '',
                usuario: '',
                clave: '',
                estado: dominios.ESTADO_USUARIO_ACTIVO
            });

            mensaje('success', response.msg);
            navigate("/usuarios-admin");
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
                    breadCrumb1={"Configuración"}
                    breadCrumb2={"Listado Usuarios"}
                    breadCrumb3={"Crear Usuario"}
                    ruta={"/usuarios-admin"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Crear Usuario</h5>

                                        <form onSubmit={onSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="rol" className="col-sm-2 col-form-label">Seleccione el rol</label>
                                                <div className="col-sm-10">
                                                    <Form.Select aria-label="Default select example"
                                                        style={{ cursor: 'pointer' }}
                                                        id="rol"
                                                        name="rol"
                                                        value={rol}
                                                        onChange={onChange}
                                                    >
                                                        <option value="-8">SELECCIONE</option>
                                                        {
                                                            arregloRoles.map(
                                                                opcion =>
                                                                    <option key={opcion._id} value={opcion._id}>{opcion.nombreRol}</option>
                                                            )
                                                        }
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="nombres" className="col-sm-2 col-form-label">Nombres</label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                        className="form-control"
                                                        id="nombres"
                                                        name="nombres"
                                                        value={nombres}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="apellidos" className="col-sm-2 col-form-label">Apellidos</label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                        className="form-control"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        value={apellidos}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="celular" className="col-sm-2 col-form-label">Celular</label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                        className="form-control"
                                                        id="celular"
                                                        name="celular"
                                                        value={celular}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="correo" className="col-sm-2 col-form-label">Correo</label>
                                                <div className="col-sm-10">
                                                    <input type="email"
                                                        className="form-control"
                                                        id="correo"
                                                        name="correo"
                                                        value={correo}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                        className="form-control"
                                                        id="direccion"
                                                        name="direccion"
                                                        value={direccion}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="usuario" className="col-sm-2 col-form-label">Usuario Acceso</label>
                                                <div className="col-sm-10">
                                                    <input type="email"
                                                        className="form-control"
                                                        id="usuario"
                                                        name="usuario"
                                                        value={usuario}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="clave" className="col-sm-2 col-form-label">Clave Acceso</label>
                                                <div className="col-sm-10">
                                                    <input type="password"
                                                        className="form-control"
                                                        id="clave"
                                                        name="clave"
                                                        value={clave}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6 text-start">
                                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                                </div>

                                                <div className="col-lg-6 text-end">
                                                    <button type="reset" className="btn btn-secondary">Cancelar</button>
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

export default UsuariosCrear;