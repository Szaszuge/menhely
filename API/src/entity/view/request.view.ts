import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity, ViewColumn, DataSource } from "typeorm"
import { AppDataSource } from "../../data-source";
@ViewEntity({
    
    //expression: `SELECT request.id as id, request.Type as type, user.userName as name FROM request INNER JOIN user ON user.id = request.userId`,

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
