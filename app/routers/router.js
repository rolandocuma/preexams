const express = require('express');
const router = express.Router();

// Controladores
const librosController = require('../controllers/libroscontroller.js');
const usuariosController = require('../controllers/usuariocontroller.js');
const autorController = require('../controllers/autorcontroller.js');

// Rutas para libros
router.post('/api/libros/create', librosController.create);
router.get('/api/libros/all', librosController.retrieveAllLibros);
router.get('/api/libros/onebyid/:id', librosController.getLibroById);
router.put('/api/libros/update/:id', librosController.updateById);
router.delete('/api/libros/delete/:id', librosController.deleteById);

// Rutas para usuarios
router.post('/api/usuarios/create', usuariosController.create);
router.get('/api/usuarios/all', usuariosController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuariosController.getUsuarioById);
router.put('/api/usuarios/update/:id', usuariosController.updateById);
router.delete('/api/usuarios/delete/:id', usuariosController.deleteById);

router.post('/api/autores/create', autorController.create);
router.get('/api/autores/all', autorController.retrieveAllAutores);
router.get('/api/autores/onebyid/:id', autorController.getAutorById);
router.put('/api/autores/update/:id', autorController.updateById);
router.delete('/api/autores/delete/:id', autorController.deleteById);

module.exports = router;
