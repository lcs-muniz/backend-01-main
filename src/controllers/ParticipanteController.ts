import { Request, Response } from "express";
import { Participante } from "../models/Participante";

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