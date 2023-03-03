const Ws = require('ws')

;((Ws) => {
    const server = new Ws.Server({
        port: 8000
    })

    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        server.on('open', handleServerOpen)
        server.on('close', handleServerClose)
        server.on('error', handleServerError)
        server.on('connection', handleServerConnection)
    }

    const handleServerOpen = () => {}
    const handleServerClose = () => {}
    const handleServerError = (err) => {
        console.log('Server WebSocket Error', err)
    }
    const handleServerConnection = (ws) => {
        console.log('Server WebSocket Connection')
        ws.on('message', handleServerMessage)
        
    }

    const handleServerMessage = (e) => {
        const parseMsg = JSON.parse(e)
        console.log('parseMsg', parseMsg)
        server.clients.forEach(c => {
            c.send(JSON.stringify(parseMsg))
        })
    }

    init()
})(Ws)