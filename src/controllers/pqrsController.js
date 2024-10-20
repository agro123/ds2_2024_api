import Pqrsd from '../models/pqrsd';


const getPqrds = async (req, res) => {
    const users = await Pqrsd.getAllPQRSDs();
    res.json(users);
};

// Crear nueva Pqrsd
const createPqrsd = async (req, res) => {
    const newPqrsd = await Pqrsd.createPqrsd(req.body);
    res.status(201).json(newPqrsd);
};

export default {
    getPqrds,
    createPqrsd
};
