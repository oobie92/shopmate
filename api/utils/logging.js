const { format, createLogger, transports, addColors } = require('winston')
const { printf } = format
const { Console, File } = transports
const loggingDir = './logs'
const fs = require('fs')

if (!fs.existsSync(loggingDir)) {
  fs.mkdirSync(loggingDir)
}

const config = {
  levels: {
    error: 0,
    debug: 4,
    warn: 2,
    data: 3,
    info: 1,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'cyan'
  }
}

addColors(config.colors)

const logger = createLogger({
  level: config.levels,
  // format: format.json(),
  format: printf(info => {
    return JSON.stringify(info)
      .replace(/message/gi, 'payload')
  }),
  transports: [
    new Console(),
    new File({
      filename: `./${loggingDir}/info.log`,
      level: 'info'
    }),
    new File({
      filename: `./${loggingDir}/error.log`,
      level: 'error'
    })
  ],
  exitOnError: false
})

module.exports = logger
