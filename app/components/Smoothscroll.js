import { lerp, clamp } from "../utils/function";

export default class Smoothscroll{

  constructor(element, opts) {

    this.element = element

    this.defaultOptions = {
      direction: "v",  // v: vertical or  v- : vertical bottom to top;  h: Horizontal or h- horizontal right to left
      smooth : .1 // Smooth amount -> Lerp function
    }
    this.smoothOptions = Object.assign(this.defaultOptions, {
      ...opts
    })

    this.scroll = {
      current: 0,
      target: 0,
      limit : this.element.offsetHeight - window.innerHeight
    }

    this.init()
  }

  init() {
    this.scroll.limit = this.element.offsetHeight - window.innerHeight

    this.addListener()
    this.update()
  }

  onMouseWheel(e) {

    if (this.smoothOptions.direction === 'v' || this.smoothOptions.direction === 'v-') {
        this.scroll.target += e.deltaY

    } else if (this.smoothOptions.direction === 'h' || this.smoothOptions.direction === 'h-') {
        this.scroll.target += e.deltaX
    }


  }

  onResize() {
    this.scroll.limit = this.element.offsetHeight - window.innerHeight
  }

  addListener() {
    window.addEventListener('mousewheel', this.onMouseWheel.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  update() {
    this.scroll.target = clamp(this.scroll.target, 0, this.scroll.limit)
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.smoothOptions.smooth)

    if (this.scroll.current < .01) {
      this.scroll.current = 0
    }

    this.translateByCase()
    //this.element.style.transform = `translateY(-${this.scroll.current}px)`
    window.requestAnimationFrame(this.update.bind(this))
  }

  translateByCase() {
    switch (this.smoothOptions.direction) {
      case "v":
        this.element.style.transform = `translateY(-${this.scroll.current}px)`
        break

      case "v-":
        this.element.style.transform = `translateY(${this.scroll.current}px)`
        break

      case "h":
        this.element.style.transform = `translateX(-${this.scroll.current}px)`
        break

      case "h-":
        this.element.style.transform = `translateX(${this.scroll.current}px)`
        break
    }

  }

}
