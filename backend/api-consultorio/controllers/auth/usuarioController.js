import Usuario from "../../models/auth/Usuario.js";
import generarJWT from "../../helpers/generarJWT.js";
import dominios from "../../helpers/dominios.js";

const agregar = async (req, res) => {
    //evitar usuarios duplicaods por el usuario de acceso
    const { usuarioAcceso } = req.body;

    //validar si existe un usuario por el usuario accesso
    const existeUsuario = await Usuario.findOne({ usuarioAcceso });

    if (existeUsuario) {
        const error = new Error("Usuario ya esta registrado en la base de datos.");
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, ok: "SI", msg: "Documento creado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    const usuarios = await Usuario.find().populate('idRol', {
        nombreRol: 1,
        _id: 0
    });
    res.json(usuarios);
}

const eliminar = async (req, res) => {
    //recibir los parametros de la url
    const { id } = req.params;

    //validamos si existe el usuario
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Documento no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    try {
        await usuario.deleteOne();
        res.json({ msg: "Documento eliminado correctamente.", ok: "SI" });
    } catch (error) {
        console.log(error);
    }

}

const editar = async (req, res) => {
    //recibir los parametros de la url
    const { id } = req.params;

    //validamos si existe el usuario
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Documento no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    //recibir los datos enviados desde el formulario
    usuario.idRol = req.body.idRol || usuario.idRol;
    usuario.nombresUsuario = req.body.nombresUsuario || usuario.nombresUsuario;
    usuario.apellidosUsuario = req.body.apellidosUsuario || usuario.apellidosUsuario;
    usuario.celularUsuario = req.body.celularUsuario || usuario.celularUsuario;
    usuario.correoUsuario = req.body.correoUsuario || usuario.correoUsuario;
    usuario.direccionUsuario = req.body.direccionUsuario || usuario.direccionUsuario;
    usuario.usuarioAcceso = req.body.usuarioAcceso || usuario.usuarioAcceso;
    usuario.claveAcceso = req.body.claveAcceso || usuario.claveAcceso;
    usuario.estadoUsuario = req.body.estadoUsuario || usuario.estadoUsuario;

    try {
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, msg: "Documento actualizado correctamente.", ok: "SI" })
    } catch (error) {
        console.log(error);
    }
}

const listarUno = async (req, res) => {
    //recibir los parametros de la url
    const { id } = req.params;

    //validamos si existe el usuario
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Documento no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO" });
    }

    res.json(usuario);
}

const autenticar = async (req, res) => {
    const { usuarioAcceso, claveAcceso } = req.body;

    //comprobar el usuario existe
    const usuario = await Usuario.findOne({ usuarioAcceso });

    if (!usuario) {
        const error = new Error("El usuario no existe.");
        return res.status(404).json({ msg: error.message, ok: "NO_EXISTE" });
    }

    //comprobar si la contraseña es correcta
    if (await usuario.comprobarClave(claveAcceso)) {
        res.json({
            _id: usuario._id,
            nombresUsuario: usuario.nombresUsuario,
            usuarioAcceso: usuario.usuarioAcceso,
            tokenJwt: generarJWT(usuario._id),
            rol: usuario.idRol
        });
    } else {
        const error = new Error("La clave es incorrecta.")
        res.json({ msg: error.message, ok: "CLAVE_INCONRRECTA" });
    }
}

const crearCuenta = async (req, res) => {
    //evitar usuarios duplicaods por el usuario de acceso
    const { usuarioAcceso } = req.body;

    //validar si existe un usuario por el usuario accesso
    const existeUsuario = await Usuario.findOne({ usuarioAcceso });

    if (existeUsuario) {
        const error = new Error("Usuario ya esta registrado en la base de datos.");
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        res.json({ body: usuarioGuardado, ok: "SI", msg: "Documento creado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const comboMedicos = async (req, res) => {
    const medicos = await Usuario.find({ "idRol": dominios.ID_ROL_MEDICO });
    res.json(medicos);
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno,
    autenticar,
    crearCuenta,
    comboMedicos
}