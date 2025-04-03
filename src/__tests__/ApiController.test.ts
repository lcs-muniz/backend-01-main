import request from 'supertest';
import server from '../server';

jest.setTimeout(10000);

describe("Teste para verificar listagem de alunos", () => {
    it ("Esse teste precisa verificar o status da response, se a resposta contem um array de alunos e se o array contém ao menos 1 aluno", async () => {
        const response = await request(server).get ("/listarTodosAlunos");
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    }); 
});

describe("Teste para o cadastro do aluno", () => {
    it("Esse teste precisa fazer um cadastro de um novo aluno(objeto aluno deve ser criado nesse teste), deve verificar o status da response , a mensagem do response e se no body contém o novo aluno", async() => {
        const novoAluno = {
            nome: "texds",
            email: "texds@teste",
            matricula: "10505"
        };

        const response = await request(server)
            .post("/cadastrarAluno")
            .send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Aluno cadastrado com sucesso.");
        expect(response.body).toHaveProperty("novoAluno");
        expect(response.body.novoAluno).toHaveProperty("id");
        expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
        expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
        expect(response.body.novoAluno).toHaveProperty("matricula", novoAluno.matricula);
    
    });
});

describe("Teste de API de Alunos - Atualizar", () => {
    it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", async () => {
        const alunoId = 16;
        const dadosAtualizados = {
            nome: "test Atualizado",
            email: "xd@example",
        };
        
        const response = await request(server).put (`/atualizarAluno/${alunoId}`).send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno Atualizado com sucesso.");
        expect(response.body.aluno).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body.aluno).toHaveProperty("email", dadosAtualizados.email);

    });
});

describe("Testes da API de Alunos - Deletar", () => {
    it("Deve excluir um aluno na rota /deletarAluno/:alunoId", async () => {
        const alunoId = 2;

        const response = await request(server).delete(`/deletarAluno/${alunoId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno deletado com sucesso.");
    });
});

describe("Testes da API de Alunos - Deletar aluno vinculado a disciplina", () => {
    it("Não deve excluir um aluno vinculado a uma disciplina", async() => {
        const alunoId = 3;

        const response = await request(server).delete(`/deletarAluno/${alunoId}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
            "Não é possível deletar, aluno vinculado a uma disciplina."
        );
    });
});

describe("Testes Da API de Alunos - buscar por ID", () => {
    it ("Deve buscar um aluno na rota /buscarAlunoPorId/:alunoId", async () => {
        const alunoId = 17;

        const response = await request(server).get(`/buscarAlunoPorId/${alunoId}`);

        expect(response.status).toBe(200);
        expect(response.body.aluno).toHaveProperty("id", alunoId);
    });
});

describe("Testes Da API de Alunos - buscar aluno inexistente", () => {
    it ("Deve retornar erro ao buscar um aluno inexistente", async () => {
        const alunoId = 999;

        const response = await request(server).get(`/buscarAlunoPorId/${alunoId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Aluno não encontrado.");
    });
});

describe("Teste para verificar listagem de disciplinas", () => {
    it ("Esse teste precisa verificar o status da response, se a resposta contem um array de disciplinas e se o array contém ao menos 1 disciplina", async () => {
        const response = await request(server).get ("/listarTodasDisciplinas");
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    }); 
});

describe("Teste para o cadastro da disciplina", () => {
    it("Esse teste precisa fazer um cadastro de uma nova disciplina (objeto disciplina deve ser criado nesse teste), deve verificar o status da response , a mensagem do response e se no body contém uma nova disciplina", async() => {
        const novaDisciplina = {
            nome: "Banco de Dados 2",
        };

        const response = await request(server)
            .post("/cadastrarDisciplina")
            .send(novaDisciplina);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Disciplina cadastrada com sucesso.");
        expect(response.body).toHaveProperty("novaDisciplina");
        expect(response.body.novaDisciplina).toHaveProperty("id");
        expect(response.body.novaDisciplina).toHaveProperty("nome", novaDisciplina.nome);
    });
});