import supabase from '../../db';

const getAllUsers = async () => {
    // * listo
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error al obtener los usuarios:', error);
        return error;
    }
    return data;
};

export default getAllUsers;