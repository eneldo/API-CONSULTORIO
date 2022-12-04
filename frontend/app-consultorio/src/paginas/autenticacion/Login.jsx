import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../helpers/APIInvoke.js';
import mensaje from '../../helpers/mensajes.js';

const Login = () => {

    //para redirecionar a otro componente
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        usuario: '',
        clave: ''
    });

    const { usuario, clave } = login;

    const onChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById('usuario').focus();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    const iniciarSesion = async () => {
        const body = {
            usuarioAcceso: login.usuario,
            claveAcceso: login.clave
        }

        const response = await APIInvoke.invokePOST(`/api/usuarios/login`, body);

        if (response.ok === "NO_EXISTE") {
            mensaje('error', response.msg)
        } else if (response.ok === "CLAVE_INCONRRECTA") {
            mensaje('error', response.msg)
        } else {
            //borrar datos del localstorage
            localStorage.removeItem('token');
            localStorage.removeItem('iduser');
            localStorage.removeItem('username');
            localStorage.removeItem('rol');

            //obtenemos el token
            const token = response.tokenJwt;

            //obtener el id y nombre usuario
            const idUsuario = response._id;
            const nombreUsuario = response.nombresUsuario;
            const idRol = response.rol;

            //guardar datos en el localstorage
            localStorage.setItem('token', token);
            localStorage.setItem('iduser', idUsuario);
            localStorage.setItem('username', nombreUsuario);
            localStorage.setItem('rol', idRol);

            //redireccinamos al componente menu principal
            navigate("/dashboard");
        }
    }

    return (
        <>
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Iniciar Sesión</h5>
                                                <p className="text-center small">Bienvenido, ingrese sus credenciales</p>
                                            </div>
                                            <form className="row g-3 needs-validation" onSubmit={onSubmit}>
                                                <div className="col-12">
                                                    <label htmlFor="usuario" className="form-label">Usuario</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="usuario"
                                                            name="usuario"
                                                            value={usuario}
                                                            onChange={onChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="clave" className="form-label">Contraseña</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        id="clave"
                                                        name="clave"
                                                        value={clave}
                                                        onChange={onChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Ingresar</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">No tienes cuenta? <Link to={"/crear-cuenta"}>Crear Cuenta</Link></p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Login;