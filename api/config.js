'use strict'

const dotenv = require('dotenv')
const { handleFatalError } = require('./utils/utility')

// Load Environments
const loadEnvs = dotenv.config()

if (loadEnvs.error) {
  handleFatalError(loadEnvs.error)
}

const { parsed: envs } = loadEnvs

// console.log(envs)

module.exports = envs
