import Detail from "./pages/detail";
import Home from "./pages/home";
import Preloader from "./components/Preloader";
import Menu from "./components/Menu";
class App {
  constructor() {
    this.createPreloader();
    this.getContent();
    this.initComponents();
    this.initPages();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", (_) => this.onPreloaded());
  }

  initComponents() {
    this.menu = new Menu();
  }

  getContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  initPages() {
    this.pages = {
      home: new Home(),
      detail: new Detail(),
    };

    this.page = this.pages[this.template];

    if (this.page && this.page.create()) {
      this.page.create();
    }
  }

  onPreloaded() {
    this.preloader.destroy();

    if (this.page && this.page.show()) {
      this.page.show();
    }
  }
}

new App();
