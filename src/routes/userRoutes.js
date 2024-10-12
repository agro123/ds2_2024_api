import { Router } from 'express';
import controller from '../controllers/userController';

const router = Router();

// Definir las rutas para el CRUD
router.get('/', controller.getUsers);       // Obtener todos los usuarios
router.get('/:id', controller.getUser);    // Obtener un usuario por ID
router.post('/', controller.createUser);    // Crear un nuevo usuario
router.put('/:id', controller.updateUser); // Actualizar un usuario existente
router.delete('/:id', controller.deleteUser); // Eliminar un usuario

export default router
