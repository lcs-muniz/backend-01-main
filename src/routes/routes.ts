import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';

import * as ParticipanteController from '../controllers/ParticipanteController';
import * as EventoController from '../controllers/EventoController';
import * as ParticipanteEventoController from '../controllers/ParticipanteEventoController';

import * as ApiController from '../controllers/ApiController';
import { Aluno } from '../models/Aluno';

const router = Router();

// Testes
router.get("/api/listarTodosAlunos", ApiController.apiLista);
router.get("/api/cadastrarAluno", ApiController.apiCadastro);
router.get("/api/atualizarAluno", ApiController.apiAtualizar);


router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAlunoPorId/:alunoId', AlunoController.buscarAlunoPorId);

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);
router.get('/buscarDisciplinaPorId/:disciplinaId', DisciplinaController.buscarDisciplinaPorId);

router.get("/listarDisciplinasDoAluno/:alunoId", AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post("/vincularAlunoADisciplina", AlunoDisciplinaController.vincularAlunoDisciplina);

router.get('/listarTodosParticipantes', ParticipanteController.listarParticipantes);
router.post('/cadastrarParticipante', ParticipanteController.cadastrarParticipantes);
router.put('/atualizarParticipante/:participanteId', ParticipanteController.atualizarParticipante);
router.delete('/deletarParticipante/:participanteId', ParticipanteController.deletarParticipante);
router.get('/buscarParticipantePorId/:participanteId', ParticipanteController.buscarParticipantePorId);

router.get('/listarTodosEventos', EventoController.listarEventos);
router.post('/cadastrarEvento', EventoController.cadastrarEventos);
router.put('/atualizarEvento/:eventoId', EventoController.atualizarEvento);
router.delete('/deletarEvento/:eventoId', EventoController.deletarEvento);
router.get('/buscarEventoPorId/:eventoId', EventoController.buscarEventoPorId);

router.get("/listarEventosDoParticipante/:participanteId", ParticipanteEventoController.listarEventosDoParticipante);
router.post("/vincularParticipanteAEvento", ParticipanteEventoController.vincularParticipanteAEvento);

router

export default router;
