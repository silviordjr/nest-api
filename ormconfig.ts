import { DataSource } from 'typeorm';
// import dotenv from 'dotenv';

// dotenv.config();

export const devDataSource = new DataSource ({
    type: 'mysql',
    host: 'localhost',
    port: 3312,
    username: 'root',
    password: '',
    database: 'store',
    synchronize: true,
    logging: false,
    entities: ['dist/src/entity/**/*.js'],
    migrations: ['dist/src/migrations/*.js'],
    subscribers: ['dist/src/subscriber/**/*.js']
});

devDataSource.initialize()
.then(() => console.log('Data Source Iniciado'))
.catch((e) => console.log(e))


   