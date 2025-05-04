import { Column, ViewEntity, ViewColumn, DataSource } from "typeorm"
@ViewEntity({

    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("request.id", "id")
    .addSelect("user.email", "targetEmail")
    .addSelect("user.userName", "name")
    .addSelect("user.fullName", "realname")
    .addSelect("request.Type", "type")
    .addSelect("request.details", "details")
    .from("request", "request")
    .innerJoin("user", "user", "user.id = request.userId")
})
export class RequestView {
@ViewColumn()
id: string;
@ViewColumn()
name: string;
@ViewColumn()
realname: string;
@ViewColumn()
targetEmail: string;
@ViewColumn()
type: string;
@Column({type: 'json'})
details
}
