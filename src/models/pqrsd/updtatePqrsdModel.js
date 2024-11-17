import supabase from '../../db/index';

const updtatePqrsdModel = async (id, updates) => {

    //validation 
    if (!id || !updates || typeof updates !== 'object') {
        console.error('ID o datos de actualización inválidos');
        return { success: false, error: 'ID o datos de actualización inválidos' };
    }


    const { data, error } = await supabase
        .from('pqrsd')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error al actualizar el PQRSD:', error);
        return { success: false, error };
    }

    return { success: true, data };
};

export default updtatePqrsdModel;
