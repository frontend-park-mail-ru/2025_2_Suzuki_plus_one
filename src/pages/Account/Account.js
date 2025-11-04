import './styles/account.scss';
import './styles/security.scss';
import settingsTemplate from './ui/Settings.hbs';
import securityTemplate from './ui/Security.hbs';
import pencil_icon from '@assets/images/icons/pencil-white.svg';
import camera_icon from '@assets/images/icons/camera-white.svg';
import Tabs from '@shared/components/Tabs/Tabs.js';

class Account {
    #parent;
    #app;
    #tabs;
    activeTab;
    tabTemplates;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;

        this.activeTab = params.tab || 'settings';

        this.tabTemplates = {
            settings: settingsTemplate,
            security: securityTemplate,
        };
    }

    render() {
        this.#parent.innerHTML = `
            <div id="accountTabs"></div>
            <div id="tabContent"></div>
        `;
        this.#initTabs();
        this.#renderActiveTab();
    }

    #initTabs() {
        const tabsContainer = this.#parent.querySelector('#accountTabs');

        const tabsConfig = [
            { label: 'Settings', href: '/account/settings', page: 'settings', active: this.activeTab === 'settings' },
            { label: 'Security', href: '/account/security', page: 'security', active: this.activeTab === 'security' },
        ];

        this.#tabs = new Tabs(tabsContainer, (page, href) => this.#handleTabChange(page, href));
        this.#tabs.render(tabsConfig);
    }

    #handleTabChange(page, href) {
        window.history.pushState({ tab: page }, '', href);

        this.activeTab = page;
        this.#tabs.setActiveTab(page);
        this.#renderActiveTab();
    }

    #renderActiveTab() {
        const container = this.#parent.querySelector('#tabContent');
        const template = this.tabTemplates[this.activeTab];
        container.innerHTML = template({ camera_icon, pencil_icon });
    }
}

export default Account;
