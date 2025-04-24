import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ViewEntity, ViewColumn, DataSource } from "typeorm"
import { AppDataSource } from "../../data-source";
@ViewEntity({
    
    //expression: `SELECT request.id as id, request.Type as type, user.userName as name FROM request INNER JOIN user ON user.id = request.userId`,

    expression: (AppDataSource:DataSource) => AppDataSource.createQueryBuilder()
    .select("request.id", "id")
    .addSelect("user.email", "targetEmail")
    .addSelect("request.Type", "type")
    .addSelect("user.userName", "name")
    .from("request", "request")
    .innerJoin("user", "user", "user.id = request.userId")
})
export class RequestView {
@ViewColumn()
id: string;
@ViewColumn()
targetEmail: string;
@ViewColumn()
type: string;
@ViewColumn()
name: string;
}
