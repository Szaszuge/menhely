import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


export enum Permits {
    banned = "banned",
    base = "user",
    elevated = "moderator",
    owner = "admin",
}
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    phoneNumber: string
    
    @Column()
    addressID: number
    
    @Column({
        type: 'enum',
        enum: Permits,
        default: Permits.base
    })
    permit: Permits

}
