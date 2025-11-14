import template from './ui/Tabs.hbs';
import './styles/tabs.scss'

class Tabs {
    #parent;
    #onTabChange;

    constructor(parent, onTabChange = null) {
        this.#parent = parent;
        this.#onTabChange = onTabChange;
    }

    render(tabsConfig) {
        this.#parent.innerHTML = template({ tabs: tabsConfig });
        this.#setupEventListeners();
    }

    #setupEventListeners() {
        const tabLinks = this.#parent.querySelectorAll('.tabs__tab');

        tabLinks.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.#onTabChange) {
                    const page = tab.dataset.page;
                    const href = tab.getAttribute('href');
                    this.#onTabChange(page, href);
                }
            });
        });
    }

    setActiveTab(activePage) {
        const tabs = this.#parent.querySelectorAll('.tabs__tab');

        tabs.forEach(tab => {
            const isActive = tab.dataset.page === activePage;
            tab.classList.toggle('tabs__tab--active', isActive);
        });
    }
}

export default Tabs;