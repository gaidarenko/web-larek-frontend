export class Modal {
  protected container: HTMLElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this._content = this.container.querySelector(".modal__content");

    const closeButtonElement = this.container.querySelector(".modal__close");
    closeButtonElement.addEventListener("click", this.close.bind(this));

    this.container.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
      
    this.handleEscUp = this.handleEscUp.bind(this);
  }
  
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add("modal_active");
    document.addEventListener("keyup", this.handleEscUp);
  }
  
  close() {
    this.container.classList.remove("modal_active");
    document.removeEventListener("keyup", this.handleEscUp);
  }
  
  handleEscUp (evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
