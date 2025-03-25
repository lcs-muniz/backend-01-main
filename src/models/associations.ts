import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";
import { Participante } from "./Participante";
import { Evento } from "./Evento";
import { ParticipanteEvento } from "./ParticipanteEvento";

Aluno.belongsToMany(Disciplina, {
    through: AlunoDisciplina,
    foreignKey: "alunoId"
});

Disciplina.belongsToMany(Aluno, {
    through: AlunoDisciplina,
    foreignKey: "disciplinaId"
});

Participante.belongsToMany(Evento,{
    through: ParticipanteEvento,
    foreignKey: "participanteId" 
});

Evento.belongsToMany(Participante, {
    through: ParticipanteEvento,
    foreignKey: "eventosId"
});



console.log("✅ Relações entre models configuradas");