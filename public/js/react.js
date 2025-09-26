class React {
    constructor(rootElement) {
        this.rootElement = rootElement
        this.currentPage = 'home' // default page
    }

    /**
     * @function render - Appends
     * @description Renders the application inside the root element
     * @param {App} app - The root application component
     */
    render(app) {
        if (!this.rootElement) {
            console.error('React: Root element not found')
            return
        }

        if (!app || !(app instanceof HTMLElement)) {
            console.error('React: Invalid app component')
            return
        }

        this.rootElement.appendChild(app)
    }

    /**
     *
     * @param {string} tag - HTML tag or component
     * @param {Object} props - Attributes or props
     * @param  {...any} children - Child elements or components
     * @returns {HTMLElement}
     */
    static createElement(tag, props, ...children) {
        // if tag is a function, it's a component
        if (typeof tag === 'function') {
            return tag({ ...props, children })
        }

        // otherwise, it's a regular HTML element
        const element = document.createElement(tag)

        // Check for event listeners, styles, and className in props
        // Example: { onClick: alert(1), style: { color: 'red' }, className: 'my-class' }
        for (const [name, value] of Object.entries(props || {})) {
            if (name.startsWith('on')) {
                element.addEventListener(name.substring(2).toLowerCase(), value)
            } else if (name === 'style') {
                Object.assign(element.style, value)
            } else if (name === 'className') {
                element.className = value
            } else {
                element.setAttribute(name, value)
            }
        }

        children.flat().forEach((child) => {
            if (child instanceof Node) {
                element.appendChild(child)
            } else {
                element.appendChild(document.createTextNode(child))
            }
        })

        return element
    }
}

export default React
