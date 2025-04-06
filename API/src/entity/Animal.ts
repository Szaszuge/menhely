import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


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
    female = "female"
}

@Entity()
export class Animal {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column()
    age: number

    @Column({
        type: 'enum',
        enum: Kind,
        default: Kind.dog
    })
    Type: Kind

    @Column({
        type: 'enum',
        enum: From,
        default: From.home
    })
    From: From

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.male
    })
    Gender: Gender

    @Column()
    arrival: string
    
    @Column({ type: 'json' })
    details
    

}
