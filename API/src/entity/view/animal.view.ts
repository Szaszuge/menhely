import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity, ViewColumn, DataSource } from "typeorm"
import { AppDataSource } from "../../data-source";
@ViewEntity({
    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("animal.id", "id")
    .addSelect("animal.Type", "species")
    .addSelect("animal.name", "name")
    .from("animal", "animal")
})
export class AnimalView {
@ViewColumn()
id: string;
@ViewColumn()
species: string;
@ViewColumn()
name: string;
}
