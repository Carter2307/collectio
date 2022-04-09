const express = require('express')
const Router = express.Router()
const app = express()

//Datas
const inputs = require('../../config/inputs')

Router.get('/', (req, res) => {
  res.render('pages/uploader', {
    inputs,
  })
})

module.exports = Router
