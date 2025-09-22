/**
 * @class App
 * @description Main applications component. Manage navigation and page rendering
 */
class App {
  constructor() {
    this.currentPage = 'home';
}

  /**
   * @description Renders current page based on state
   * @returns {HTMLElement} Root DOM element of application
   */
  render() {
    const container = document.createElement('div');
    container.className = 'app-container';
    
    if (this.currentPage === 'home') {
        console.log('123');
        // do something
    } else if (this.currentPage === 'login') {
        // do otherthing
    } else if (this.currentPage === 'signup') {
        // do otherthing
    }

    return container;
  }
}

export default App;