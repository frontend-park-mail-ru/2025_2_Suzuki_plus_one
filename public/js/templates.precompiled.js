(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Footer/Footer'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<footer class=\"footer bg-dark text-light py-3\">\n    <div class=\"container\">\n        <div class=\"text-center mt-3\">\n            <p>&copy; 2025 Popfilms. Все права защищены.</p>\n        </div>\n    </div>\n</footer>";
},"useData":true});
templates['Header/Header'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header class=\"header\">\n    <div class=\"container\">\n        <div class=\"logo\">\n            <a href=\"/\" class=\"d-flex align-items-center text-white text-decoration-none\">\n                <img src=\"/img/logo.svg\" width=\"50\" height=\"50\" alt=\"Popfilms logo\" />\n            </a>\n        </div>\n        <div class=\"header-right\">\n            <button class=\"btn sign-up text-white\" id=\"signUpBtn\">Sign up</button>\n            <button class=\"btn default text-white\" id=\"signInBtn\">Sign in</button>\n        </div>\n    </div>\n</header>";
},"useData":true});
templates['Home/Home'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"home-container\">\n    <h1>Popfilms!</h1>\n</div>";
},"useData":true});
templates['Login/Login'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-container\">\n    <main>\n        <div class=\"container\" id=\"container\">\n            <div class=\"form-container sign-in-container\">\n                <form action=\"#\" id=\"login-form\">\n                    <h1>Sign In</h1>\n                    <input type=\"email\" placeholder=\"Email\" required />\n                    <div class=\"password-wrapper\">\n                        <input type=\"password\" id=\"password\" placeholder=\"Password\" required />\n                        <button type=\"button\" class=\"toggle-password\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\n                                <path d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\n                            </svg>\n                        </button>\n                    </div>\n                    <div class=\"btn-wrapper\">\n                        <button type=\"submit\" class=\"btn default\">Sign In</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </main>\n</div>";
},"useData":true});
templates['Movies/Movies'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"movie-card\">\n                <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"poster") || (depth0 != null ? lookupProperty(depth0,"poster") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":36}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":43},"end":{"line":6,"column":52}}}) : helper)))
    + "\" width=\"200\">\n                <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":20},"end":{"line":7,"column":29}}}) : helper)))
    + "</h3>\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":8,"column":19},"end":{"line":8,"column":34}}}) : helper)))
    + "</p>\n                <button class=\"watch-btn\">Смотреть</button>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"movies-container\">\n    <h2>Популярные фильмы</h2>\n    <div class=\"movies-grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"films") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});
templates['Signup/Signup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container\" id=\"container\">\n    <div class=\"form-container sign-up-container\">\n        <form id=\"signup-form\">\n            <h1>Регистрация</h1>\n            <input type=\"email\" name=\"email\" placeholder=\"Email\" required />\n            <div class=\"password-wrapper\">\n                <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" required />\n                <button type=\"button\" class=\"toggle-password\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\n                        <path d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\n                    </svg>\n                </button>\n            </div>\n            <div class=\"password-wrapper\">\n                <input type=\"password\" id=\"confirm-password\" name=\"confirm-password\" placeholder=\"Confirm Password\" required />\n                <button type=\"button\" class=\"toggle-password\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\n                        <path d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\n                    </svg>\n                </button>\n            </div>\n            <div class=\"btn-wrapper\">\n                <button type=\"submit\" class=\"btn default\">Зарегистрироваться</button>\n            </div>\n        </form>\n    </div>\n</div>";
},"useData":true});
})();