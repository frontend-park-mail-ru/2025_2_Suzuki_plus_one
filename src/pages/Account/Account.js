import './styles/account.scss';
import './styles/security.scss';
import settingsTemplate from './ui/Settings.hbs';
import securityTemplate from './ui/Security.hbs';
import pencil_icon from '@assets/images/icons/pencil-white.svg';
import camera_icon from '@assets/images/icons/camera-white.svg';
import Tabs from '@shared/components/Tabs/Tabs.js';
import { updateUserProfile, uploadUserAvatar } from '@shared/api/userApi.js';

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

        this.user = this.#app.user;

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
        
        const context = {
            camera_icon,
            pencil_icon,
            data: this.user || {},
        };

        container.innerHTML = template(context);

        if (this.activeTab === 'settings'){
            this.#setupSettingsForm();
        }
    }
    #setupSettingsForm() {
        const form = this.#parent.querySelector('.account__form');
        if (!form) return;

        const avatarInput = document.createElement('input');
        avatarInput.type = 'file';
        avatarInput.accept = 'image/png,image/jpeg,image/jpg';
        avatarInput.style.display = 'none';
        form.appendChild(avatarInput);

        form.querySelector('.account__avatar-edit').addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', async () => {
            this.#clearErrors();
            const file = avatarInput.files[0];
            if (!file) return;

            const validTypes = ['image/png', 'image/jpeg'];
            const fileType = file.type;

            if (!validTypes.includes(fileType)) {
                this.#showError('avatar', 'Please select a PNG or JPEG image');
                avatarInput.value = '';
                return;
            }

            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                this.#showError('avatar', 'Image must be less than 5 MB');
                avatarInput.value = '';
                return;
            }
            
            try {
                const result = await uploadUserAvatar(file);
                this.user.avatar_url = result.avatar_url;
                this.#app.user = this.user;
                this.#app.header.render();
                this.#renderActiveTab();
            } catch (err) {
                this.#showError('avatar', err.message);
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.#clearErrors()
            const data = {
                username: form.querySelector('#username').value.trim(),
                email: form.querySelector('#email').value.trim(),
                date_of_birth: form.querySelector('#birthdate').value,
                phone_number: form.querySelector('#phone').value.trim(),
            };

            try {
                await updateUserProfile(data);
                Object.assign(this.user, data);
                this.#app.user = this.user;
                this.#app.header.render();
            } catch (err) {
                this.#showError('form', err.message);
            }
        });
    }

    #showError(field, message) {
        const errorEl = this.#parent.querySelector(`.account__error--${field}`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.hidden = false;
        }
    }

    #clearErrors() {
        this.#parent.querySelectorAll('.account__error').forEach(el => {
            el.textContent = '';
            el.hidden = true;
        });
    }
}

export default Account;
