class React {
    constructor(rootElement, appComponent) {
        this.rootElement = rootElement;
        this.state = { currentPage: 'home' };
        this.App = appComponent; 
    }

    render(app) {
        if (!this.rootElement) {
            console.error('React: Root element not found');
            return;
        }
        if (!app || !(app instanceof Node)) {
            console.error('React: Invalid app component, expected Node, got:', app);
            return;
        }
        this.rootElement.appendChild(app);
    }

    static createElement(tag, props, ...children) {
        if (typeof tag === 'function') {
            const result = tag({ ...props, children });
            return result;
        }
        const element = document.createElement(tag);
        for (const [name, value] of Object.entries(props || {})) {
            if (name.startsWith('on') && typeof value === 'function') {
                element.addEventListener(name.substring(2).toLowerCase(), value);
            } else if (name === 'style') {
                Object.assign(element.style, value);
            } else if (name === 'className') {
                element.className = value;
            } else if (value != null) {
                element.setAttribute(name, value);
            }
        }
        children.flat().forEach((child) => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else if (child != null) {
                element.appendChild(document.createTextNode(child));
            }
        });
        return element;
    }

    setPage(page) {
        this.state.currentPage = page;
        this.update();
    }

    update() {
        if (!this.rootElement) {
            console.error('React: Root element not found for update');
            return;
        }
        if (!this.App) {
            console.error('React: App component not provided');
            return;
        }
        this.rootElement.innerHTML = '';
        const app = React.createElement(this.App);
        this.render(app);
    }
}

export default React;