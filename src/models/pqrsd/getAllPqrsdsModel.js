import supabase from '../../db/index';

const getAllPQRSDs = async () => {
    const { data, error } = await supabase.from('pqrsd').select('*');
    if (error) {
        console.error('Error al obtener los PQRSD:', error);
        return error;
    }
    return data;
};

export default getAllPQRSDs;
