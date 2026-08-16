import pg from "pg";

const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    user: "dev",
    password: "devpass",
    database: "logs",
});

export default pool;