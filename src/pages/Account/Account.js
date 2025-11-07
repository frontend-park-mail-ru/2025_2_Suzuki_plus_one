import './styles/account.scss';
import './styles/security.scss';
import settingsTemplate from './ui/Settings.hbs';
import securityTemplate from './ui/Security.hbs';
import pencil_icon from '@assets/images/icons/pencil-white.svg';
import camera_icon from '@assets/images/icons/camera-white.svg';
import Tabs from '@shared/components/Tabs/Tabs.js';
import { updateUserProfile, uploadUserAvatar } from '@shared/api/userApi.js';
import { validatePassword, validateEmail, validateUsername, validatePhone } from '@shared/utils/validation.js';
import { setupPasswordToggle } from '@shared/ui/passwordToggle.js';

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
        } else if (this.activeTab === 'security') {
        this.#setupSecurityForm();
    }
    }

    #setupSecurityForm() {
        const form = this.#parent.querySelector('.security__form');
        if (!form) return;

        setupPasswordToggle(form);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.#clearErrors();

            const oldPassword = form.querySelector('#old_password').value;
            const newPassword = form.querySelector('#new_password').value;
            const repeatPassword = form.querySelector('#repeat_password').value;

            const errors = {};

            if (!oldPassword) {
                errors.old = 'Old password is required';
            }

            const newPassError = validatePassword(newPassword);
            if (newPassError) {
                errors.new = newPassError;
            }

            if (newPassword !== repeatPassword) {
                errors.repeat = 'Passwords do not match';
            }

            if (Object.keys(errors).length > 0) {
                Object.entries(errors).forEach(([field, msg]) => {
                    this.#showError(`password_${field}`, msg);
                });
                return;
            }

            try {
                await updateUserPassword({
                    old_password: oldPassword,
                    new_password: newPassword,
                });

                form.reset();
                this.#showSuccess('Password changed successfully!');
            } catch (err) {
                if (err.status === 401 || err.message.toLowerCase().includes('old')) {
                    this.#showError('password_old', 'Incorrect old password');
                } else {
                    this.#showError('form', err.message || 'Failed to change password');
                }
            }
        });
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
                this.#showError('avatar', 'Please select a PNG or JPEG/JPG image');
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
        const birthInput = form.querySelector('#birthdate');
        birthInput.type = 'text';
        birthInput.placeholder = 'YYYY-MM-DD';
        birthInput.value = this.user.date_of_birth || '';

        birthInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 4) val = val.slice(0, 4) + '-' + val.slice(4);
            if (val.length > 7) val = val.slice(0, 7) + '-' + val.slice(7, 9);
            e.target.value = val.slice(0, 10);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.#clearErrors();
            
            const data = {
                username: form.querySelector('#username').value.trim(),
                email: form.querySelector('#email').value.trim(),
                date_of_birth: form.querySelector('#birthdate').value,
                phone_number: form.querySelector('#phone').value.trim(),
            };
            const errors = {};

            const emailError = validateEmail(data.email);
            if (emailError) errors.email = emailError;

            const usernameError = validateUsername(data.username);
            if (usernameError) errors.username = usernameError;

            const phoneError = validatePhone(data.phone_number);
            if (phoneError) errors.phone = phoneError;

            if (data.date_of_birth) {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date_of_birth)) {
                    errors.birthdate = 'Date must be in format YYYY-MM-DD';
                } else {
                    const date = new Date(data.date_of_birth);
                    if (isNaN(date.getTime()) || date.getFullYear() < 1900 || date.getFullYear() > new Date().getFullYear()) {
                        errors.birthdate = 'Invalid date';
                    }
                }
            }

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, msg]) => {
                this.#showError(field, msg);
            });
            return;
        }

            try {
                await updateUserProfile(data);
                Object.assign(this.user, data);
                this.#app.user = this.user;
                this.#app.header.render();
                this.#showSuccess();
            } catch (err) {
                this.#showError('form', err.message);
            }
        });
    }

    #showError(field, message) {
        const errorEl = this.#parent.querySelector(
            `.account__error--${field}, .security__error--${field}`
        );
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

    #showSuccess() {
        const successEl = this.#parent.querySelector('.account__success');
        if (!successEl) return;
        successEl.textContent = 'Profile saved successfully!';
        successEl.hidden = false;
        setTimeout(() => { successEl.hidden = true; }, 3000);
    }
}

export default Account;
