import { Request, Response } from "express";
import { Disciplina } from "../models/Disciplina";
import { AlunoDisciplina } from "../models/AlunoDisciplina";

export const listarDisciplinas = async (req: Request, res: Response) : Promise<Response> => {
    const disciplinas = await Disciplina.findAll();
    return res.json(disciplinas);
}

export const cadastrarDisciplina = async (req: Request, res: Response) : Promise<Response> => {
    const { nome } = req.body;

    if (nome){
        let disciplinaExistente = await Disciplina.findOne({where: { nome } });
        if(!disciplinaExistente) {
            let novaDisciplina = await Disciplina.create({ nome });

            res.status(201);
            return res.json({
                message: "Disciplina cadastrada com sucesso.", 
                novaDisciplina
            });
        } else{
            return res.status(400).json({ error: "Nome da disciplina já existe."});
        }
    }

    return res.status(400).json({ error: "Nome da disciplina não enviado." });
};

export const atualizarDisciplina = async(req: Request, res: Response) : Promise<Response> =>{
    try {
        const { disciplinaId } = req.params;
        const { dadosAtualizados } = req.body;
    
        const disciplina = await Disciplina.findByPk(disciplinaId);
        
        if(!disciplinaId){
            return res.status(400).json("Disciplina não encontrado!");
        }
        await disciplina?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        return res.status(200).json({message: "Disciplina atualizado com sucesso.", disciplina});
    
    } catch (error) {
        return res.status(400).json({message: "Erro ao atualizar a Disciplina.", error});        
    }
};

export const deletarDisciplina = async(req: Request, res: Response) : Promise<Response> =>{
    const { disciplinaId } = req.params;
    let disciplina = await Disciplina.findByPk(disciplinaId);        

    if(!disciplina){
       return res.status(404).json({erro:"Disciplina não encontrada."});
    }

    const vinculoAluno = await AlunoDisciplina.findOne({where: {disciplinaId:disciplina.id}});
    if(vinculoAluno) {
        return res.status(400).json({error:"Nào é possível deletar, disciplina vinculada a um aluno"});
    }

    await disciplina.destroy();
    return res.json("Disciplina cadastrada com sucesso.");
};

export const buscarDisciplinaPorId = async(req:Request, res: Response) : Promise<Response> =>{
    const { disciplinaId } = req.params;
    let disciplina = await Disciplina.findByPk(disciplinaId);
    
    if (!disciplina){
        return res.status(404).json("Disciplina não encontrada.");
    }

    await disciplina.get(disciplinaId);
    return res.status(200).json({message: "Disciplina Encontrada:", disciplina});
}