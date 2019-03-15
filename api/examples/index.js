'use strict'

const db = require('../')
const debug = require('debug')('mysql:db:setup')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USER || 'fullstack',
    password: process.env.DB_PASS || '_fullstack',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    port: '3306',
    logging: s => debug(s),
    setup: true
  }

  const { Department } = await db(config).catch(handleFatalError)

  const department = await Department.createOrUpdate({
    department_id: 6,
    name: 'test',
    description: 'This is a test'
  }).catch(handleFatalError)

  console.log('--Department--')
  console.log(department)
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
