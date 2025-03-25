import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Participante } from "./Participante";
import { Evento } from "./Evento";

export class ParticipanteEvento extends Model {
    public participanteId!: number;
    public eventosId!: number;
}

ParticipanteEvento.init (
    {
        participanteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Participante,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        eventosId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Evento,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "participante_evento",
        timestamps: false,
    }
);