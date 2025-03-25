import { Request, Response } from "express";
import { Evento } from "../models/Evento";

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