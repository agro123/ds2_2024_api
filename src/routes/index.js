import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

// Users
router.get('/users/', userController.getUsers);          // Obtener todos los usuarios
router.get('/users/:id', userController.getUser);        // Obtener un usuario por ID
router.post('/users/', userController.createUser);       // Crear un nuevo usuario
router.put('/users/:id', userController.updateUser);     // Actualizar un usuario existente
router.delete('/users/:id', userController.deleteUser);  // Eliminar un usuario

//PQRSD
router.get('/pqrsd/', userController.getUsers);          // Obtener todos los usuarios
router.get('/pqrsd/:id', userController.getUser);        // Obtener un usuario por ID
router.post('/pqrsd/', userController.createUser);       

export default router;