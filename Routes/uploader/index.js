const path = require('path')
const { writeFile } = require('fs')

const express = require('express')

const multer = require('multer')

const Router = express.Router()
const app = express()

//Datas
const inputs = require('../../config/inputs')
let data = require('../../config/data')

class arrayHandler {
  constructor(array) {
    this.array = array
    this.length = array[0].length
    this.lengths = []
  }

  chortChildrenIndex() {
    this.value = 0
    this.array.forEach((element, index) => {
      if (element.length < this.length) {
        this.value = index
      }
    })

    return this.value
  }

  longChildrenIndex() {
    this.value = 0
    this.array.forEach((element, index) => {
      if (element.length > this.length) {
        this.value = index
      }
    })

    return this.value
  }

  isSameLength() {
    this.array.forEach((element) => {
      if (element.length == this.length) this.lengths.push(element.length)
    })

    if (this.lengths.length === this.array.length) {
      return true
    } else {
      return false
    }
  }
}

const arr = new arrayHandler(data)
const ids = []
const val = []

data.forEach((item) => {
  item.forEach((id) => {
    ids.push(id.id)
  })
})

ids.forEach((item) => {
  item = parseInt(item.split('-')[1])
  val.push(item)
})

const hightId = Math.max(...val)

Router.get('/', (req, res) => {
  res.render('pages/uploader', {
    inputs,
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../shared'))
  },

  filename: (req, file, cb) => {
    let originalname = file.originalname

    let regex = /(\.[^.]*)$/

    let extension = originalname.match(regex)[0]

    const uniqueSuffix = 'img' + '-' + (hightId + 1) + extension

    cb(null, uniqueSuffix)
  },
})

const form = multer({ storage })

Router.post('/', form.single('image'), (req, res, next) => {
  const file = req.file
  //Form body
  const imageData = {
    id: `picture-${hightId + 1}`,
    title: req.body['image-title'],
    label: req.body['image-label'],
    description: req.body['image-desc'],
    image: {
      url: `/${file.filename}`,
      alt: req.body['image-alt'],
    },
  }

  //Write data to data table

  if (arr.isSameLength()) {
    data[0].push(imageData)
  } else {
    data[arr.chortChildrenIndex()].push(imageData)
  }

  const text = `module.exports = ${JSON.stringify(data)}`

  writeFile(
    path.join(__dirname, '../../config/data.js'),
    text,
    'utf8',
    (err) => {
      if (err) throw err
      console.log('database update')
    }
  )

  res.sendStatus(200)
})

module.exports = Router
