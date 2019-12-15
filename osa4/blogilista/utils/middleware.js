const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
  
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  // } else if (!!error.errors && !!error.errors.username &&error.errors.username.kind === 'required') {
  //   return res.status(400).json( {error: { name: error.errors.name, message: error.errors.message } }) 
  } else if (error.name === 'ValidationError' && !!error.errors && error.errors.username.properties.type === 'unique') {
      return res.status(409).json( {error: { name: error.name, message: error.message } })
  }

  if (error.name) {
    return res.status(400).json( {error: { name: error.name, message: error.message } } )
  } else {
    return res.status(400).json(error)
  }
    

}
  
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}