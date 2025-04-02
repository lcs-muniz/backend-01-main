import { Request, Response } from "express";
import { Participante } from "../models/Participante";
import { ParticipanteEvento } from "../models/ParticipanteEvento";

export const listarParticipantes = async (req: Request, res: Response ) =>{
    const participantes = await Participante.findAll();
    return res.json (participantes);
};

export const cadastrarParticipantes = async(req: Request, res: Response) => {
    const { nome, email } = req.body;

    let novoParticipante = await Participante.create({nome, email});

    res.status(201).json({
        message: "Participante cadastrado com sucesso.",
        novoParticipante
    });
};

export const atualizarParticipante = async(req: Request, res: Response) : Promise<Response> => {
    try {
        const { participanteId } = req.params;
        const dadosAtualizados = req.body;
    
        const participante = await Participante.findByPk(participanteId);
        
        if(!participante){
            return res.status(404).json({error:"Participante não encontrado!"});
        }
        await participante?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        return res.status(200).json({message: "Participante Atualizado com sucesso.", participante});
    
    } catch (error) {
        return res.status(500).json({message: "Erro do sistema.", error });        
    }
};

export const deletarParticipante = async(req: Request, res: Response) : Promise<Response> =>{
    const { participanteId } = req.params;
    let participante = await Participante.findByPk(participanteId);        

    if(!participante){
        return res.status(404).json({error: "Participante não encontrado."});
    }

    const vinculoEvento = await ParticipanteEvento.findOne({ where: { participanteId: participante.id } });
    if (vinculoEvento) {
        return res.status(400).json({ error: "Não é possível deletar, participante vinculado a um evento." });
    }

    await participante.destroy();
    return res.json({message: "Participante deletado com sucesso."});
};

export const buscarParticipantePorId = async(req:Request, res: Response) : Promise<Response> =>{
    const { participanteId } = req.params;
    let participante = await Participante.findByPk(participanteId);
    
    if (!participante){
        return res.status(404).json({error: "Participante não encontrado."});
    }

    await participante.get(participanteId);
    return res.status(200).json({message: "Participante Encontrado:", participante});
}
