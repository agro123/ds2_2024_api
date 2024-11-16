import User from '../models/user';


// Obtener todos los usuarios
const getUsers = async (req, res) => {
    const users = await User.getAllUsers();
    res.json(users);
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
    const user = await User.getUserById(parseInt(req.params.id));
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
const updateUser = async (req, res) => {
    const updatedUserResult = await User.updateUser(parseInt(req.params.id), req.body);
    if (!updatedUserResult.success) {
        res.status(404).json({ message: updatedUserResult.message });
    }
    res.status(200).json(updatedUserResult.data);
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const deletedUser = await User.deleteUser(parseInt(req.params.id));
    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Llamamos al método loginUser del modelo
    const user = await User.loginUser(username, password);

    // Si hay un error en la autenticación
    if (user.error) {
        return res.status(401).json({ message: user.error }); // 401 Unauthorized
    }

    // Si la autenticación es exitosa, retorna la información del usuario
    res.json(user);
};
export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
