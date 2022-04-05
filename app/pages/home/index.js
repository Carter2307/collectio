import Pages from "classes/Pages";
import each from "lodash/each";
import Smoothscroll from "../../components/Smoothscroll";
export default class Home extends Pages{
  constructor() {
    super({
      elements: {
        collumns : document.querySelectorAll('.collumn')
      }
    })
  }

  create() {
    super.create()
    this.init()
  }

  init() {
    each(this.elements.collumns, (collumn, index) => {
      if (index == 1) {
        console.log(index)
        new Smoothscroll(collumn, {
          direction: "v",
          smooth : .6
          })
      } else {
        new Smoothscroll(collumn, {
          direction: "v-",
          smooth : .6
          })
      }
    })
  }
}
