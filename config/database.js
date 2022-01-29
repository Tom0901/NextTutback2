const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  
  if(env('NODE_ENV') === 'production') {
    const config = parse(process.env.DATABASE_URL)
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password
          }, 
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
          },
        }
      }
    }
  }

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  }
};