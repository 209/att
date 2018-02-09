import App from './app';

class Init {
  constructor() {
    document.addEventListener('DOMContentLoaded', Init.ready);
  }

  static ready() {
    window.inst = new App();
  }
}

window.inst = new Init();
