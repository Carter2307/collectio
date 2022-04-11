export default class arrayHandler {
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
