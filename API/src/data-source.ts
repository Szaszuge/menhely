import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Address } from "./entity/Address"
import { Animal } from "./entity/Animal"
import { Request } from "./entity/Requests"
import { RequestView } from "./entity/view/request.view"
import { UserView } from "./entity/view/user.view"
import { AnimalView } from "./entity/view/animal.view"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "menhely",
    synchronize: true,
    logging: false,
    entities: [User, Address, Animal, Request, UserView, AnimalView, RequestView],
    migrations: [],
    subscribers: [],
})
