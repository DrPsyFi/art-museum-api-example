const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

const museums = [
  { id: 1, name: 'The Seattle Art Museum' },
  { id: 2, name: 'The Metropolitan Museum of Modern Art' }
]

app.get('/museums', (req, res, next) => {
  res.json({ museums })
})

app.get('/museums/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const museum = museums.find(museum => museum.id === id)

  res.json({ museum })
})

app.post('/museums', (req, res, next) => {
  const { name } = req.body
  // This is not super safe, ID-wise
  // But... whatever.
  const museum = { id: museums.length + 1, name }
  museums.push(museum)

  res.json({ museum })
})

app.put('/museums/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  const museum = museums.find(museum => museum.id === id)
  museum.name = name

  res.json({ museum })
})

app.delete('/museums/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const museum = museums.find(museum => museum.id === id)
  const index = museums.indexOf(museum)

  museums.splice(index, 1)
  res.json({ museum })
})

const listener = () => console.log(`Listening on port ${port}. ✨`)
app.listen(port, listener)
