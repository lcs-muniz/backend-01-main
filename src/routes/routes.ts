import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController'

const router = Router();

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);

router

export default router;
