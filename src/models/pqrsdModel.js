import supabase from '../db/index';

const Pqrsd = {

    getAllPQRSDs: async () => {
        const { data, error } = await supabase.from('pqrsd').select('*');
        if (error) {
            console.error('Error al obtener los PQRSD:', error);
            return error;
        }
        return data;
    },

    getPQRSDById: async (id) => {
        const { data, error } = await supabase
            .from('pqrsd')          // Nombre de la tabla
            .select('*')            // Selecciona todos los campos, puedes especificar campos también
            .eq('id', id)           // Filtro por id
            .single();              // Para obtener un solo resultado
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        return data;
    },

    createPQRSD: async (pqrsd) => {

    },

    updatePQRSD: async (id, updatePqrsd) => {

    },
};

export default Pqrsd;