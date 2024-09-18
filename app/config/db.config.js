const env = require('./env.js');
const Sequelize = require('sequelize'); 
const { pool } = env; 

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false, 
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.Libros = require('../models/libros.js')(sequelize, Sequelize);
db.Autor = require('../models/autor.js')(sequelize, Sequelize);

module.exports = db;