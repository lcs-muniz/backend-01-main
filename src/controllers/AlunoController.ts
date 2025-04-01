import { Aluno } from './../models/Aluno';
import { Request, Response } from "express";
import { AlunoDisciplina } from '../models/AlunoDisciplina';

export const listarAlunos = async (req: Request, res: Response ) : Promise<Response> =>{
    const alunos = await Aluno.findAll();
    return res.json (alunos);
};

export const cadastrarAluno = async(req: Request, res: Response) : Promise<Response> => {
    const { nome, email, matricula } = req.body;

    let novoAluno = await Aluno.create({nome, email, matricula});

    return res.status(201).json({
        message: "Aluno cadastrado com sucesso.",
        novoAluno
    });
};

export const atualizarAluno = async(req: Request, res: Response) =>{
    try {
        const { alunoId } = req.params;
        const { dadosAtualizados } = req.body;
    
        const aluno = await Aluno.findByPk(alunoId);
        
        if(!aluno){
            return res.status(404).json("Aluno não encontrado!");
        }
        await aluno.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        return res.status(200).json({message: "Aluno Atualizado com sucesso.", aluno});
    
    } catch (error) {
        return res.status(500).json({message: "Erro do sistema"})        
    }
};

export const deletarAluno = async(req: Request, res: Response) : Promise<Response> =>{
    const { alunoId } = req.params;
    let aluno = await Aluno.findByPk(alunoId);        

    if(!aluno){
        return res.status(404).json("Aluno não encontrado.");
    }

    const vinculoDisciplina = await AlunoDisciplina.findOne({ where: { alunoId: aluno.id } });
    if (vinculoDisciplina) {
        return res.status(400).json({ error: "Não é possível deletar, aluno vinculado a uma disciplina." });
    }

    await aluno.destroy();
    return res.json("Aluno deletado com sucesso.");
};

export const buscarAlunoPorId = async(req:Request, res: Response) : Promise<Response> =>{
    const { alunoId } = req.params;
    let aluno = await Aluno.findByPk(alunoId);
    
    if (!aluno){
        return res.status(404).json("Aluno não encontrado.");
    }

    await aluno.get(alunoId);
    return res.status(200).json({message: "Aluno Encontrado:", aluno});
}
