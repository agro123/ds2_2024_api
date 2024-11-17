import Pqrsd from '../models/pqrsd';
import updtatePqrsdModel from '../models/pqrsd/updtatePqrsdModel';


const getPqrds = async (req, res) => {
    const pqrs = await Pqrsd.getAllPQRSDs();
    res.json(pqrs);

};

// Crear nueva Pqrsd
const createPqrsd = async (req, res) => {
    const newPqrsd = await Pqrsd.createPqrsd(req.body);
    res.status(201).json(newPqrsd);
};


const updatePqrsd = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id) return res.status(400).json({ message: 'Falta el campo "id"' });

    const missingFields = ['first_name', 'last_name', 'type_document', 'number_document', 'status', 'email', 'created_at', 'type_pqrsd', 'object_pqrsd']
        .filter(field => !updates[field]);

    if (missingFields.length) return res.status(400).json({ message: `Faltan campos: ${missingFields.join(', ')}` });

    try {
        const updatedPqrsd = await updtatePqrsdModel(id, updates);
        if (updatedPqrsd.success) return res.status(200).json(updatedPqrsd);
        return res.status(400).json({ message: 'No se pudo actualizar el PQRSD', error: updatedPqrsd.error });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};


export default {
    getPqrds,
    createPqrsd,
    updatePqrsd
};
