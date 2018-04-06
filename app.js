const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const listener = () => console.log(`Listening on port ${port}. ✨`)
app.listen(port, listener)
