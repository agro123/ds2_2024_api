import supabase from '../../db';
import bcrypt from 'bcrypt';
import User from '.';


const saltRounds = 10; // Rondas de sal para encriptar la contraseña

const validateUserData = (userData) => {
    return !userData || (typeof userData === 'object' && Object.keys(userData).length === 0);
};

const encryptPasswordIfPresent = async (userData) => {
    let password = userData.password;
    if (userData.password) {
        password = await bcrypt.hash(password, saltRounds).catch(() => {
            console.error('error aqui');
        });
    }
    
    return { ...userData, password };
};

const updateUserInDatabase = async (userId, userData) => {
    const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);

    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data: userData,
    };
};

const updateUser = async (userId, userData) => {
    try {
    const userExist = true;//await User.getUserById(userId);

    if (validateUserData(userData) || !userExist) {
        return {
            success: false,
            message: 'User data is invalid or user does not exist.',
        };
    }

    const updatedUserData = await encryptPasswordIfPresent(userData);
    const updateResult = await updateUserInDatabase(userId, updatedUserData);

    return updateResult;
    } catch (error) {
        return {
            success: false,
            message: 'Error al procesar la solicitud.',
        };
    }
};

export default updateUser;