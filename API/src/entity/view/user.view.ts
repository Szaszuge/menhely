import { ViewEntity, ViewColumn, DataSource } from "typeorm"
@ViewEntity({
    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("user.id", "id")
    .addSelect("user.permit", "role")
    .addSelect("user.userName", "name")
    .from("user", "user")
})
export class UserView {
@ViewColumn()
id: string;
@ViewColumn()
role: string;
@ViewColumn()
name: string;
}
