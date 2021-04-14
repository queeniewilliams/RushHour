const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const app = express()

const ParkingRouter = require('./routes/ParkingRouter')
const AuthController = require('./routes/AuthRouter')
const CommentController = require('./routes/CommentRouter')

const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/add', ParkingRouter)
app.use('/auth', AuthController)
app.use('/comment', CommentController)

app.listen(PORT, () => console.log(`App Listening On Port: ${PORT}`))
