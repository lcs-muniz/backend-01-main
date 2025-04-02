import { Request, Response } from "express";
import { Participante } from "../models/Participante";
import { Evento } from "../models/Evento";

export const listarEventosDoParticipante = async (req: Request, res: Response) => {
    const { participanteId } = req.params;

    const participante = await Participante.findByPk(participanteId, {
        include: { model: Evento},
    });

    if(participante){
        return res.json(participante);
    }
  
    return res.status(404).json("Participante não encontrado.");
};

export const vincularParticipanteAEvento = async (req: Request, res: Response) => {
    const { participanteId, eventoId } = req.body;

    const participante = await Participante.findByPk(participanteId);
    const evento = await Evento.findByPk(eventoId);

    if (!participante || !evento){
        return res.status(404).json({ error: "Participante ou Evento não encontrado."});
    }

    await (participante as any).addEvento(evento); 

    return res.json({ message: "Participante vinculado à evento com sucesso." });

}