import { createElement } from '../js/react.js'
import {Link, Route} from '../js/router.js'

// export default function App() {
//     // return createElement(
//     //     'div',
//     //     { className: 'app-container' },
//     //     createElement('h1', null, 'Welcome to the App'),
//     //     createElement(
//     //         'p',
//     //         null,
//     //         'This is a simple SPA framework using vanilla JS and Handlebars.'
//     //     )
//     // )

//     return
// }
import Header from './Header/Header.js'

export default function App() {
    return createElement(
        'div',
        null,
        createElement(undefined, { to: '/' }, 'Home'),
        ' | ',
        createElement(undefined, { to: '/about' }, 'About'),
        createElement(undefined, { path: '/', component: Header }),
        createElement(undefined, { path: '/about', component: App })
    )
}
// import Header from './Header/Header.js'
/**
 * @class App
 * @description Main applications component. Manage navigation and page rendering
 */
// class App {
// /**
//  * @description Navigates to a different page
//  * @param {string} page - The page to navigate to
//  */
// navigateTo(page) {
//     this.currentPage = page
//     this.render()
// }

// /**
//  * @description Renders current page based on state
//  * @returns {HTMLElement} Root DOM element of application
//  */
// render() {
//     const root = document.querySelector('#root')
//     if (!root) {
//         console.error('App: Parent element not found')
//         return null
//     }

//     const headerContainer = document.createElement('header')
//     headerContainer.innerHTML = new Header().render()
//     root.appendChild(headerContainer)

//     // const container = document.createElement('div')
//     // container.className = 'app-container'

//     // const headerContainer = document.createElement("div");
//     // container.appendChild(headerContainer);

//     // const header = new Header()
//     // let header_rendered_html = header.render()
//     // const tempDiv = document.createElement('div')
//     // tempDiv.innerHTML = header_rendered_html
//     // const headerElement = tempDiv.firstElementChild
//     // container.appendChild(headerElement)

//     // Router. Take care to separate later
//     if (this.currentPage === 'home') {
//         console.log('We are at home')
//         // do something
//     } else if (this.currentPage === 'login') {
//         console.log('We are at login')
//         // do otherthing
//     } else if (this.currentPage === 'signup') {
//         console.log('We are at signup')
//         // do otherthing
//     }

//     return container
// }
// }
