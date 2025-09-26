;(function () {
    var template = Handlebars.template,
        templates = (Handlebars.templates = Handlebars.templates || {})
    templates['Header.hbs'] = template({
        compiler: [8, '>= 4.3.0'],
        main: function (container, depth0, helpers, partials, data) {
            return '<header class="w-100">\n    <div class="container">\n        <div class="row align-items-center py-3 mb-0">\n\n            <div class="col-4 d-flex justify-content-start ps-4">\n                <a href="/" class="d-flex align-items-center text-dark text-decoration-none">\n                    <img src="/img/logo.svg" width="50" height="50" alt="Logo">\n                </a>\n            </div>\n\n            <div class="col-4 d-flex justify-content-center">\n                <ul class="nav">\n                    <li><a href="#" class="nav-link px-2 link-dark">Popular series</a></li>\n                    <li><a href="#" class="nav-link px-2 link-dark">Recommended series</a></li>\n                </ul>\n            </div>\n\n            <div class="col-4 d-flex justify-content-end pe-4">\n                <button type="button" class="btn btn-login mr-2">Login</button>\n                <button type="button" class="btn btn-signup">Sign up</button>\n            </div>\n        </div>\n    </div>\n</header>'
        },
        useData: true,
    })
})()
