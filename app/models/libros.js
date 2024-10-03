module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("libro", {
        id_libro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        isbn: {
            type: Sequelize.STRING
        },
        editorial: {
            type: Sequelize.STRING
        },
        anio_publicacion: {
            type: Sequelize.STRING
        },
        categoria: {
            type: Sequelize.STRING
        },
        cantidad_disponible: {
            type: Sequelize.STRING
        },
        ubicacion: {
            type: Sequelize.STRING
        }
    });
    return Libro;
};
