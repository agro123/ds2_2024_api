import { Router } from 'express';
import userController from '../controllers/userController';
import pqrsController from '../controllers/pqrsController';

const router = Router();

// Users
router.get('/users/', userController.getUsers);          // Obtener todos los usuarios
router.get('/users/:id', userController.getUser);        // Obtener un usuario por ID
router.post('/users/', userController.createUser);       // Crear un nuevo usuario
router.put('/users/:id', userController.updateUser);     // Actualizar un usuario existente
router.delete('/users/:id', userController.deleteUser);  // Eliminar un usuario
router.post('/users/login/', userController.loginUser);  // login de usuarios


//PQRSD
router.get('/pqrsd/', pqrsController.getPqrds);          // Obtener todas las PQRS
router.post('/pqrsd/', pqrsController.createPqrsd);   
router.put('/pqrsd/:id', pqrsController.updatePqrsd);   // Crear nueva PQRS


export default router;