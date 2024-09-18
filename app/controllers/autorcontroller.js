const db = require('../config/db.config.js');
const Autor = db.Autor;

// Crear un nuevo autor
exports.create = (req, res) => {
    let autor = {};

    try {
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        Autor.create(autor).then(result => {
            res.status(200).json({
                message: "Autor creado con éxito, id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el autor",
            error: error.message
        });
    }
};

// Obtener todos los autores
exports.retrieveAllAutores = (req, res) => {
    Autor.findAll()
        .then(autores => {
            res.status(200).json({
                message: "Autores obtenidos con éxito",
                autores: autores
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los autores",
                error: error
            });
        });
};

// Obtener un autor por su ID
exports.getAutorById = (req, res) => {
    let autorId = req.params.id;
    Autor.findByPk(autorId)
        .then(autor => {
            res.status(200).json({
                message: "Autor obtenido con id = " + autorId,
                autor: autor
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el autor",
                error: error
            });
        });
};

// Actualizar un autor por su ID
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró el autor con id = " + autorId,
                autor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };

            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });
            
            res.status(200).json({
                message: "Autor actualizado con id = " + autorId,
                autor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el autor",
            error: error.message
        });
    }
};

// Eliminar un autor por su ID
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró el autor con id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Autor eliminado con id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el autor",
            error: error.message,
        });
    }
};
