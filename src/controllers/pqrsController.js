import Pqrsd from '../models/pqrsd';


const getPqrds = async (req, res) => {
    const pqrs = await Pqrsd.getAllPQRSDs();
    res.json(pqrs);

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
