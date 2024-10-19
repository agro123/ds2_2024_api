import Pqrsd from '../models/pqrsd';


const getPqrds = async (req, res) => {
    const users = await Pqrsd.getAllPQRSDs();
    res.json(users);
};


export default {
    getPqrds,
};
