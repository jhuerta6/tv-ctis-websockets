const websocket = require('ws');

const wss = new websocket.Server({port: 80});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message){
        console.log('received: %s', message);
        ws.send('I received your message: ' +  message);
        wss.clients.forEach(function each(client){
           if(client !== ws && client.readyState === websocket.OPEN){
               client.send("Incoming message: "+message );
           }
        });
    });
});

