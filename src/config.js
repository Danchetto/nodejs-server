import DataBase from './DataBase/DataBase';

const dataBase = new DataBase(
    {}, 
    {
        user: process.env.DB_USER || 'daniil.tuchin',
        database: process.env.DB_NAME || 'tuchindb',
        password:  process.env.DB_PASSWORD || 'tuchin',
        host: '127.0.0.1',
        port: 5432
    }
);

export default dataBase;