import Pages from "classes/Pages";

export default class Home extends Pages{
  constructor() {
    super({
      elements: {
        collumns : '.collumns'
      }
    })
  }

  create() {
    super.create()
    console.log(this.elements.collumns)
  }
}
