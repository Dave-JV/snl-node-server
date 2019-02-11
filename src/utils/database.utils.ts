import {createConnection, Connection, MysqlError} from 'mysql';

export class DBUtils {
    async queryDB(queryString: string, queryParams?: string []): Promise<any> {
        return new Promise((resolve, reject) => {
            const connection: Connection = createConnection({
                host     : 'localhost',
                user     : 'developer',
                password : 'phoTrain12012019',
                database : 'student_night_life',
                multipleStatements : true
            });
        
            connection.query(queryString, queryParams, (err: MysqlError|null, rows: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                connection.end();
                resolve(rows);
            });
        });
    }
}