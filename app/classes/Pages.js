import each from 'lodash/each'
import GSAP from 'gsap'
import Smoothscroll from '../components/Smoothscroll'

export default class Pages {
  constructor({ element, elements }) {
    this.selector = element
    this.selectorChildrens = {
      ...elements,
    }
  }

  create() {
    this.createSmoothScrool()

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

  createSmoothScrool() {
    if (document.querySelector('.collumns__wrapper:nth-child(1) .collumn')) {
      new Smoothscroll(
        document.querySelector('.collumns__wrapper:nth-child(1) .collumn'),
        {
          direction: 'v-',
          smooth: 0.1,
        }
      )

      new Smoothscroll(
        document.querySelector('.collumns__wrapper:nth-child(2) .collumn'),
        {
          direction: 'v',
          smooth: 0.1,
        }
      )

      new Smoothscroll(
        document.querySelector('.collumns__wrapper:nth-child(3) .collumn'),
        {
          direction: 'v-',
          smooth: 0.1,
        }
      )
    }
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
