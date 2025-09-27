import React from '../js/react.js';
import { Route, Router } from '../js/router.js';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';

export default function App() {
    return React.createElement(
        'div',
        { className: 'app-container' },
        React.createElement(Header),
        // React.createElement(
        //     Router,
        //     null,
        //     React.createElement(Link, { to: 'home' }, 'Главная'),
        //     ' | ',
        //     ' | ',
        //     React.createElement(Link, { to: 'login' }, 'Вход'),
        //     ' | ',
        //     React.createElement(Link, { to: 'signup' }, 'Регистрация'),
        // ),
        React.createElement(
            'main',
            { className: 'content' },
            React.createElement(Route, { path: 'home', component: Home }),
            React.createElement(Route, { path: 'login', component: Login }),
            React.createElement(Route, { path: 'signup', component: Signup }),
        ),
        React.createElement(Footer)
    );
}