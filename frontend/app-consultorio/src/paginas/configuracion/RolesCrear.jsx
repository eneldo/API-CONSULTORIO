import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../componentes/BreadCrumb';
import Header from '../../componentes/Header';
import Sidebar from '../../componentes/Sidebar';
import APIInvoke from '../../helpers/APIInvoke.js';
import dominios from '../../helpers/dominios.js';
import mensaje from '../../helpers/mensajes.js';
import { useNavigate } from "react-router-dom";

const RolesCrear = () => {

    const navigate = useNavigate();

    const [nuevo, setNuevo] = useState({
        nombre: '',
        estado: dominios.ESTADO_ROL_ACTIVO
    });

    const { nombre } = nuevo;

    const onChange = (e) => {
        setNuevo({
            ...nuevo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        crear();
    }

    const crear = async () => {
        const body = {
            nombreRol: nuevo.nombre,
            estadoRol: nuevo.estado
        }

        const response = await APIInvoke.invokePOST(`/api/roles`, body);

        if (response.ok === "SI") {
            setNuevo({
                nombre: '',
                estado: dominios.ESTADO_ROL_ACTIVO
            });

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
                    breadCrumb3={"Crear Rol"}
                    ruta={"/roles-admin"}
                />

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Crear Rol</h5>

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

export default RolesCrear;