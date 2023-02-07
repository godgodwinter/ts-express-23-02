import { config as dotenv } from "dotenv";
dotenv();
export const dbConfig = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_DATABASE || "psikotest-23-02a",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};