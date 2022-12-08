import http from "http";

import fs from "fs";
import path from "path";
import { Server } from "socket.io"

const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {

        const filePath = path.join(process.cwd(), "./index.html");
        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
    }
});
const io = new Server(server)
io.on('connection', (client) => {
    // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
    client.broadcast.emit('server-msg', { msg: "Подключился новый клиент: "+client.id})
    client.on('disconnect', (data) => {
        client.broadcast.emit('server-msg', { msg: "Отключился клиент: "+client.id })
        client.emit('server-msg', { msg: "Отключился клиент: "+client.id })
    })
    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: client.id+" пишет :"+data.msg })
        client.emit('server-msg', { msg: "Вы написали: "+data.msg })
    })

})


server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);
