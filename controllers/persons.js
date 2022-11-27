const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

personsRouter.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)
  Person.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return !body.name
      ? response.status(400).json({
        error: 'name missing',
      })
      : response.status(400).json({
        error: 'number missing',
      })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: body.number, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = personsRouter