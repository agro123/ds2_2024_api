import {getData} from '../data'

export const getStudentByCode = (req, res) => {
    const { code } = req.params;
    console.log(code)
    const student = getData(code);
    if(student){
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' })
    }
};
