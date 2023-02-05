import Pages from 'classes/Pages'
import data from '/config/data'
import Dragndrop from './../../components/Dragndrop'
import autoBind from 'auto-bind'
export default class Uploader extends Pages {
  constructor() {
    super({
      elements: {
        id: document.getElementById('image-id'),
        url: document.getElementById('image-url'),
        form: document.querySelector('.upload__content__wrapper'),
      },
    })
    autoBind(this)
  }

  create() {
    super.create()
    this.init()
  }

  init() {
    this.host = window.location.origin
    this.insertValue()
    this.dragzone = new Dragndrop()

    this.addEventListener()
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

  onSubmit(e) {
    e.preventDefault()

    this.elements.id.disabled = false
    this.elements.url.disabled = false

    this.form = new FormData(this.elements.form)

    this.sendData(this.form, `${this.host}/upload`)
  }

  async sendData(form, url) {
    const ops = {
      method: 'POST',
      mode: 'cors',
      body: form,
    }

    for (let [key, value] of form) {
      console.log(`${key} : ${value}`)
    }
    const res = await fetch(url, ops)

    if (res.status === 200) {
      const result = await res.text()

      this.elements.id.value = this.generateID()
      this.elements.url.value = this.generateURL()

      this.elements.id.disabled = true
      this.elements.url.disabled = true

      this.elements.form.reset()
      console.log(result)
    } else {
      console.error('Error')
    }
  }

  addEventListener() {
    this.elements.form.addEventListener('submit', this.onSubmit)
  }
}
