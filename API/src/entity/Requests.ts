import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity } from "typeorm"
import { Permits, User } from "../entity/User";
import { Kind } from "./Animal";

export enum RequestType{
        check = "Látogatás",
        work = "Önkéntes munka",
        adopt = "Örökbefogadás",
        surrender = "Leadás",
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
    // TODO: Add date property
    @Column({ type: 'json' })
    details

}