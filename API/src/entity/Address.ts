import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Permits, User } from "../entity/User";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string

    @Column()
    postal: number

    @Column()
    street: string

    @Column()
    number: number

    @Column()
    floor: string | null
    
    @Column()
    door: number | null

    @OneToMany(() => User, (user) => user.address)
    residents: User[];
}
