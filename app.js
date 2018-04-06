const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

const museums = [
  { id: 1, name: 'The Seattle Art Museum' },
  { id: 2, name: 'The Metropolitan Museum of Modern Art' }
]

function findMuseum (req, res, next) {
  const id = parseInt(req.params.id)
  const museum = museums.find(museum => museum.id === id)
  if (!museum) next({ status: 404, message: `museum could not be found` })

  req.museum = museum
  next()
}

function validateMuseum (req, res, next) {
  const { name } = req.body
  if (!name) next({ status: 400, message: `'name' field required` })

  next()
}

function generateId () {
  const max = museums.reduce((acc, { id }) => acc > id ? acc : id, -Infinity)
  return max + 1
}

app.get('/museums', (req, res, next) => {
  res.json({ museums })
})

app.get('/museums/:id', findMuseum, (req, res, next) => {
  res.json({ museum: req.museum })
})

app.post('/museums', validateMuseum, (req, res, next) => {
  const { name } = req.body
  const museum = { id: generateId(), name }
  museums.push(museum)

  res.json({ museum })
})

app.put('/museums/:id', validateMuseum, findMuseum, (req, res, next) => {
  const { name } = req.body
  Object.assign(req.museum, { name })

  res.json({ museum: req.museum })
})

app.delete('/museums/:id', findMuseum, (req, res, next) => {
  const index = museums.indexOf(req.museum)
  museums.splice(index, 1)
  
  res.json({ museum: req.museum })
})

app.use((req, res, next) => {
  const status = 404
  const message = `${req.method} ${req.url} not found`

  next({ status, message })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || `Something went wrong`

  res.status(status).json({ status, message })
})

const listener = () => console.log(`Listening on port ${port}. ✨`)
app.listen(port, listener)
