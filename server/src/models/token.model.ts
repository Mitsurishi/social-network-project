import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";


interface TokenCreationAttrs {

    refreshToken: string;

    userId: number;

}

@Table({ tableName: 'Tokens' })
export class Token extends Model<Token, TokenCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    refreshToken: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user: User;

}