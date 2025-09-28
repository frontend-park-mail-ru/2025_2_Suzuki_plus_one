(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['FilmCard/FilmCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"film-card\"><img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"preview") || (depth0 != null ? lookupProperty(depth0,"preview") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preview","hash":{},"data":data,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":43}}}) : helper)))
    + " alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":1,"column":49},"end":{"line":1,"column":58}}}) : helper)))
    + "\">\r\n    <div class=\"film-info\">\r\n            <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":16},"end":{"line":3,"column":25}}}) : helper)))
    + "</h3>\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"year") || (depth0 != null ? lookupProperty(depth0,"year") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":23}}}) : helper)))
    + "</p>\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"genres") || (depth0 != null ? lookupProperty(depth0,"genres") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"genres","hash":{},"data":data,"loc":{"start":{"line":5,"column":15},"end":{"line":5,"column":25}}}) : helper)))
    + "</p>\r\n        </div>\r\n</div>";
},"useData":true});
templates['Footer/Footer'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<footer class=\"footer\">\r\n    <p>Popfilms. Made by \"Suzuki + 1\"</p>\r\n</footer>";
},"useData":true});
templates['Header/Header'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <img src=\"/img/user-icon.svg\" alt=\"User\" alt=\"user icon\" />\r\n            <button class=\"btn default\" id=\"logOutBtn\">Log out</button>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"btn sign-up\" id=\"signUpBtn\">Sign up</button>\r\n            <button class=\"btn log-in\" id=\"logInBtn\">Log in</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"header\">\r\n    <div class=\"logo\">\r\n        <a href=\"#\" id=\"homeLink\">\r\n            <img id=\"homeLink\" src=\"/img/logo.svg\" alt=\"Popfilms logo\" />\r\n        </a>\r\n    </div>\r\n    <div class=\"header-right\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isAuthorized") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n</header>";
},"useData":true});
templates['Home/Home'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main class=\"index\">\r\n    <div class=\"main_page\">\r\n        <img src=\"/img/bg_picture.svg\" alt=\"Background picture\">\r\n        <div class=\"text-container\">\r\n            <h1>POPFILMS</h1>\r\n            <h2>Series, popcorn and chill</h2>\r\n            <button class=\"btn default play\">▶</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"section-title\">\r\n        <h1>Popular series</h1>\r\n    </div>\r\n\r\n    <div class=\"films-container\" id=\"filmsContainer\">\r\n        \r\n    </div>\r\n</main>";
},"useData":true});
templates['Login/Login'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main class=\"auth\">\r\n    <div class=\"container\" id=\"container\">\r\n        <div class=\"form-container log-in-container\">\r\n            <form action=\"#\" id=\"login-form\">\r\n                <h1>Log in</h1>\r\n                <input type=\"email\" placeholder=\"Email\" required />\r\n                <div id=\"emailError\" class=\"error-message\"></div>\r\n                <div class=\"password-wrapper\">\r\n                    <input type=\"password\" id=\"password\" placeholder=\"Password\" required />\r\n                    <button type=\"button\" class=\"toggle-password\">\r\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"\r\n                            style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\r\n                            <path\r\n                                d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\r\n                        </svg>\r\n                    </button>\r\n                </div>\r\n                <div id=\"passwordError\" class=\"error-message\"></div>\r\n                <div class=\"btn-wrapper\">\r\n                    <button type=\"submit\" class=\"btn default\">Log in</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</main>";
},"useData":true});
templates['Signup/Signup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<main class=\"auth\">\r\n    <div class=\"container\" id=\"container\">\r\n        <div class=\"form-container sign-up-container\">\r\n            <form id=\"signup-form\">\r\n                <h1>Sign Up</h1>\r\n                <input type=\"text\" name=\"username\" placeholder=\"Username\" required />\r\n                <input type=\"email\" name=\"email\" placeholder=\"Email\" required />\r\n                <div id=\"emailError\" class=\"error-message\"></div>\r\n                <div class=\"password-wrapper\">\r\n                    <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" required />\r\n                    <button type=\"button\" class=\"toggle-password\">\r\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"\r\n                            style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\r\n                            <path\r\n                                d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\r\n                        </svg>\r\n                    </button>\r\n                </div>\r\n                <div id=\"passwordError\" class=\"error-message\"></div>\r\n                <div class=\"password-wrapper\">\r\n                    <input type=\"password\" id=\"confirm-password\" name=\"confirm-password\" placeholder=\"Confirm Password\"\r\n                        required />\r\n                    <button type=\"button\" class=\"toggle-password\">\r\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"\r\n                            style=\"display: block; margin: auto;\" fill=\"#1f1f1f\">\r\n                            <path\r\n                                d=\"M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z\" />\r\n                        </svg>\r\n                    </button>\r\n                </div>\r\n                <div id=\"confirmError\" class=\"error-message\"></div>\r\n                <div class=\"btn-wrapper\">\r\n                    <button type=\"submit\" class=\"btn default\">Sign up</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</main>";
},"useData":true});
})();