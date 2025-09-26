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
}

/**
 *
 * @param {string} tag - HTML tag or component
 * @param {Object} props - Attributes or props
 * @param  {...any} children - Child elements or components
 * @returns {HTMLElement}
 */
export function createElement(tag, props, ...children) {
    // If the tag is a function, treat it as a component
    if (typeof tag === 'function') {
        return tag({ ...props, children })
    }

    // Otherwise, create a standard HTML element
    const element = document.createElement(tag)

    // Set attributes and event listeners
    // Example: onClick -> click event listener
    for (const [name, value] of Object.entries(props || {})) {
        if (name.startsWith('on')) {
            element.addEventListener(name.substring(2).toLowerCase(), value)
        } else {
            element.setAttribute(name, value)
        }
    }

    // Append children with some text nodes
    children.flat().forEach((child) => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child))
        } else {
            element.appendChild(child)
        }
    })

    return element
}

export default React
