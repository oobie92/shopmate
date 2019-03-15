// Utility functions library
const chalk = require('chalk')
const fs = require('fs')

function handleFatalError (err) {
  console.error(`${chalk.red('[Error fatal] =')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

// function checkImage (imageName) {
//   const path_file = './assets/images/' + imageName

//   // !!fs.existsSync(path_file)
// }

module.exports = {
  handleFatalError
}
