import { Options } from 'sequelize'

const config: Options = {
    username: 'postgres',
    password: 'root',
    database: 'crud_sequelize',
    host: 'localhost',
    dialect: 'postgres'
}

export = config