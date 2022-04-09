import Pages from '../../classes/Pages'

export default class Detail extends Pages {
  constructor() {
    super({
      element: '.detail',
      elements: {
        content: '.content',
      },
    })
  }

  create() {
    super.create()
  }
}
