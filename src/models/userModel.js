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
        const { data, error } = await supabase
            .from('users')  // Nombre de la tabla
            .select('*')   // Selecciona todos los campos, puedes especificar campos también
            .eq('id', id)      // Filtro por id
            .single()          // Para obtener un solo resultado
            
        if (error) {
            console.error('Error fetching user:', error)
            return null
        }
        return data
    },
    createUser: async (user) => {
        //TODO: pendiente por implementar
        //? Kevin mi cielo
        // Recordar como crear un usuario con supabase.
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
        //TODO: pendiente por implementar
        // Pendiente para cuando estefania tenga la configuracion, explicar como eliminar un usuario.
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    },
    deleteUser: (id) => {
        //TODO: pendiente por implementar
        //? Estefania 
        // tener en cuenta 
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
};

export default User;