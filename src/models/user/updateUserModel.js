import supabase from '../../db';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Rondas de sal para encriptar la contraseña

const validateUserData = (userData) => {
    return !userData || (typeof userData === 'object' && Object.keys(userData).length === 0);
};

const encryptPasswordIfPresent = async (userData) => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    return userData;
};

const updateUserInDatabase = async (userId, userData) => {
    const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);
    return error;
};

const updateUser = async (userId, userData) => {
    try {
        const userExist = await User.getUserById(userId);
        if (validateUserData(userData) || !userExist) {
            return {
                success: false,
                message: 'User data is invalid or user does not exist.',
            };
        }

        const updatedUserData = await encryptPasswordIfPresent(userData);
        const error = await updateUserInDatabase(userId, updatedUserData);

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            data: updatedUserData,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al procesar la solicitud.',
        };
    }
};

export default updateUser;