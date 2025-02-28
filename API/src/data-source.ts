import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Address } from "./entity/Address"
import { Animal } from "./entity/Animal"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "menhely",
    synchronize: true,
    logging: false,
    entities: [User, Address, Animal],
    migrations: [],
    subscribers: [],
})
