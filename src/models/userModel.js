import supabase from '../db/index';
import bcrypt from 'bcrypt';

const User = {
    
    getAllUsers: async () => {
        // * listo
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            return error;
        }
        return data;
    },
    getUserById: async (id) => {
        // * listo
        const { data, error } = await supabase
            .from('users')      // Nombre de la tabla
            .select('*')        // Selecciona todos los campos, puedes especificar campos también
            .eq('id', id)       // Filtro por id
            .single();          // Para obtener un solo resultado
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        return data;
    },
    // createUser: async (user) => {
    //     //TODO: pendiente por implementar
    //     //? Kevin mi cielo
    //     // Recordar como crear un usuario con supabase.
        
    //     const { data, error } = await supabase.from('users').insert([
    //         { name: 'fernando', last_name: 'martines', email: 'feradmin', role: 2, created_by: 'castor', },
    //     ]).select();

    //     if (error) {
    //         console.error('Error al crear el usuario:', error);
    //         return error;
    //     }
    //     return data;
    // },
    createUser: async (user) => {
        const saltRounds = 10; // Rondas de sal para encriptar la contraseña
        try {
            // Encriptar la contraseña antes de crear el usuario
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            // Crear el usuario con la contraseña encriptada
            const { data, error } = await supabase.from('users').insert([{
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                username: user.username, 
                created_by: user.created_by,
                password: hashedPassword // Contraseña encriptada
            }]).select();

            if (error) {
                console.error('Error al crear el usuario:', error);
                return error;
            }
            return data;
        } catch (error) {
            console.error('Error al encriptar la contraseña:', error);
            return error;
        }
    },
    updateUser: (id, updatedUser) => {
        //TODO: pendiente por implementar
        // ? Alan mi amor
        // Pendiente para cuando  tenga la configuracion, explicar como eliminar un usuario.
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
    } ,


    loginUser: async (username, password) => {
  
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();  

        if (error || !user) {
            console.error('Usuario no encontrado o error en la búsqueda:', error);
            return { error: 'Usuario o contraseña incorrectos' };
        }

     
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: 'Usuario o contraseña incorrectos' };
        }

       
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },
};

export default User;