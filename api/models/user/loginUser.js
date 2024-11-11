import supabase from '../../db';
import bcrypt from 'bcrypt';


const loginUser = async (username, password) => {

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
};

export default loginUser;
