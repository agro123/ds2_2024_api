import supabase from '../../db';
import User from '../user';

const validateUserId = (userId) => {
    return !userId || typeof userId !== 'number';
};

const deleteUserInDatabase = async (userId) => {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
    return error;
};

const deleteUser = async (userId) => {
    try {
        console.log(userId, '------USER A VALIDAR-------');
        if (validateUserId(userId)) {
            return {
                success: false,
                message: 'Invalid user ID.',
            };
        }

        const userExist = await User.getUserById(userId);

        console.log(userExist, "---userExist--");

        if (!userExist) {
            return {
                success: false,
                message: 'User does not exist.',
            };
        }

        const error = await deleteUserInDatabase(userId);

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: 'User deleted successfully.',
        };

    } catch (error) {
        console.log(error, 'Se fue por el catch');
        return {
            success: false,
            message: 'Error while processing the request.',
        };
    }
};

export default deleteUser;