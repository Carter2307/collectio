import Components from 'classes/Components'
import each from 'lodash/each'
import { validFileType } from 'utils/function'
import autoBind from 'auto-bind'

export default class Dragndrop extends Components {
  constructor() {
    super({
      element: '.dragzone',
      elements: {
        inputFile: '.uploader__button__file',
        target: '.uploader__content__body__dropzone',
        name: '.uploader__content__description__title',
        message: '.uploader__content__description__text',
      },
    })

    this.file = 0

    this.init()

    autoBind(this)
  }

  init() {
    this.addEventListener()
  }

  dragOver(e) {
    e.preventDefault()
    console.log('dragOver')
    e.dataTransfer.dropEffect = 'copy'
  }

  dragEnter(e) {
    e.preventDefault()

    if (!e.currentTarget.classList.contains('drop__hover')) {
      e.currentTarget.classList.add('drop__hover')
    }
  }

  onDrop(e) {
    e.dataTransfer === undefined
      ? (this.data = this.elements.inputFile.files)
      : (this.data = e.dataTransfer.items)

    each(this.data, (file) => {
      this.file = this.validFile(file, 'images', 3, this.errorHandler)
    })

    if (this.file !== null || this.file !== undefined)
      this.elements.name.innerHTML = this.file.name
  }

  validFile(file, type, sizes, cb) {
    let item = 0

    if (file.kind === 'file' || file instanceof File) {
      if (file instanceof File) {
        item = file
      } else {
        item = file.getAsFile()
      }

      if (item !== null && validFileType(item, type)) {
        let size = Math.round(item.size * Math.pow(10, -6))

        if (size <= sizes) {
          cb(null, 'sucess')
          return item
        } else {
          cb(new Error('the file is too wide please reduce file size'))
          return 0
        }
      } else {
        cb(new Error('is not an images/pictures'))
      }
    }
  }

  errorHandler(error, success) {
    if (error) this.onError()
    if (success) this.onSuccess()
  }

  onSuccess() {
    if (this.file !== null) this.elements.message.innerHTML = 'Fichier conforme'

    if (!this.elements.target.classList.contains('drop__success'))
      this.elements.target.classList.add('drop__success')
    if (this.elements.target.classList.contains('drop__error'))
      this.elements.target.classList.remove('drop__error')
  }

  onError() {
    if (this.file !== null)
      this.elements.message.innerHTML = 'Fichier non conforme'

    if (!this.elements.target.classList.contains('drop__error'))
      this.elements.target.classList.add('drop__error')
    if (this.elements.target.classList.contains('drop__success'))
      this.elements.target.classList.remove('drop__success')
  }

  handleFile(e) {
    this.onDrop(e)
  }

  onWindowDrag(e) {
    e.preventDefault()
  }

  addEventListener() {
    //Reset window handler
    window.addEventListener('drop', this.onWindowDrag)
    window.addEventListener('dragenter', this.onWindowDrag)
    window.addEventListener('dragover', this.onWindowDrag)

    this.elements.target.addEventListener('dragover', this.dragOver.bind(this))
    this.elements.target.addEventListener(
      'dragenter',
      this.dragEnter.bind(this)
    )
    this.elements.target.addEventListener('drop', this.onDrop.bind(this))

    this.elements.inputFile.addEventListener(
      'change',
      this.handleFile.bind(this)
    )
  }
}
