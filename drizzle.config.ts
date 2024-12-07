import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema",
  dbCredentials: {
    url: "./db/sqlite.db",
  },
});
