import { Router } from 'express';
import userController from '../controllers/userController';
import pqrsController from '../controllers/pqrsController';

const publicRouter = Router();
const privateRouter = Router();

// Users
privateRouter.get('/users/', userController.getUsers);          // Obtener todos los usuarios
privateRouter.get('/users/:id', userController.getUser);        // Obtener un usuario por ID
privateRouter.post('/users/', userController.createUser);       // Crear un nuevo usuario
privateRouter.put('/users/:id', userController.updateUser);     // Actualizar un usuario existente
privateRouter.delete('/users/:id', userController.deleteUser);  // Eliminar un usuario
publicRouter.post('/users/login/', userController.loginUser);  // login de usuarios


//PQRSD
privateRouter.get('/pqrsd/', pqrsController.getPqrds);          // Obtener todas las PQRS
publicRouter.post('/pqrsd/', pqrsController.createPqrsd);   
privateRouter.put('/pqrsd/:id', pqrsController.updatePqrsd);   // Crear nueva PQRS


export default {
    publicRouter,
    privateRouter
};