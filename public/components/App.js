import React from '../js/react.js'
import { Link, Route, Router } from '../js/router.js'
import Header from './Header/Header.js'

export default function App() {
    return React.createElement(
        Router,
        null,
        React.createElement(Link, { to: '/home' }, 'Home'),
        ' | ',
        React.createElement(Link, { to: '/about' }, 'About'),
        React.createElement(Route, {
            path: '/home',
            component: Header,
        }),
        React.createElement(Route, {
            path: '/about',
            component: () => React.createElement('div', null, 'About Page'),
        })
    )
}
