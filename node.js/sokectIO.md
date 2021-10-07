```javascript
import express from 'express'
import path from 'path'
import http from 'http'
import {Server, Socket} from 'socket.io'
const app = express();
const server = http.createServer(app)
const io = new Server(server)




app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=> {
  res.sendFile('C:/Users/jemin/nodejs/zoom/src/index.html')
})

io.on("connection",(socket: Socket)=> {
  console.log('connect!!')
    socket.emit('event_name','hello!')
})

server.listen(8080, ()=> {
  console.log('server start!!')
})
```
