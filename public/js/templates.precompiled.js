;(function () {
    var template = Handlebars.template,
        templates = (Handlebars.templates = Handlebars.templates || {})
    templates['Header/Header'] = template({
        compiler: [8, '>= 4.3.0'],
        main: function (container, depth0, helpers, partials, data) {
            return "<header class='w-100'>\n    <div class='container'>\n        <div class='row align-items-center py-3 mb-0'>\n\n            <div class='col-4 d-flex justify-content-start ps-4'>\n                <a\n                    href='/'\n                    class='d-flex align-items-center text-dark text-decoration-none'\n                >\n                    <img\n                        src='/img/logo.svg'\n                        width='50'\n                        height='50'\n                        alt='Logo'\n                    />\n                </a>\n            </div>\n\n            <div class='col-4 d-flex justify-content-center'>\n                <ul class='nav'>\n                    <li><a href='#' class='nav-link px-2 link-dark'>Popular\n                            series</a></li>\n                    <li><a href='#' class='nav-link px-2 link-dark'>Recommended\n                            series</a></li>\n                </ul>\n            </div>\n\n            <div class='col-4 d-flex justify-content-end pe-4'>\n                <button type='button' class='btn btn-login mr-2'>Login</button>\n                <button type='button' class='btn btn-signup'>Sign up</button>\n            </div>\n        </div>\n    </div>\n</header>"
        },
        useData: true,
    })
})()
