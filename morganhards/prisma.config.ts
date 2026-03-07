import * as dotenv from "dotenv";
// .env.local must be loaded with override:true so it takes priority over any .env file
dotenv.config({ path: ".env.local", override: true });
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env["DATABASE_URL"],
    },
});
