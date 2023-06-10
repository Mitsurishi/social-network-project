import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Post } from "./post.model";
import { Token } from "./token.model";


interface UserCreationAttrs {

    email: string;

    password: string;

    activationLink: string;

    firstName: string;

    lastName: string;

    age: string;

    occupation: string;

    profilePicturePath: string;

}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isActivated: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    activationLink: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    age: string;

    @Column({ type: DataType.STRING, allowNull: false })
    occupation: string;

    @Column({ type: DataType.STRING, allowNull: false })
    profilePicturePath: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        defaultValue: []
    })
    friends: number[];

    @HasOne(() => Token)
    refreshToken: Token;

    @HasMany(() => Post)
    posts: Post[];

}