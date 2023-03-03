const ws = new WebSocket('ws:localhost:8000')

const bindEvent = () => {
    ws.addEventListener('open', handleWsOpen)
    ws.addEventListener('close', handleWsClose)
    ws.addEventListener('error', handleWsError)
    ws.addEventListener('message', handleWsMessage)
}

const handleWsOpen = () => {}
const handleWsClose = () => {}
const handleWsError = () => {}
const handleWsMessage = (data: any) => {
    return data
}

const init = () => {
    bindEvent()
}
init()
export default ws