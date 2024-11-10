import bcrypt from 'bcrypt';
import supabase from '../../db';

const saltRounds = 10; // Rondas de sal para encriptar la contraseña

const createUser = async (user) => {
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
        return {
            success: true,
            data: data,
        };
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        return error;
    }
};

export default createUser;














