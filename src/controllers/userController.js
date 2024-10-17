import User from '../models/userModel';

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    const users = await User.getAllUsers();
    console.log(users);
    res.json(users);
};

// Obtener un usuario por ID
const getUser = (req, res) => {
    const user = User.getUserById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
};

// Actualizar un usuario existente
const updateUser = (req, res) => {
    const updatedUser = User.updateUser(parseInt(req.params.id), req.body);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Eliminar un usuario
const deleteUser = (req, res) => {
    const deletedUser = User.deleteUser(parseInt(req.params.id));
    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
