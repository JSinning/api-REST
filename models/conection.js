import pkg from 'pg';
const { Pool } = pkg;

export const config = new Pool({
    host: 'posgresdb',
    user: 'postgres',
    password: 'posgres123',
    database: 'Registros',
    port:5432
  });
