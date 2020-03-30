import * as mysql from 'mysql';
import Logger from './sLogger';

class Database {
    config: DatabaseConfig = require('../../DatabaseConfig.json');

    connection: any;

    constructor() {
        this.connection = mysql.createPool({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port
        });

        this.checkConnection();
    }

    /**
     * Check if the connection is established.
     */
    checkConnection() {
        this.connection.getConnection((e: any, connection: any) => {
            if (e) {
                Logger.error(`MYSQL SERVER NOT WORKING!`);
            } else {
                Logger.info(`MYSQL SERVER READY!`);
            }

            connection.release()
        });
    }

    /**
     * Try to execute the query.
     *
     * @param query
     * @param params
     */
    try(query: string, params: Array<any> = null) {
        return new Promise((r, j) => this.connection.query(query, params, (err: any, data: any) => {
            if (err) {
                Logger.error(query);

                return j(err);
            }

            r(data);
        }))
    }

    /**
     * Sends a query to the database.
     *
     * @param query
     * @param params
     */
    async query(query: string, params: Array<any> = null) {
        const start = new Date().getTime();
        const data = await this.try(query, params);
        const time = new Date().getTime() - start;

        if (time >= 500) Logger.warn(`'${query}' ends with: ${time / 1000}s`);
        else Logger.silly(`'${query}' ends with: ${time / 1000}s`);

        return data;
    }
}

export default new Database();