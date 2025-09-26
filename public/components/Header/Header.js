// class Header {
//     render() {
//         // This works only with precompiled js templates
//         const template = Handlebars.templates['Header.hbs']
//         // compile template at runtime
//         return template({})
//     }
// }
import React from '../../js/react.js'

function Header() {
    // This works only with precompiled js templates
    const template = Handlebars.templates['Header.hbs']
    // compile template at runtime
    return React.createElement(template({}))
}
export default Header
