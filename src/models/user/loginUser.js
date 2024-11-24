import supabase from '../../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    // Generar el token JWT
    const token = jwt.sign(
        { ...userWithoutPassword },
        process.env.JWT_SECRET,
        { expiresIn: '2w' }
    );

    return {...userWithoutPassword, token};
};

export default loginUser;
