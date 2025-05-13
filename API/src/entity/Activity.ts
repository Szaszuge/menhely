import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity } from "typeorm"
import { User } from "../entity/User";
import { Animal } from "./Animal";

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

    @ManyToOne(() => Animal, (animal) => animal.activities, {nullable: true})
    animal: Animal;
    
    @Column({nullable: true})
    secondaryTime: String
}