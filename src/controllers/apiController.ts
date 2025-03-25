import { Request, Response } from 'express';
import * as AlunoController from './AlunoController';

export const ping = (req: Request, res: Response) => {
    try {
        res.status(200).json({ pong: true });
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const apiSaudacao = (req: Request, res: Response) => {
    return res.json({ mensagem: "Olá, Bem vindo à API!"});
};

export const apiLista = (req: Request, res: Response) => {
    return res.json();
};



