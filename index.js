const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const { i18n } = require('./src/helper/i18n');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const http = require('http')
require('dotenv').config()

app.use(cors())
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.use(bodyParser.json())
app.use(i18n.init)



app.get('/msg', (req, res) => {
    res.json({ message: 'Hello this is message!' });
});
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'))
})

const port = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is started on`, port)
})

const io = new Server(server, { cors: { origin: '*' } })
io.on("connection", (socket) => {
    console.log("A User Connected")
    global.socket = socket
    global.io = io
})
