const http = require('http');

const startListener = () => {
    handle = (req, res) => res.end("hit")
    server = http.createServer(handle)
    server.listen(proccess.env.PORT || 5000) 
}

module.exports = {
    startListener: startListener
}