import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "challenge_db",
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/infrastructure/adapters/repository/migrations/*.ts"],
    synchronize: false,
});
