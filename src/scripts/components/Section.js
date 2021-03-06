export class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
