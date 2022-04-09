import each from 'lodash/each'
import GSAP from 'gsap'

export default class Pages {
  constructor({ element, elements }) {
    this.selector = element
    this.selectorChildrens = {
      ...elements,
    }
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildrens, (entry, key) => {
      if (
        entry instanceof HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)
        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  show() {
    return new Promise((resole) => {
      this.animateIn = GSAP.timeline()

      this.animateIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      )

      this.animateIn.call((_) => {
        resole()
      })
    })
  }

  hide() {
    return new Promise((resole) => {
      this.animateOut = GSAP.timeline()

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resole,
      })
    })
  }
}
