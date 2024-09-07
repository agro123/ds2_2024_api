import { Router } from 'express';
import { getStudentByCode } from '../controllers/studentsController';

const router = Router();

router.get('/student/:code', getStudentByCode);

export default router;
