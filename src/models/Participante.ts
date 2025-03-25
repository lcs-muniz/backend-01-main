import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Participante extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
}

Participante.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "participantes",
        timestamps: false,
    }
);
