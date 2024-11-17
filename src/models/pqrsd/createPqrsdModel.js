import supabase from '../../db';

const createPqrsd = async (pqrsd) => {
    try {
        const { data, error } = await supabase
            .from('pqrsd')
            .insert([{
                first_name: pqrsd.first_name,
                last_name: pqrsd.last_name,
                type_document: pqrsd.type_document,
                number_document: pqrsd.number_document,
                object_pqrsd: pqrsd.object_pqrsd,
                status: 0,
                email: pqrsd.email,
                type_pqrsd: pqrsd.type_pqrsd,
            }])
            .select();

        if (error) {
            return error;
        }

        return data;
    } catch (error) {
        return error.message || 'Error inesperado';
    }
};


export default createPqrsd;