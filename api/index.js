const app = require('./app')
const { PORT } = require('./config')
const { handleFatalError } = require('./utils/utility')

const setupDatabase = require('./db/db')

const sequelize = setupDatabase()

sequelize.authenticate()
  .then(() => console.log('CONNECTED'))
  .catch((err) => {
    handleFatalError(err)
  })
  .done()

sequelize.sync()
  .then(() => {
    app.set('port', PORT)

    app.listen(app.get('port'), () => {
      console.log(`Shopmate listening on port: ${PORT}`)
    })
  })
  .catch(err => console.log(err))


  module.exports = app;