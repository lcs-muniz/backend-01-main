import { Aluno } from './../models/Aluno';
import { Request, Response } from "express";

export const listarAlunos = async (req: Request, res: Response ) =>{
    const alunos = await Aluno.findAll();
    return res.json (alunos);
};

export const cadastrarAluno = async(req: Request, res: Response) => {
    const { nome, email, matricula } = req.body;

    let novoAluno = await Aluno.create({nome, email, matricula});

    res.status(201).json({
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
            return res.status(400).json("Aluno não encontrado!");
        }
        await aluno?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});
    
    } catch (error) {
        return res.status(400).json({message: "Erro do sistema"})        
    }
};

export const deletarAluno = async(req: Request, res: Response) =>{
    const { alunoId } = req.params;
    let aluno = await Aluno.findByPk(alunoId);        

    if(aluno){
       await aluno.destroy();
    return res.json("Aluno deletado com sucesso.");
    }

    return res.status(404).json({error: "Aluno não encontrado."});
};

