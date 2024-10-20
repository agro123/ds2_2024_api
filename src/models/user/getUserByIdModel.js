import supabase from '../../db';

const getUserById = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
};

export default getUserById;