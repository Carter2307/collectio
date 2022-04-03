import each from 'lodash/each'

export default class Pages {
  constructor({ element, elements }) {
     this.selector = element
    this.selectorChildrens = {
      ...elements,
    };

   }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {};

    each(this.selectorChildrens, (entry, key) => {
      if (
        entry instanceof HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);
        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
  }

  show() {
    console.log('show pages')
  }

  hide() {
    console.log('hidde pages')
  }
}
