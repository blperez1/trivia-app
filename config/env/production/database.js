const { parse } = require("pg-connection-string");
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => {
  if(env("NODE_ENV") === "production") {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.username,
            password: config.password,
            ssl: { rejectUnauthorized: false }
          },
          options: {
            ssl: true
          },
        },
      },
    };
  }else {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "sqlite",
            filename: env("DATABASE_FILENAME", ".tmp/data.db")
          },
          options: {
            useNullAsDefault: true
          }
        }
      }
    }
  }


};