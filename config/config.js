require('dotenv').config()
module.exports = {
  development: {
    database: 'rushhour_database_development',
    dialect: 'postgres'
  },
  test: {
    database: 'rushhour_database_test',
    dialect: 'postgres'
  },
  production: {
    database: 'rushhour_database_production',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
