import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity } from "typeorm"
import { User } from "../entity/User";

export enum ActivityType{
    work = "Önkéntes munka",
    check = "Látogatás",
    adopt = "Örökbefogadás",
}

@Entity()
export class Activity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.activities)
    user: User;

    @Column({
        type: 'enum',
        enum: ActivityType,
        default: ActivityType.check
    })
    type: ActivityType

    @Column()
    date: Date;

}