import { Request, Response } from "express";
import { Evento } from "../models/Evento";
import { ParticipanteEvento } from "../models/ParticipanteEvento";

export const listarEventos = async (req: Request, res: Response) => {
    const eventos = await Evento.findAll();
    return res.json(eventos);
}

export const cadastrarEventos = async (req: Request, res: Response) => {
    const { nome } = req.body;

    if (nome){
        let eventoExistente = await Evento.findOne({where: { nome } });
        if(!eventoExistente) {
            let novoEvento = await Evento.create({ nome });

            res.status(201);
            return res.json({
                message: "Evento cadastrao com sucesso.", 
                novoEvento
            });
        } else{
            return res.status(400).json({ error: "Nome do evento já existe."});
        }
    }

    return res.status(400).json({ error: "Nome do evento não enviado." });
};

export const atualizarEvento = async (req: Request, res: Response) : Promise<Response> => {
    try{
        const { eventoId } = req.params;
        const dadosAtualizados = req.body;

        const evento = await Evento.findByPk(eventoId);

        if(!evento){
            return res.status(400).json("Evento não encontrado.");
        }
        await evento?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        return res.status(200).json({message: "Evento atualizado com sucesso.", evento});

    } catch(error){
        return res.status(400).json({message: "Erro ao atualizar", error});
    }
}

export const deletarEvento = async (req: Request, res: Response) : Promise<Response> => {
    const { eventoId } = req.params;
    let evento = await Evento.findByPk(eventoId);

    if(!evento){
        return res.status(400).json({erro:"Evento não encontrado."});
    }

    const vinculoParticipante = await ParticipanteEvento.findOne({where: {eventosId:evento.id}});
    if(vinculoParticipante){
        return res.status(400).json({error: "Não é possível deletar, evento vinculado à um aluno"});
    }

    await evento.destroy();
    return res.json("Evento cadastrado com sucesso.");
}

export const buscarEventoPorId = async(req: Request, res: Response) : Promise<Response> => {
    const { eventoId} = req.params;
    let evento = await Evento.findByPk(eventoId);

    if(!evento){
        return res.status(404).json({error: "Evento não encontrado."});
    }

    await evento.get(eventoId);
    return res.status(200).json({message: "Evento encontrado:", evento});
}