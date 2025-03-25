import request from 'supertest';
import server from '../server';

describe("Testes da API", () =>     {
    it ("Deve retornar uma saudação na rota /saudacao", async () => {
        const response = await request(server).get ("/saudacao");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({mensagem: "Olá, Bem vindo à API!"});
    }); 
});

describe("Teste para verificar listagem de alunos", () =>     {
    it ("Esse teste precisa verificar o status da response, se a resposta contem um array de alunos e se o array contém ao menos 1 aluno", async () => {
        const response = await request(server).get ("/testeLista");

        expect(response.status).toBe(200);
        expect(response.body.aluno).toBeGreaterThan(1);
    }); 
});