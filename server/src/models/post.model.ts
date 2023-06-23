import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";


interface PostCreationAttrs {

    firstName: string;

    lastName: string;

    userPicturePath: string;

    content?: string;

    postPicturePath?: string;

}

@Table({ tableName: 'Posts' })
export class Post extends Model<Post, PostCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    userPicturePath: string;

    @Column({ type: DataType.STRING, allowNull: true })
    content: string;

    @Column({ type: DataType.STRING, allowNull: true })
    postPicturePath: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        defaultValue: []
    })
    likes: number[];

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user: User;

}