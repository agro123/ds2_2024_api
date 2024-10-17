import supabase from '../db/index';


const User = {
    getAllUsers: async () => {
        // * listo
        const { data, error } = await supabase.from('users').select('*');

        console.log(supabase, 'verificacion de la conexion al cliente');

        if (error) {
            console.error('Error al obtener los usuarios:', error);
            return error;
        }
        console.log(data, 'data traida desde la peticion');
        return data;
    },
    getUserById: async (id) => {
        //TODO: pendiente por implementar
        return users.find(user => user.id === id);
    },
    createUser: async (user) => {

        const { data, error } = await supabase.from('users').insert([
            { name: 'fernando', last_name: 'martines', username: 'feradmin', role: 2, created_by: 'castor', },
        ]).select();

        if (error) {
            console.error('Error al crear el usuario:', error);
            return error;
        }
        return data;
    },
    updateUser: (id, updatedUser) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    },
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
};

export default User;