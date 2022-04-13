import each from 'lodash/each'

import Detail from './pages/detail'
import Home from './pages/home'
import Uploader from './pages/uploader'

import Preloader from './components/Preloader'
import Menu from './components/Menu'
class App {
  constructor() {
    this.createPreloader()
    this.getContent()
    this.initComponents()
    this.initPages()
    this.addLinkListener()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', (_) => this.onPreloaded())
  }

  initComponents() {
    this.menu = new Menu()
  }

  getContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  initPages() {
    this.pages = {
      home: new Home(),
      detail: new Detail(),
      uploader: new Uploader(),
    }

    this.page = this.pages[this.template]

    if (this.page && this.page.create()) {
      this.page.create()
    }
  }

  onPreloaded() {
    this.preloader.destroy()

    if (this.page && this.page.show()) {
      this.page.show()
    }
  }

  async onChange({ url }) {
    await this.page.hide()

    const res = await window.fetch(url)

    if (res.status === 200) {
      const html = await res.text()

      window.history.pushState({}, '', url)

      const div = document.createElement('div')
      div.innerHTML = html

      const divContent = div.querySelector('.content')
      this.template = divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()

      this.addLinkListener()
    } else {
      console.error('error' + res)
    }
  }

  addLinkListener() {
    const links = document.querySelectorAll('a')

    each(links, (link) => {
      link.onclick = (e) => {
        e.preventDefault()

        const { href } = link

        this.onChange({ url: href })
      }
    })
  }
}

new App()
