import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';

import * as ParticipanteController from '../controllers/ParticipanteController'
import * as EventoController from '../controllers/EventoController'
import * as ParticipanteEventoController from '../controllers/ParticipanteEventoController'

const router = Router();

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);

router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoDisciplina);

router.get('/listarTodosParticipantes', ParticipanteController.listarParticipantes);
router.post('/cadastrarParticipante', ParticipanteController.cadastrarParticipantes);

router.get('/listarTodosEventos', EventoController.listarEventos);
router.post('/cadastrarEvento', EventoController.cadastrarEventos);

router.get("/listarEventosDoParticipante/:participanteId", ParticipanteEventoController.listarEventosDoParticipante);
router.post("/vincularParticipanteAEvento", ParticipanteEventoController.vincularParticipanteAEvento);

router

export default router;
