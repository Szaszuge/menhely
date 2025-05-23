import { ViewEntity, ViewColumn, DataSource } from "typeorm"
@ViewEntity({
    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("animal.id", "id")
    .addSelect("animal.Type", "species")
    .addSelect("animal.name", "name")
    .addSelect("animal.isPublicable", "isPublicable")
    .addSelect("animal.isPublic", "isPublic")
    .from("animal", "animal")
})
export class AnimalView {
@ViewColumn()
id: string;
@ViewColumn()
species: string;
@ViewColumn()
name: string;
@ViewColumn()
isPublicable: boolean;
@ViewColumn()
isPublic: boolean;
}
