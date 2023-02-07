import { config as dotenv } from "dotenv";
dotenv();
export const secret = process.env.JWT_SECRET || "babeng-secret-key"