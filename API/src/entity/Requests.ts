import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Permits, User } from "../entity/User";

export enum RequestType{
        surrender = "Leadás",
        work = "Önkéntes munka",
        check = "Látogatás",
        adopt = "Örökbefogadás",
}

@Entity()
export class Request {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.requests)
    user: User;

    @Column({
        type: 'enum',
        enum: RequestType,
        default: RequestType.surrender
    })
    Type: RequestType
    
    @Column({ type: 'json' })
    details

    @CreateDateColumn()
    created_at: Date;
}