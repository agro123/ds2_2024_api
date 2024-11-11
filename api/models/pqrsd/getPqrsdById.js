import supabase from "../../db";


const getPQRSDById = async (id) => {
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
};

export default getPQRSDById;