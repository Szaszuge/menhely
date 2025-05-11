import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Activity } from "./Activity";

export enum Kind {
    dog = "dog",
    cat = "cat",
}
export enum From {
    home = "home",
    found = "found",
}
export enum Gender {
    male = "male",
    female = "female",
    unknown = "unknown",
}

@Entity()
export class Animal {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column({
        nullable: true,
    })
    age: string

    @Column({
        type: 'enum',
        enum: Kind,
        default: Kind.dog
    })
    type: Kind

    @Column({
        type: 'enum',
        enum: From,
        default: From.home
    })
    from: From

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.male
    })
    gender: Gender

    @Column()
    arrival: string
    
    @Column({ type: 'json' })
    details

    @Column('boolean', {default: false})
    isPublicable: boolean = false;   
    
    @Column('boolean', {default: false})
    isPublic: boolean = false;   

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Activity, (activity) => activity.user)
    activities: Activity[]
}
