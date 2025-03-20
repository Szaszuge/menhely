import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, CreateDateColumn } from "typeorm"
import { Address } from "./Address"


export enum Permits {
    banned = "banned",
    base = "user",
    elevated = "moderator",
    owner = "admin",
    limbo = "inactive"
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
    password: string

    @Column()
    email: string

    @Column()
    phoneNumber: string
    
    @ManyToOne(() => Address, (address) => address.residents)
    address: Address
    
    @Column({
        type: 'enum',
        enum: Permits,
        default: Permits.limbo
    })
    permit: Permits

    @CreateDateColumn()
    created_at: Date;
}
