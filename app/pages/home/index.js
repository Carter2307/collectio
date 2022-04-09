import Pages from 'classes/Pages'
import Smoothscroll from '../../components/Smoothscroll'
export default class Home extends Pages {
  constructor() {
    super({
      element: '.home',
      elements: {
        collumn1: document.querySelector(
          '.collumns__wrapper:nth-child(1) .collumn'
        ),
        collumn2: document.querySelector(
          '.collumns__wrapper:nth-child(2) .collumn'
        ),
        collumn3: document.querySelector(
          '.collumns__wrapper:nth-child(3) .collumn'
        ),
      },
    })
  }

  create() {
    super.create()
    this.init()
  }

  init() {
    console.log('smooth')
    new Smoothscroll(this.elements.collumn1, {
      direction: 'v-',
      smooth: 0.6,
    })

    new Smoothscroll(this.elements.collumn2, {
      direction: 'v',
      smooth: 0.6,
    })

    new Smoothscroll(this.elements.collumn3, {
      direction: 'v-',
      smooth: 0.6,
    })
  }
}
