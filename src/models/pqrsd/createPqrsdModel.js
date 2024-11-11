import supabase from '../../db';

const createPqrsd = async (user) => {
    try {
        const { data, error } = await supabase
            .from('pqrsd')
            .insert([{
                first_name: user.first_name,
                last_name: user.last_name,
                type_document: user.type_document,
                number_document: user.number_document,
                object_pqrsd: user.object_pqrsd,
                response_email: false,
                status: 1,
                email: user.email,
                type_pqrsd: user.type_pqrsd,
            }])
            .select();

        // Verificamos si hay un error y lo devolvemos
        if (error) {
            return error;  // Aquí devolvemos el error tal cual
        }

        return data; // Devolver los datos si no hay error
    } catch (error) {
        return error.message || 'Error inesperado';  // Manejo de errores inesperados
    }
};


export default createPqrsd;
