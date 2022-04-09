import Pages from 'classes/Pages'
import data from '/config/data'
import Dragndrop from 'components/DragNdrop'

export default class Uploader extends Pages {
  constructor() {
    super({
      elements: {
        id: document.getElementById('image-id'),
        url: document.getElementById('image-url'),
      },
    })
  }

  create() {
    super.create()
    this.init()
  }

  init() {
    console.log('Uplodaer page')
    this.insertValue()
    this.dragzone = new Dragndrop()
  }

  insertValue() {
    this.elements.id.value = this.generateID()
    this.elements.url.value = this.generateURL()

    this.elements.id.disabled = true
    this.elements.url.disabled = true
  }

  generateID() {
    let lastId = 0

    for (let i = 0; i < data.length; i++) {
      const elements = data[i]
      for (let j = 0; j < elements.length; j++) {
        lastId++
      }
    }

    return `picture-${lastId + 1}`
  }

  generateURL() {
    let lastId = 0

    for (let i = 0; i < data.length; i++) {
      const elements = data[i]
      for (let j = 0; j < elements.length; j++) {
        lastId++
      }
    }

    return `/img-${lastId + 1}`
  }
}
