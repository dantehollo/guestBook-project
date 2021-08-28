const express = require('express')

const app = express()

//connect to routers
const { userRouter } = require('./controllers/user.js')
const { postRouter } = require('./controllers/post.js')
const { commentRouter } = require('./controllers/comment.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

//connect to urls
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

//connect to PORT
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})