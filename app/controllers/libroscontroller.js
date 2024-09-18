const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado con éxito, ID = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro",
            error: error.message
        });
    }
};

exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Libros obtenidos con éxito",
                libros: libros
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los libros",
                error: error
            });
        });
};

exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido con ID = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el libro",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro para actualizar con ID = " + libroId,
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };

            let result = await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "No se pudo actualizar el libro con ID = " + req.params.id,
                    error: "Error en la actualización"
                });
            } else {
                res.status(200).json({
                    message: "Libro actualizado con éxito, ID = " + libroId,
                    libro: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con ID = " + libroId,
                error: "404"
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado con éxito, ID = " + libroId,
                libro: libro
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
};
