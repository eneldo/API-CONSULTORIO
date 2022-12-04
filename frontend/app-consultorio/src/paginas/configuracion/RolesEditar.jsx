import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../componentes/BreadCrumb';
import Header from '../../componentes/Header';
import Sidebar from '../../componentes/Sidebar';
import APIInvoke from '../../helpers/APIInvoke.js';
import mensaje from '../../helpers/mensajes.js';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const RolesEditar = () => {

    //capturar parametros por la url
    const { id } = useParams();

    const navigate = useNavigate();

    const [editar, setEditar] = useState({
        nombre: '',
        estado: ''
    });

    const obtenerDocumento = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles/${id}`);
        setEditar({
            nombre: response.nombreRol,
            estado: response.estadoRol
        });
    }

    const { nombre, estado } = editar;

    const onChange = (e) => {
        setEditar({
            ...editar,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        obtenerDocumento();
        document.getElementById('nombre').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        actualizar();
    }

    const actualizar = async () => {
        const body = {
            nombreRol: editar.nombre,
            estadoRol: editar.estado
        }

        const response = await APIInvoke.invokePUT(`/api/roles/${id}`, body);

        if (response.ok === "SI") {
            mensaje('success', response.msg);
            navigate("/roles-admin");
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
                    breadCrumb2={"Listado Roles"}
                    breadCrumb3={"Editar Rol"}
                    ruta={"/roles-admin"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Editar Rol</h5>

                                        <form onSubmit={onSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                        className="form-control"
                                                        id="nombre"
                                                        name="nombre"
                                                        value={nombre}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="nombre" className="col-sm-2 col-form-label">Seleccione el estado</label>
                                                <div className="col-sm-10">
                                                    <Form.Select aria-label="Default select example"
                                                        style={{ cursor: 'pointer' }}
                                                        id="estado"
                                                        name="estado"
                                                        value={estado}
                                                        onChange={onChange}
                                                    >
                                                        <option value="1">ACTIVO</option>
                                                        <option value="2">INACTIVO</option>
                                                    </Form.Select>
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

export default RolesEditar;