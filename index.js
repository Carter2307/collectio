const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')

const data = require('./config/data')
const port = process.env.PORT

const app = express()

//PUG template engine
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))

//Add static file  like js and css
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.render('pages/home', {
    data,
  })
})

app.get('/detail/:uid', (req, res) => {
  const uid = req.params.uid

  for (let i = 0; i < data.length; i++) {
    const elements = data[i]
    for (let j = 0; j < elements.length; j++) {
      const element = elements[j]

      if (element.id === uid) {
        const item = element
        res.render('pages/detail', {
          item,
        })
        break
      }
    }
  }
})

// Upload image and add datas to data.js
app.use('/upload', require('./Routes/uploader/index'))

// Page no found handler
app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
