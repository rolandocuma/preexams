module.exports = (sequelize, Sequelize) => {

    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        fecha_registro: {
            type: Sequelize.DATE
        },
        estatus: {
            type: Sequelize.INTEGER
        }
    });

    return Usuario;
};
