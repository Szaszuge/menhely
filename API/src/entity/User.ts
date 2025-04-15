import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, CreateDateColumn, OneToMany } from "typeorm"
import { Address } from "./Address"
import { Request } from "./Requests"


export enum Permits {
    banned = "banned",
    base = "user",
    elevated = "moderator",
    owner = "admin",
    limbo = "inactive",
    pwedit = "recovering",
}
@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

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
    
    @OneToMany(() => Request, (request) => request.user)
    requests: Request[]

    @Column({
        type: 'enum',
        enum: Permits,
        default: Permits.limbo
    })
    permit: Permits

    @CreateDateColumn()
    created_at: Date;
}
