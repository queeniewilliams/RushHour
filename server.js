const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const path = require('path')

const ParkingRouter = require('./routes/ParkingRouter')
const AuthController = require('./routes/AuthRouter')
const CommentController = require('./routes/CommentRouter')

const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use('/parking', ParkingRouter)
app.use('/auth', AuthController)
app.use('/comment', CommentController)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

app.listen(PORT, () => console.log(`App Listening On Port: ${PORT}`))
