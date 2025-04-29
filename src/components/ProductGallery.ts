export class ProductGallery {
  protected container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
    return this.container;
  }
}