import { Column, ViewEntity, ViewColumn, DataSource } from "typeorm"
import { Animal } from "../Animal";
@ViewEntity({

    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("activity.id", "id")
    .addSelect("user.userName", "name")
    .addSelect("user.fullName", "realname")
    .addSelect("activity.type", "type")
    .addSelect("activity.date", "date")
    .addSelect("activity.animal", "animal")
    .from("activity", "activity")
    .innerJoin("user", "user", "user.id = activity.user")
})
export class ActivityView {
@ViewColumn()
id: string;
@ViewColumn()
name: string;
@ViewColumn()
realname: string;
@ViewColumn()
type: string;
@ViewColumn()
date: string;
@ViewColumn()
animal: Animal;

}
