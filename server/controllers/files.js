require('express-async-errors')
const File = require('../models/file')

const fileController = {
    add: async (request, response) => {
      const file = new File({
        file: { 
          data: request.file.buffer,
          contentType: request.file.mimetype,
          encoding: request.file.encoding
        },
        name: request.file.originalname,
        lastModified: request.body.lastModified
      })
      const newFile = await file.save()
      response.status(200).send(newFile.toJSON().id)
    },
    getAll: async (_request, response) => {
      const data = await File.find({})
      response.contentType('json')
      const files = data.map(ch => ch.toJSON())
      response.json({ files }) 
    },
    delete:async (request, response) => {
        await File.deleteOne({_id:request.params.id})
        response.status(200).send()
      }
}

module.exports = fileController