(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(s){if(s.ep)return;s.ep=!0;const t=r(s);fetch(s.href,t)}})();const fe="data:image/svg+xml,%3csvg%20width='21'%20height='20'%20viewBox='0%200%2021%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.0833%2014.5833L18.8333%2018.3333'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M17.1665%209.16663C17.1665%205.02449%2013.8086%201.66663%209.6665%201.66663C5.52437%201.66663%202.1665%205.02449%202.1665%209.16663C2.1665%2013.3088%205.52437%2016.6666%209.6665%2016.6666C13.8086%2016.6666%2017.1665%2013.3088%2017.1665%209.16663Z'%20stroke='white'%20stroke-width='1.5'%20stroke-linejoin='round'/%3e%3c/svg%3e";function Fe(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var Z={exports:{}},D={},O={},me;function I(){if(me)return O;me=1,O.__esModule=!0,O.extend=s,O.indexOf=l,O.escapeExpression=p,O.isEmpty=u,O.createFrame=d,O.blockParams=h,O.appendContextPath=x;var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},e=/[&<>"'`=]/g,r=/[&<>"'`=]/;function i(m){return a[m]}function s(m){for(var C=1;C<arguments.length;C++)for(var k in arguments[C])Object.prototype.hasOwnProperty.call(arguments[C],k)&&(m[k]=arguments[C][k]);return m}var t=Object.prototype.toString;O.toString=t;var n=function(C){return typeof C=="function"};n(/x/)&&(O.isFunction=n=function(m){return typeof m=="function"&&t.call(m)==="[object Function]"}),O.isFunction=n;var o=Array.isArray||function(m){return m&&typeof m=="object"?t.call(m)==="[object Array]":!1};O.isArray=o;function l(m,C){for(var k=0,g=m.length;k<g;k++)if(m[k]===C)return k;return-1}function p(m){if(typeof m!="string"){if(m&&m.toHTML)return m.toHTML();if(m==null)return"";if(!m)return m+"";m=""+m}return r.test(m)?m.replace(e,i):m}function u(m){return!m&&m!==0?!0:!!(o(m)&&m.length===0)}function d(m){var C=s({},m);return C._parent=m,C}function h(m,C){return m.path=C,m}function x(m,C){return(m?m+".":"")+C}return O}var W={exports:{}},_e;function F(){return _e||(_e=1,(function(a,e){e.__esModule=!0;var r=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];function i(s,t){var n=t&&t.loc,o=void 0,l=void 0,p=void 0,u=void 0;n&&(o=n.start.line,l=n.end.line,p=n.start.column,u=n.end.column,s+=" - "+o+":"+p);for(var d=Error.prototype.constructor.call(this,s),h=0;h<r.length;h++)this[r[h]]=d[r[h]];Error.captureStackTrace&&Error.captureStackTrace(this,i);try{n&&(this.lineNumber=o,this.endLineNumber=l,Object.defineProperty?(Object.defineProperty(this,"column",{value:p,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:u,enumerable:!0})):(this.column=p,this.endColumn=u))}catch{}}i.prototype=new Error,e.default=i,a.exports=e.default})(W,W.exports)),W.exports}var j={},Y={exports:{}},ve;function Ye(){return ve||(ve=1,(function(a,e){e.__esModule=!0;var r=I();e.default=function(i){i.registerHelper("blockHelperMissing",function(s,t){var n=t.inverse,o=t.fn;if(s===!0)return o(this);if(s===!1||s==null)return n(this);if(r.isArray(s))return s.length>0?(t.ids&&(t.ids=[t.name]),i.helpers.each(s,t)):n(this);if(t.data&&t.ids){var l=r.createFrame(t.data);l.contextPath=r.appendContextPath(t.data.contextPath,t.name),t={data:l}}return o(s,t)})},a.exports=e.default})(Y,Y.exports)),Y.exports}var J={exports:{}},ge;function Je(){return ge||(ge=1,(function(a,e){e.__esModule=!0;function r(n){return n&&n.__esModule?n:{default:n}}var i=I(),s=F(),t=r(s);e.default=function(n){n.registerHelper("each",function(o,l){if(!l)throw new t.default("Must pass iterator to #each");var p=l.fn,u=l.inverse,d=0,h="",x=void 0,m=void 0;l.data&&l.ids&&(m=i.appendContextPath(l.data.contextPath,l.ids[0])+"."),i.isFunction(o)&&(o=o.call(this)),l.data&&(x=i.createFrame(l.data));function C(c,w,b){x&&(x.key=c,x.index=w,x.first=w===0,x.last=!!b,m&&(x.contextPath=m+c)),h=h+p(o[c],{data:x,blockParams:i.blockParams([o[c],c],[m+c,null])})}if(o&&typeof o=="object")if(i.isArray(o))for(var k=o.length;d<k;d++)d in o&&C(d,d,d===o.length-1);else if(typeof Symbol=="function"&&o[Symbol.iterator]){for(var g=[],v=o[Symbol.iterator](),M=v.next();!M.done;M=v.next())g.push(M.value);o=g;for(var k=o.length;d<k;d++)C(d,d,d===o.length-1)}else(function(){var c=void 0;Object.keys(o).forEach(function(w){c!==void 0&&C(c,d-1),c=w,d++}),c!==void 0&&C(c,d-1,!0)})();return d===0&&(h=u(this)),h})},a.exports=e.default})(J,J.exports)),J.exports}var X={exports:{}},we;function Xe(){return we||(we=1,(function(a,e){e.__esModule=!0;function r(t){return t&&t.__esModule?t:{default:t}}var i=F(),s=r(i);e.default=function(t){t.registerHelper("helperMissing",function(){if(arguments.length!==1)throw new s.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},a.exports=e.default})(X,X.exports)),X.exports}var K={exports:{}},ye;function Ke(){return ye||(ye=1,(function(a,e){e.__esModule=!0;function r(n){return n&&n.__esModule?n:{default:n}}var i=I(),s=F(),t=r(s);e.default=function(n){n.registerHelper("if",function(o,l){if(arguments.length!=2)throw new t.default("#if requires exactly one argument");return i.isFunction(o)&&(o=o.call(this)),!l.hash.includeZero&&!o||i.isEmpty(o)?l.inverse(this):l.fn(this)}),n.registerHelper("unless",function(o,l){if(arguments.length!=2)throw new t.default("#unless requires exactly one argument");return n.helpers.if.call(this,o,{fn:l.inverse,inverse:l.fn,hash:l.hash})})},a.exports=e.default})(K,K.exports)),K.exports}var Q={exports:{}},be;function Qe(){return be||(be=1,(function(a,e){e.__esModule=!0,e.default=function(r){r.registerHelper("log",function(){for(var i=[void 0],s=arguments[arguments.length-1],t=0;t<arguments.length-1;t++)i.push(arguments[t]);var n=1;s.hash.level!=null?n=s.hash.level:s.data&&s.data.level!=null&&(n=s.data.level),i[0]=n,r.log.apply(r,i)})},a.exports=e.default})(Q,Q.exports)),Q.exports}var ee={exports:{}},ke;function et(){return ke||(ke=1,(function(a,e){e.__esModule=!0,e.default=function(r){r.registerHelper("lookup",function(i,s,t){return i&&t.lookupProperty(i,s)})},a.exports=e.default})(ee,ee.exports)),ee.exports}var te={exports:{}},Ce;function tt(){return Ce||(Ce=1,(function(a,e){e.__esModule=!0;function r(n){return n&&n.__esModule?n:{default:n}}var i=I(),s=F(),t=r(s);e.default=function(n){n.registerHelper("with",function(o,l){if(arguments.length!=2)throw new t.default("#with requires exactly one argument");i.isFunction(o)&&(o=o.call(this));var p=l.fn;if(i.isEmpty(o))return l.inverse(this);var u=l.data;return l.data&&l.ids&&(u=i.createFrame(l.data),u.contextPath=i.appendContextPath(l.data.contextPath,l.ids[0])),p(o,{data:u,blockParams:i.blockParams([o],[u&&u.contextPath])})})},a.exports=e.default})(te,te.exports)),te.exports}var Ee;function Ve(){if(Ee)return j;Ee=1,j.__esModule=!0,j.registerDefaultHelpers=C,j.moveHelperToHooks=k;function a(g){return g&&g.__esModule?g:{default:g}}var e=Ye(),r=a(e),i=Je(),s=a(i),t=Xe(),n=a(t),o=Ke(),l=a(o),p=Qe(),u=a(p),d=et(),h=a(d),x=tt(),m=a(x);function C(g){r.default(g),s.default(g),n.default(g),l.default(g),u.default(g),h.default(g),m.default(g)}function k(g,v,M){g.helpers[v]&&(g.hooks[v]=g.helpers[v],M||delete g.helpers[v])}return j}var ne={},re={exports:{}},xe;function nt(){return xe||(xe=1,(function(a,e){e.__esModule=!0;var r=I();e.default=function(i){i.registerDecorator("inline",function(s,t,n,o){var l=s;return t.partials||(t.partials={},l=function(p,u){var d=n.partials;n.partials=r.extend({},d,t.partials);var h=s(p,u);return n.partials=d,h}),t.partials[o.args[0]]=o.fn,l})},a.exports=e.default})(re,re.exports)),re.exports}var Pe;function rt(){if(Pe)return ne;Pe=1,ne.__esModule=!0,ne.registerDefaultDecorators=i;function a(s){return s&&s.__esModule?s:{default:s}}var e=nt(),r=a(e);function i(s){r.default(s)}return ne}var ae={exports:{}},Le;function Ne(){return Le||(Le=1,(function(a,e){e.__esModule=!0;var r=I(),i={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(t){if(typeof t=="string"){var n=r.indexOf(i.methodMap,t.toLowerCase());n>=0?t=n:t=parseInt(t,10)}return t},log:function(t){if(t=i.lookupLevel(t),typeof console<"u"&&i.lookupLevel(i.level)<=t){var n=i.methodMap[t];console[n]||(n="log");for(var o=arguments.length,l=Array(o>1?o-1:0),p=1;p<o;p++)l[p-1]=arguments[p];console[n].apply(console,l)}}};e.default=i,a.exports=e.default})(ae,ae.exports)),ae.exports}var V={},se={},Me;function at(){if(Me)return se;Me=1,se.__esModule=!0,se.createNewLookupObject=e;var a=I();function e(){for(var r=arguments.length,i=Array(r),s=0;s<r;s++)i[s]=arguments[s];return a.extend.apply(void 0,[Object.create(null)].concat(i))}return se}var Se;function Ue(){if(Se)return V;Se=1,V.__esModule=!0,V.createProtoAccessControl=t,V.resultIsAllowed=n,V.resetLoggedProperties=p;function a(u){return u&&u.__esModule?u:{default:u}}var e=at(),r=Ne(),i=a(r),s=Object.create(null);function t(u){var d=Object.create(null);d.constructor=!1,d.__defineGetter__=!1,d.__defineSetter__=!1,d.__lookupGetter__=!1;var h=Object.create(null);return h.__proto__=!1,{properties:{whitelist:e.createNewLookupObject(h,u.allowedProtoProperties),defaultValue:u.allowProtoPropertiesByDefault},methods:{whitelist:e.createNewLookupObject(d,u.allowedProtoMethods),defaultValue:u.allowProtoMethodsByDefault}}}function n(u,d,h){return o(typeof u=="function"?d.methods:d.properties,h)}function o(u,d){return u.whitelist[d]!==void 0?u.whitelist[d]===!0:u.defaultValue!==void 0?u.defaultValue:(l(d),!1)}function l(u){s[u]!==!0&&(s[u]=!0,i.default.log("error",'Handlebars: Access has been denied to resolve the property "'+u+`" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`))}function p(){Object.keys(s).forEach(function(u){delete s[u]})}return V}var Te;function je(){if(Te)return D;Te=1,D.__esModule=!0,D.HandlebarsEnvironment=m;function a(k){return k&&k.__esModule?k:{default:k}}var e=I(),r=F(),i=a(r),s=Ve(),t=rt(),n=Ne(),o=a(n),l=Ue(),p="4.7.8";D.VERSION=p;var u=8;D.COMPILER_REVISION=u;var d=7;D.LAST_COMPATIBLE_COMPILER_REVISION=d;var h={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};D.REVISION_CHANGES=h;var x="[object Object]";function m(k,g,v){this.helpers=k||{},this.partials=g||{},this.decorators=v||{},s.registerDefaultHelpers(this),t.registerDefaultDecorators(this)}m.prototype={constructor:m,logger:o.default,log:o.default.log,registerHelper:function(g,v){if(e.toString.call(g)===x){if(v)throw new i.default("Arg not supported with multiple helpers");e.extend(this.helpers,g)}else this.helpers[g]=v},unregisterHelper:function(g){delete this.helpers[g]},registerPartial:function(g,v){if(e.toString.call(g)===x)e.extend(this.partials,g);else{if(typeof v>"u")throw new i.default('Attempting to register a partial called "'+g+'" as undefined');this.partials[g]=v}},unregisterPartial:function(g){delete this.partials[g]},registerDecorator:function(g,v){if(e.toString.call(g)===x){if(v)throw new i.default("Arg not supported with multiple decorators");e.extend(this.decorators,g)}else this.decorators[g]=v},unregisterDecorator:function(g){delete this.decorators[g]},resetLoggedPropertyAccesses:function(){l.resetLoggedProperties()}};var C=o.default.log;return D.log=C,D.createFrame=e.createFrame,D.logger=o.default,D}var ie={exports:{}},qe;function st(){return qe||(qe=1,(function(a,e){e.__esModule=!0;function r(i){this.string=i}r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},e.default=r,a.exports=e.default})(ie,ie.exports)),ie.exports}var B={},oe={},He;function it(){if(He)return oe;He=1,oe.__esModule=!0,oe.wrapHelper=a;function a(e,r){if(typeof e!="function")return e;var i=function(){var t=arguments[arguments.length-1];return arguments[arguments.length-1]=r(t),e.apply(this,arguments)};return i}return oe}var Oe;function ot(){if(Oe)return B;Oe=1,B.__esModule=!0,B.checkRevision=u,B.template=d,B.wrapProgram=h,B.resolvePartial=x,B.invokePartial=m,B.noop=C;function a(c){return c&&c.__esModule?c:{default:c}}function e(c){if(c&&c.__esModule)return c;var w={};if(c!=null)for(var b in c)Object.prototype.hasOwnProperty.call(c,b)&&(w[b]=c[b]);return w.default=c,w}var r=I(),i=e(r),s=F(),t=a(s),n=je(),o=Ve(),l=it(),p=Ue();function u(c){var w=c&&c[0]||1,b=n.COMPILER_REVISION;if(!(w>=n.LAST_COMPATIBLE_COMPILER_REVISION&&w<=n.COMPILER_REVISION))if(w<n.LAST_COMPATIBLE_COMPILER_REVISION){var S=n.REVISION_CHANGES[b],E=n.REVISION_CHANGES[w];throw new t.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+S+") or downgrade your runtime to an older version ("+E+").")}else throw new t.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+c[1]+").")}function d(c,w){if(!w)throw new t.default("No environment passed to template");if(!c||!c.main)throw new t.default("Unknown template object: "+typeof c);c.main.decorator=c.main_d,w.VM.checkRevision(c.compiler);var b=c.compiler&&c.compiler[0]===7;function S(y,f,_){_.hash&&(f=i.extend({},f,_.hash),_.ids&&(_.ids[0]=!0)),y=w.VM.resolvePartial.call(this,y,f,_);var P=i.extend({},_,{hooks:this.hooks,protoAccessControl:this.protoAccessControl}),L=w.VM.invokePartial.call(this,y,f,P);if(L==null&&w.compile&&(_.partials[_.name]=w.compile(y,c.compilerOptions,w),L=_.partials[_.name](f,P)),L!=null){if(_.indent){for(var H=L.split(`
`),A=0,U=H.length;A<U&&!(!H[A]&&A+1===U);A++)H[A]=_.indent+H[A];L=H.join(`
`)}return L}else throw new t.default("The partial "+_.name+" could not be compiled when running in runtime-only mode")}var E={strict:function(f,_,P){if(!f||!(_ in f))throw new t.default('"'+_+'" not defined in '+f,{loc:P});return E.lookupProperty(f,_)},lookupProperty:function(f,_){var P=f[_];if(P==null||Object.prototype.hasOwnProperty.call(f,_)||p.resultIsAllowed(P,E.protoAccessControl,_))return P},lookup:function(f,_){for(var P=f.length,L=0;L<P;L++){var H=f[L]&&E.lookupProperty(f[L],_);if(H!=null)return f[L][_]}},lambda:function(f,_){return typeof f=="function"?f.call(_):f},escapeExpression:i.escapeExpression,invokePartial:S,fn:function(f){var _=c[f];return _.decorator=c[f+"_d"],_},programs:[],program:function(f,_,P,L,H){var A=this.programs[f],U=this.fn(f);return _||H||L||P?A=h(this,f,U,_,P,L,H):A||(A=this.programs[f]=h(this,f,U)),A},data:function(f,_){for(;f&&_--;)f=f._parent;return f},mergeIfNeeded:function(f,_){var P=f||_;return f&&_&&f!==_&&(P=i.extend({},_,f)),P},nullContext:Object.seal({}),noop:w.VM.noop,compilerInfo:c.compiler};function T(y){var f=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],_=f.data;T._setup(f),!f.partial&&c.useData&&(_=k(y,_));var P=void 0,L=c.useBlockParams?[]:void 0;c.useDepths&&(f.depths?P=y!=f.depths[0]?[y].concat(f.depths):f.depths:P=[y]);function H(A){return""+c.main(E,A,E.helpers,E.partials,_,L,P)}return H=g(c.main,H,E,f.depths||[],_,L),H(y,f)}return T.isTop=!0,T._setup=function(y){if(y.partial)E.protoAccessControl=y.protoAccessControl,E.helpers=y.helpers,E.partials=y.partials,E.decorators=y.decorators,E.hooks=y.hooks;else{var f=i.extend({},w.helpers,y.helpers);v(f,E),E.helpers=f,c.usePartial&&(E.partials=E.mergeIfNeeded(y.partials,w.partials)),(c.usePartial||c.useDecorators)&&(E.decorators=i.extend({},w.decorators,y.decorators)),E.hooks={},E.protoAccessControl=p.createProtoAccessControl(y);var _=y.allowCallsToHelperMissing||b;o.moveHelperToHooks(E,"helperMissing",_),o.moveHelperToHooks(E,"blockHelperMissing",_)}},T._child=function(y,f,_,P){if(c.useBlockParams&&!_)throw new t.default("must pass block params");if(c.useDepths&&!P)throw new t.default("must pass parent depths");return h(E,y,c[y],f,0,_,P)},T}function h(c,w,b,S,E,T,y){function f(_){var P=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],L=y;return y&&_!=y[0]&&!(_===c.nullContext&&y[0]===null)&&(L=[_].concat(y)),b(c,_,c.helpers,c.partials,P.data||S,T&&[P.blockParams].concat(T),L)}return f=g(b,f,c,y,S,T),f.program=w,f.depth=y?y.length:0,f.blockParams=E||0,f}function x(c,w,b){return c?!c.call&&!b.name&&(b.name=c,c=b.partials[c]):b.name==="@partial-block"?c=b.data["partial-block"]:c=b.partials[b.name],c}function m(c,w,b){var S=b.data&&b.data["partial-block"];b.partial=!0,b.ids&&(b.data.contextPath=b.ids[0]||b.data.contextPath);var E=void 0;if(b.fn&&b.fn!==C&&(function(){b.data=n.createFrame(b.data);var T=b.fn;E=b.data["partial-block"]=function(f){var _=arguments.length<=1||arguments[1]===void 0?{}:arguments[1];return _.data=n.createFrame(_.data),_.data["partial-block"]=S,T(f,_)},T.partials&&(b.partials=i.extend({},b.partials,T.partials))})(),c===void 0&&E&&(c=E),c===void 0)throw new t.default("The partial "+b.name+" could not be found");if(c instanceof Function)return c(w,b)}function C(){return""}function k(c,w){return(!w||!("root"in w))&&(w=w?n.createFrame(w):{},w.root=c),w}function g(c,w,b,S,E,T){if(c.decorator){var y={};w=c.decorator(w,y,b,S&&S[0],E,T,S),i.extend(w,y)}return w}function v(c,w){Object.keys(c).forEach(function(b){var S=c[b];c[b]=M(S,w)})}function M(c,w){var b=w.lookupProperty;return l.wrapHelper(c,function(S){return i.extend({lookupProperty:b},S)})}return B}var le={exports:{}},Ae;function lt(){return Ae||(Ae=1,(function(a,e){e.__esModule=!0,e.default=function(r){(function(){typeof globalThis!="object"&&(Object.prototype.__defineGetter__("__magic__",function(){return this}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__)})();var i=globalThis.Handlebars;r.noConflict=function(){return globalThis.Handlebars===r&&(globalThis.Handlebars=i),r}},a.exports=e.default})(le,le.exports)),le.exports}var Re;function ut(){return Re||(Re=1,(function(a,e){e.__esModule=!0;function r(v){return v&&v.__esModule?v:{default:v}}function i(v){if(v&&v.__esModule)return v;var M={};if(v!=null)for(var c in v)Object.prototype.hasOwnProperty.call(v,c)&&(M[c]=v[c]);return M.default=v,M}var s=je(),t=i(s),n=st(),o=r(n),l=F(),p=r(l),u=I(),d=i(u),h=ot(),x=i(h),m=lt(),C=r(m);function k(){var v=new t.HandlebarsEnvironment;return d.extend(v,t),v.SafeString=o.default,v.Exception=p.default,v.Utils=d,v.escapeExpression=d.escapeExpression,v.VM=x,v.template=function(M){return x.template(M,v)},v}var g=k();g.create=k,C.default(g),g.default=g,e.default=g,a.exports=e.default})(Z,Z.exports)),Z.exports}var ce,De;function ct(){return De||(De=1,ce=ut().default),ce}var dt=ct();const q=Fe(dt),pt=q.template({1:function(a,e,r,i,s){var t,n=a.lookupProperty||function(o,l){if(Object.prototype.hasOwnProperty.call(o,l))return o[l]};return`                <div class="header__auth">
                    <a href="/account/settings" data-navigate="/account/settings" class="header__user">
`+((t=n(r,"if").call(e??(a.nullContext||{}),(t=e!=null?n(e,"user"):e)!=null?n(t,"avatar_url"):t,{name:"if",hash:{},fn:a.program(2,s,0),inverse:a.program(4,s,0),data:s,loc:{start:{line:10,column:20},end:{line:14,column:27}}}))!=null?t:"")+'                    <span class="header__username" data-navigate="/account/settings">'+a.escapeExpression(a.lambda((t=e!=null?n(e,"user"):e)!=null?n(t,"username"):t,e))+`</span>
                    </a>

                    <span class="header__username" data-navigate="/account/settings">Support</span>
                    
                </div>
                <button
                    class='header__auth-button button'
                    type='button'
                    id='logOutBtn'
                >Log out</button>
`},2:function(a,e,r,i,s){var t,n=a.lambda,o=a.escapeExpression,l=a.lookupProperty||function(p,u){if(Object.prototype.hasOwnProperty.call(p,u))return p[u]};return'                    <img src="'+o(n((t=e!=null?l(e,"user"):e)!=null?l(t,"avatar_url"):t,e))+'" alt="'+o(n((t=e!=null?l(e,"user"):e)!=null?l(t,"username"):t,e))+`" class="header__avatar" />
`},4:function(a,e,r,i,s){return`                    <div class="header__avatar header__avatar--placeholder"></div>
`},6:function(a,e,r,i,s){return`                <button
                    class='header__auth-button button'
                    type='button'
                    data-navigate='/signup'
                >Sign up</button>
                <button
                    class='header__auth-button button'
                    type='button'
                    data-navigate='/login'
                >Log in</button>
`},compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=a.lookupProperty||function(o,l){if(Object.prototype.hasOwnProperty.call(o,l))return o[l]};return`<header class='header container'>
    <div class='header__inner'>
        <a class='header__logo logo' href='/' data-navigate id='homeLink'>
        </a>
        <div class='header__auth'>
`+((t=n(r,"if").call(e??(a.nullContext||{}),e!=null?n(e,"isAuthorized"):e,{name:"if",hash:{},fn:a.program(1,s,0),inverse:a.program(6,s,0),data:s,loc:{start:{line:7,column:12},end:{line:37,column:19}}}))!=null?t:"")+`        </div>
    </div>
    <nav class='header__menu'>
        <ul class='header__menu-list'>
            <li class='header__menu-item'>
                <a
                    class='header__menu-link'
                    href='/films'
                    data-navigate
                    id='homeLink'
                >
                    <h4 class='header__menu-title'>Films</h4>
                </a>
            </li>
            <li class='header__menu-item'>
                <a
                    class='header__menu-link'
                    href='/series'
                    data-navigate
                    id='homeLink'
                >
                    <h4 class='header__menu-title'>Series</h4>
                </a>
            </li>
        </ul>
    </nav>
</header>`},useData:!0}),ht="data:image/svg+xml,%3csvg%20width='32'%20height='48'%20viewBox='0%200%2032%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.7416%2011.52V4.80005H15.2871V11.52H12.7416ZM12.7416%2029.9734V23.2534H15.2871V29.9734H12.7416ZM18.7489%2018.8267V15.9467H27.1998V18.8267H18.7489ZM27.1998%2016H18.7489C18.7489%2014.5778%2018.4265%2013.4756%2017.7816%2012.6934C17.1707%2011.9112%2016.3222%2011.52%2015.2362%2011.52V4.80005C17.5101%204.80005%2019.5465%205.29783%2021.3453%206.29338C23.144%207.25338%2024.5695%208.58672%2025.6216%2010.2934C26.6737%2011.9645%2027.1998%2013.8667%2027.1998%2016ZM27.1998%2018.7734C27.1998%2020.9067%2026.6737%2022.8267%2025.6216%2024.5334C24.5695%2026.2045%2023.144%2027.5378%2021.3453%2028.5334C19.5465%2029.4934%2017.5101%2029.9734%2015.2362%2029.9734V23.2534C16.3222%2023.2534%2017.1707%2022.8623%2017.7816%2022.08C18.4265%2021.2978%2018.7489%2020.1956%2018.7489%2018.7734H27.1998ZM4.7998%2043.2001V4.80005H13.2507V43.2001H4.7998Z'%20fill='%23003049'/%3e%3cpath%20d='M15.2865%200C15.3078%201.492e-06%2015.329%200.00213141%2015.3503%200.00242123C18.2471%200.0188849%2021.0061%200.657396%2023.5238%202.02253L23.5246%202.02172C23.5359%202.02773%2023.5467%202.03506%2023.558%202.04109C23.5677%202.04635%2023.578%202.05034%2023.5876%202.05562L23.5868%202.05643C26.0797%203.38697%2028.1368%205.27871%2029.6547%207.71645C31.2112%2010.1808%2031.9687%2012.9556%2031.9969%2015.8962C31.9978%2015.9351%2032%2015.9741%2032%2016.0132V18.8694C32%2018.8983%2031.9981%2018.9271%2031.9977%2018.9558C31.9744%2021.9239%2031.2092%2024.723%2029.6547%2027.2194C29.6464%2027.2328%2029.6375%2027.2457%2029.629%2027.259C28.104%2029.6571%2026.0527%2031.5295%2023.5876%2032.8802C23.5667%2032.8917%2023.5456%2032.903%2023.5246%2032.9141C21.7931%2033.829%2019.9493%2034.406%2018.027%2034.6841V43.0413C18.027%2045.7799%2015.8866%2048%2013.2462%2048H4.78086C2.14052%2047.9999%200%2045.7799%200%2043.0413V4.95867C3.28536e-05%202.22014%202.14054%206.98536e-05%204.78086%200H15.2865ZM15.2351%2011.6235C16.3229%2011.6235%2017.1731%2012.0108%2017.785%2012.7865C18.3907%2013.5138%2018.7121%2014.5205%2018.7499%2015.8058L18.7538%2016.0664V18.817L18.7499%2019.0776C18.712%2020.3626%2018.3906%2021.3689%2017.785%2022.0961C17.1731%2022.8718%2016.323%2023.2599%2015.2351%2023.2599H13.2462V11.6235H15.2351ZM4.78086%2043.0413H13.2462V29.9239H15.2865C17.4015%2029.9173%2019.3109%2029.4991%2021.0143%2028.6689L21.3543%2028.4962C23.1562%2027.5089%2024.5841%2026.1859%2025.638%2024.5286C26.6831%2022.8502%2027.2097%2020.964%2027.2184%2018.8694L27.2191%2016.0132C27.2104%2013.919%2026.6831%2012.0499%2025.638%2010.4064C24.5841%208.71402%2023.1561%207.39166%2021.3543%206.43965C19.5661%205.45984%2017.5435%204.96684%2015.2865%204.95948L4.78086%204.95867V43.0413Z'%20fill='%23F5F5F7'/%3e%3c/svg%3e";class ft{#e;#t;constructor(e,r){this.#e=e,this.#t=r,this.#e.style.setProperty("--search-icon",`url(${fe})`)}render(){this.#e.innerHTML=pt({isAuthorized:this.#t.isAuthorized,logoUrl:ht,searchUrl:fe,user:this.#t.user}),this.#t.isAuthorized&&this.#e.querySelector("#logOutBtn")?.addEventListener("click",async()=>{await this.#t.logoutUser()})}}const mt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<footer class='footer container'>
    <div class='footer__description'>
        <p class='footer__title'>
            Developed by «Suzuki + 1» team
        </p>
        <p class='footer__year'>
            2025
        </p>
    </div>
</footer>`},useData:!0});class _t{#e;constructor(e){this.#e=e}render(){this.#e.innerHTML=mt({})}}let G=null;const ue=a=>{G=a},vt=()=>G,N=()=>{G=null},gt=()=>{if(!G)return!1;try{const a=JSON.parse(atob(G.split(".")[1])),e=Math.floor(Date.now()/1e3);return a.exp>e}catch{return!1}},wt=async()=>{try{const a=await fetch("/api/v1/auth/refresh",{method:"GET",credentials:"include"});if(!a.ok)throw new Error("Refresh failed");const{access_token:e}=await a.json();return ue(e),e}catch(a){throw N(),a}},yt={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"};/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */var de,Ie;function bt(){if(Ie)return de;Ie=1;var a=yt;de=t,t.message=a,t.code=e(a),t.codes=r(a),t.redirect={300:!0,301:!0,302:!0,303:!0,305:!0,307:!0,308:!0},t.empty={204:!0,205:!0,304:!0},t.retry={502:!0,503:!0,504:!0};function e(n){var o={};return Object.keys(n).forEach(function(p){var u=n[p],d=Number(p);o[u.toLowerCase()]=d}),o}function r(n){return Object.keys(n).map(function(l){return Number(l)})}function i(n){var o=n.toLowerCase();if(!Object.prototype.hasOwnProperty.call(t.code,o))throw new Error('invalid status message: "'+n+'"');return t.code[o]}function s(n){if(!Object.prototype.hasOwnProperty.call(t.message,n))throw new Error("invalid status code: "+n);return t.message[n]}function t(n){if(typeof n=="number")return s(n);if(typeof n!="string")throw new TypeError("code must be a number or string");var o=parseInt(n,10);return isNaN(o)?i(n):s(o)}return de}var kt=bt();const Ct=Fe(kt),Et="/api/v1";class pe extends Error{constructor(e,r,i=null){super(r),this.name="HttpError",this.status=e,this.data=i}}async function Be(a){let e=null;try{e=await a.json()}catch{e=null}if(!a.ok){const r=e?.message||Ct[a.status];throw console.log(r),new pe(a.status,r,e)}return e}async function R(a,e={}){const r=vt(),i=r?{Authorization:`Bearer ${r}`}:{},s=e.body instanceof FormData,t={...e,headers:{...i,...e.headers,...s||e.headers?.["Content-Type"]?{}:{"Content-Type":"application/json"}},credentials:"include"};try{const n=await fetch(a,t),o=await Be(n);return o?.access_token&&ue(o.access_token),o}catch(n){if(n instanceof pe&&n.status===401&&r)try{const o=await fetch(`${Et}/auth/refresh`,{method:"GET",credentials:"include"});if(!o.ok)throw new Error("Refresh failed");const p=(await o.json()).access_token;if(!p)throw new Error("No access token in refresh");ue(p);const u={...t,headers:{...t.headers,Authorization:`Bearer ${p}`}},d=await fetch(a,u);return await Be(d)}catch{throw N(),n}throw n instanceof TypeError?new pe(0,"Network error: could not reach server"):n}}async function xt(){try{return await R("/api/v1/auth/signout",{method:"GET",credentials:"include"}),N(),{success:!0}}catch(a){return console.error("Sign-out failed:",a),{success:!1,error:a.message}}}async function Pt(){return R("/api/v1/user/me",{method:"GET"})}async function Lt(a){return R("/api/v1/user/me/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}async function Mt(a){const e=new FormData;return e.append("avatar",a),R("/api/v1/user/me/update/avatar",{method:"POST",body:e})}async function St({current_password:a,new_password:e}){return R("/api/v1/user/me/update/password",{method:"POST",body:JSON.stringify({current_password:a,new_password:e})})}class Tt{#e;#t;constructor(){this.#e=document.createElement("div"),this.#e.className="app-container",this.#t=document.createElement("div"),this.#t.className="main-content",this.isAuthorized=!1,this.user=null,this.setUp(),this.restoreSession()}async restoreSession(){try{const e=await wt();this.isAuthorized=!0,this.updateUserInfo()}catch{this.isAuthorized=!1,this.user=null,N()}window.dispatchEvent(new PopStateEvent("popstate"))}checkAuthOnLoad(){gt()?this.isAuthorized=!0:(this.isAuthorized=!1,this.user=null,N())}setUp(){const e=document.createElement("div");this.#e.appendChild(e),this.header=new ft(e,this),this.header.render(),this.#e.appendChild(this.#t);const r=document.createElement("div");this.#e.appendChild(r),new _t(r).render()}renderWithContainer(e){return this.#t.innerHTML="",this.#t.appendChild(e),this.header.render(),window.scrollTo({top:0,behavior:"instant"}),this.#e}loginUser(e){ue(e),this.isAuthorized=!0,this.updateUserInfo(),window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))}async logoutUser(){const{success:e,error:r}=await xt();return e&&(this.isAuthorized=!1,this.user=null,window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))),{success:e,error:r}}async updateUserInfo(){try{const e=await Pt();this.user=e,this.isAuthorized=!0,this.header.render()}catch(e){console.error("Failed to fetch user info:",e),this.isAuthorized=!1,this.user=null,N(),this.header.render()}}}const qt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=e??(a.nullContext||{}),o=a.hooks.helperMissing,l="function",p=a.escapeExpression,u=a.lookupProperty||function(d,h){if(Object.prototype.hasOwnProperty.call(d,h))return d[h]};return`<div class='films__item'>
    <a class='films__card' href='/film/`+p((t=(t=u(r,"id")||(e!=null?u(e,"id"):e))!=null?t:o,typeof t===l?t.call(n,{name:"id",hash:{},data:s,loc:{start:{line:2,column:39},end:{line:2,column:45}}}):t))+`' data-navigate id='filmPage'>
        <div class='films__image'>
            <img src='`+p((t=(t=u(r,"poster")||(e!=null?u(e,"poster"):e))!=null?t:o,typeof t===l?t.call(n,{name:"poster",hash:{},data:s,loc:{start:{line:4,column:22},end:{line:4,column:32}}}):t))+`' alt='film' />
        </div>
    </a>
    <div class='films__info'>
        <h3 class='films__title'>`+p((t=(t=u(r,"title")||(e!=null?u(e,"title"):e))!=null?t:o,typeof t===l?t.call(n,{name:"title",hash:{},data:s,loc:{start:{line:8,column:33},end:{line:8,column:42}}}):t))+`</h3>
        <p class='films__genre'>`+p((t=(t=u(r,"genres")||(e!=null?u(e,"genres"):e))!=null?t:o,typeof t===l?t.call(n,{name:"genres",hash:{},data:s,loc:{start:{line:9,column:32},end:{line:9,column:42}}}):t))+`</p>
        <p class='films__genre'>`+p((t=(t=u(r,"release_date")||(e!=null?u(e,"release_date"):e))!=null?t:o,typeof t===l?t.call(n,{name:"release_date",hash:{},data:s,loc:{start:{line:10,column:32},end:{line:10,column:48}}}):t))+`</p>
    </div>
</div>`},useData:!0});class $e{#e;#t;constructor(e,r){this.#e=e,this.#t=r}render(e){this.#e.innerHTML=qt(e)}}const Ht=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<main class='content'>
    <section class='section container'>
        <header class='section__header'>
            <h3 class='section__title'>Popular films</h3>
            <div class='section__filters'>
                <button class='section__button button' type='button' disabled>Sort 
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                    >
                        <path
                            d='M2.5 10H17.5M2.5 5H17.5M2.5 15H17.5'
                            stroke='white'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </button>
                <button class='section__button button' type='button' disabled>Genre
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                    >
                        <path
                            d='M5 7.5L10 12.5L15 7.5'
                            stroke='white'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </button>
                <button class='section__button button' type='button' disabled>Year
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                    >
                        <path
                            d='M5 7.5L10 12.5L15 7.5'
                            stroke='white'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </button>
            </div>
        </header>
    </section>

    <div class='hero'>
        <div class='hero__content'>
            <h1 class='hero__title'>
                POPFILMS
            </h1>
            <h2 class='hero__description'>
                Popcorn, series and chill
            </h2>
            <button class='hero__button button' type='button'>▶</button>
        </div>
    </div>

    <div class='films container' id='filmsContainer'>
    </div>
</main>`},useData:!0});async function Ot(){return R("/api/v1/media/recommendations?type=movie&limit=10",{method:"GET"})}async function At(a){return await R(`/api/v1/media/${a}`,{method:"GET"})}async function Rt(a){return await R(`/api/v1/media/${a}/actor`,{method:"GET"})}class Dt{#e;#t;constructor(e,r,i={}){this.#e=e,this.#t=r}render(){this.#e.innerHTML=Ht({}),this.renderMovies()}afterRender(){this.setupPlayButton()}setupPlayButton(){const e=this.#e.querySelector(".hero__button.button"),r=this.#e.querySelector("#filmsContainer");e&&r&&e.addEventListener("click",()=>{r.scrollIntoView({behavior:"smooth",block:"start"})})}async renderMovies(){const e=this.#e.querySelector("#filmsContainer");(await Ot()).movies.map(s=>({id:s.media_id,title:s.title,genres:s.genres?s.genres.map(t=>t.name).join(", ").toLowerCase():"",release_date:s.release_date.substr(0,4),poster:s.posters[0]})).forEach(s=>{const t=document.createElement("div");e.appendChild(t),new $e(t,this.#t).render(s)})}}const It=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<main class='login__content'>
    <form class='login__form' id='login-form'>
        <h2 class='login__title'>Log In</h2>
        <label class='login__label' for='email'>Email</label>
        <input
            class='login__input input'
            id='email'
            type='email'
            placeholder='Email@example.com'
        />
        <div class='login__error' hidden>Error message</div>
        <label class='login__label' for='password'>Password</label>
        <div class='login__password'>
            <input
                class='login__input input'
                id='password'
                type='password'
                placeholder='Password'
            />
            <button
                class='login__eye'
                type='button'
                aria-label='Toggle password visibility'
            >
                <svg
                    class='login__eye-icon login__eye-icon--open'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
                    ></path>
                    <circle cx='12' cy='12' r='3'></circle>
                </svg>
                <svg
                    class='login__eye-icon login__eye-icon--closed'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
                    >
                    </path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                </svg>
            </button>
        </div>
        <div class='login__error' id='passwordError' hidden>Error message</div>
        <button class='login__button button' type='submit'>Log in</button>
    </form>
</main>`},useData:!0});async function Bt(a,e){return R("/api/v1/auth/signin",{method:"POST",body:JSON.stringify({email:a,password:e})})}async function Ft(a,e){const r=await Bt(a,e);return console.log(r),r}function he(a){a.querySelectorAll('[class*="__password"]').forEach(r=>{const i=r.querySelector('input[type="password"], input[type="text"]'),s=r.querySelector('[class*="__eye"]'),t=s?.querySelector('[class*="--open"]'),n=s?.querySelector('[class*="--closed"]');!i||!s||!t||!n||s.addEventListener("click",()=>{const o=i.type==="password";i.type=o?"text":"password",t.style.display=o?"none":"block",n.style.display=o?"block":"none"})})}class Vt{#e;#t;constructor(e,r){this.#e=e,this.#t=r}render(){this.#e.innerHTML=It({}),this.#n(),he(this.#e)}#n(){const e=this.#e.querySelector("#login-form"),r=this.#e.querySelector("#passwordError");e&&e.addEventListener("submit",async i=>{i.preventDefault();const s=e.querySelector('input[type="email"]').value,t=e.querySelector("#password").value;r.textContent="",r.hidden=!0;try{const n=await Ft(s,t);n?.access_token&&this.#t.loginUser(n.access_token)}catch(n){r.textContent=n.message||"Unexpected error",r.hidden=!1}})}}function z(a){return a.trim().replace(/[<>;"'`]/g,"")}function Ge(a){if(!a)return"Email is required";const e=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,r=z(a),i=r.split("@")[0],s=r.split("@")[1];return r!==a?"Email contains invalid characters (< > ; ' \" `)":/^[a-zA-Z0-9._-]+@[\w.-]+\.\w+$/.test(r)?r.length>254?"Email is too long (maximum 254 characters)":e.test(r)?/\s/.test(r)?"Email must not contain spaces":i.length>64?"Local part of the email is too long (maximum 64 characters)":s.includes(".")?i.length<3?"Local part of the email is too short (minimum 3 characters)":null:"Domain must contain a dot":"Incorrect email format":"Email must contain only Latin letters, digits, and special characters (._-)"}function ze(a){if(!a)return"Password is required";const e=z(a);return e!==a?"Password contains invalid characters (< > ; ' \" `)":/^[a-zA-Z0-9\-/=+!@#$%^&*()]+$/.test(e)?e.length<8?"Password must be at least 8 characters long":e.length>128?"Password is too long (maximum 128 characters)":/[A-Z]/.test(e)?/[a-z]/.test(e)?/[0-9]/.test(e)?/[-/=+!@#$%^&*()]/.test(e)?/\s/.test(e)?"Password must not contain spaces":/(.)\1{3,}/.test(e)?"Password must not contain more than 3 identical characters in a row":null:"Password must contain at least one special character (-/=+!@#$%^&*())":"Password must contain at least one digit":"Password must contain at least one lowercase letter":"Password must contain at least one capital letter":"Password must contain only Latin letters, digits, and special characters (-/=+!@#$%^&*())"}function Ze(a){if(!a)return"Username is required";const e=z(a);return e!==a?"Username contains invalid characters (< > ; ' \" `)":/^[a-zA-Z0-9_.-]+$/.test(e)?e.length<3?"Username must be at least 3 characters long":e.length>32?"Username is too long (maximum 32 characters)":/\s/.test(e)?"Username must not contain spaces":null:"Username must contain only Latin letters, digits, and special characters (_.-)"}function Nt(a){if(!a)return"Phone number is required";const e=z(a).trim();return e!==a?"Phone contains invalid characters (< > ; ' \" `)":/^\+[0-9]{1,15}$/.test(e)?e.length<4||e.length>16?"Phone number must be between 4 and 16 characters":null:"Phone must be in format: +1234567890 (up to 15 digits)"}function Ut(a){if(!a)return null;const e=z(a).trim();if(e!==a)return"Date contains invalid characters (< > ; ' \" `)";if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return"Date must be in format YYYY-MM-DD";const[r,i,s]=e.split("-").map(Number),t=new Date(r,i-1,s);if(t.getFullYear()!==r||t.getMonth()+1!==i||t.getDate()!==s)return"Invalid date";const n=new Date,o=new Date(n.getFullYear(),n.getMonth(),n.getDate());return t>o?"Date cannot be in the future":r<1900?"Year must be 1900 or later":null}const jt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<main class='signup__content'>
    <form class='signup__form' id='signup-form'>
        <h2 class='signup__title'>Sign Up</h2>
        <label class='signup__label' for='email'>Email</label>
        <input
            class='signup__input input'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
        />
        <div class='signup__error signup__error--email' id='emailError' hidden>Error message</div>
        <label class='signup__label' for='username'>Username</label>
        <input
            class='signup__input input'
            id='username'
            name='username'
            type='text'
            placeholder='Username'
        />
        <div class='signup__error signup__error--username' id='usernameError' hidden>Error message</div>
        <label class='signup__label' for='password'>Password</label>
        <div class='signup__password'>
            <input
                class='signup__input input'
                id='password'
                name='password'
                type='password'
                placeholder='Password'
            />
            <button
                class='signup__eye'
                type='button'
                aria-label='Toggle password visibility'
            >
                <svg
                    class='signup__eye-icon signup__eye-icon--open'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
                    ></path>
                    <circle cx='12' cy='12' r='3'></circle>
                </svg>
                <svg
                    class='signup__eye-icon signup__eye-icon--closed'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
                    >
                    </path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                </svg>
            </button>
        </div>
        <div class='signup__error signup__error--password' id='passwordError' hidden>Error message</div>
        <label class='signup__label' for='confirm_password'>Confirm Password</label>
        <div class='signup__password'>
            <input
                class='signup__input input'
                id='confirm_password'
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
            />
            <button
                class='signup__eye'
                type='button'
                aria-label='Toggle password visibility'
            >
                <svg
                    class='signup__eye-icon signup__eye-icon--open'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
                    ></path>
                    <circle cx='12' cy='12' r='3'></circle>
                </svg>
                <svg
                    class='signup__eye-icon signup__eye-icon--closed'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                >
                    <path
                        d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
                    >
                    </path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                </svg>
            </button>
        </div>
        <div class='signup__error signup__error--confirm' id='confirmError' hidden>Error message</div>
        <button class='signup__button button' type='submit'>Sign up</button>
    </form>
</main>`},useData:!0});async function $t(a){return R("/api/v1/auth/signup",{method:"POST",body:JSON.stringify(a)})}async function Gt(a){const e=await $t(a);return console.log(e),e}class zt{#e;#t;constructor(e,r){this.#e=e,this.#t=r}render(){this.#e.innerHTML=jt({});const e=this.#e.querySelector("#signup-form");this.#n(e),he(this.#e)}#n(e){const r={username:this.#e.querySelector("#usernameError"),email:this.#e.querySelector("#emailError"),password:this.#e.querySelector("#passwordError"),confirm:this.#e.querySelector("#confirmError")},i=(s,t)=>{const n=this.#e.querySelector(`#${s}Error`);n&&(n.textContent=t||"",n.style.display=t?"block":"none")};e.addEventListener("submit",async s=>{s.preventDefault();const t={username:e.querySelector('input[name="username"]').value,email:e.querySelector('input[name="email"]').value,password:e.querySelector('input[name="password"]').value},n={username:Ze(t.username),email:Ge(t.email),password:ze(t.password),confirm:t.password!==e.querySelector('input[name="confirm_password"]').value?"Passwords do not match":null};if(Object.keys(r).forEach(o=>i(o,"")),Object.entries(n).forEach(([o,l])=>i(o,l)),!Object.values(n).some(Boolean))try{const o=await Gt(t);if(o?.access_token)this.#t.loginUser(o.access_token);else throw new Error("Registration failed: no token")}catch(o){i("confirm",o.message||"Unexpected error")}})}}const Zt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=e??(a.nullContext||{}),o=a.hooks.helperMissing,l="function",p=a.escapeExpression,u=a.lookupProperty||function(d,h){if(Object.prototype.hasOwnProperty.call(d,h))return d[h]};return`<main class='film-banner__content'>
    <section class='film-banner container'>
        <img class='film-banner__image' src='`+p((t=(t=u(r,"poster")||(e!=null?u(e,"poster"):e))!=null?t:o,typeof t===l?t.call(n,{name:"poster",hash:{},data:s,loc:{start:{line:3,column:45},end:{line:3,column:55}}}):t))+"' alt='"+p((t=(t=u(r,"title")||(e!=null?u(e,"title"):e))!=null?t:o,typeof t===l?t.call(n,{name:"title",hash:{},data:s,loc:{start:{line:3,column:62},end:{line:3,column:71}}}):t))+`' />
        <div class='film-banner__overlay container'>
            <div class='film-banner__description'>
                <h1 class='film-banner__title'>`+p((t=(t=u(r,"title")||(e!=null?u(e,"title"):e))!=null?t:o,typeof t===l?t.call(n,{name:"title",hash:{},data:s,loc:{start:{line:6,column:47},end:{line:6,column:56}}}):t))+`</h1>
                <h4 class='film-banner__text'>
                    `+p((t=(t=u(r,"description")||(e!=null?u(e,"description"):e))!=null?t:o,typeof t===l?t.call(n,{name:"description",hash:{},data:s,loc:{start:{line:8,column:20},end:{line:8,column:35}}}):t))+`
                </h4>
                <div class='film-banner__info'>
                    <p class='film-banner__genre'>`+p((t=(t=u(r,"genres")||(e!=null?u(e,"genres"):e))!=null?t:o,typeof t===l?t.call(n,{name:"genres",hash:{},data:s,loc:{start:{line:11,column:50},end:{line:11,column:60}}}):t))+`</p>
                    <p class='film-banner__delimiter'>|</p>
                    <p class='film-banner__country'>`+p((t=(t=u(r,"country")||(e!=null?u(e,"country"):e))!=null?t:o,typeof t===l?t.call(n,{name:"country",hash:{},data:s,loc:{start:{line:13,column:52},end:{line:13,column:63}}}):t))+`</p>
                </div>

                <div class='film-banner__info'>
                    <p>IMDB: <span class='film-banner__rating'>`+p((t=(t=u(r,"rating")||(e!=null?u(e,"rating"):e))!=null?t:o,typeof t===l?t.call(n,{name:"rating",hash:{},data:s,loc:{start:{line:17,column:63},end:{line:17,column:73}}}):t))+`</span></p>
                    <p class='film-banner__delimiter'>|</p>
                    <p class='film-banner__year'>`+p((t=(t=u(r,"release_date")||(e!=null?u(e,"release_date"):e))!=null?t:o,typeof t===l?t.call(n,{name:"release_date",hash:{},data:s,loc:{start:{line:19,column:49},end:{line:19,column:65}}}):t))+`</p>
                    <p class='film-banner__delimiter'>|</p>
                    <p class='film-banner__duration'>`+p((t=(t=u(r,"duration")||(e!=null?u(e,"duration"):e))!=null?t:o,typeof t===l?t.call(n,{name:"duration",hash:{},data:s,loc:{start:{line:21,column:53},end:{line:21,column:65}}}):t))+`</p>
                    <p class='film-banner__delimiter'>|</p>
                    <p class='film-banner__age-limit'>`+p((t=(t=u(r,"age_rating")||(e!=null?u(e,"age_rating"):e))!=null?t:o,typeof t===l?t.call(n,{name:"age_rating",hash:{},data:s,loc:{start:{line:23,column:54},end:{line:23,column:68}}}):t))+`</p>
                </div>

                <div class='film-banner__actions'>
                    <button
                        class='film-banner__button-play button'
                    disabled>
                        ▶ Play
                    </button>
                    <button
                        data-navigate='/player/`+p((t=(t=u(r,"id")||(e!=null?u(e,"id"):e))!=null?t:o,typeof t===l?t.call(n,{name:"id",hash:{},data:s,loc:{start:{line:33,column:47},end:{line:33,column:53}}}):t))+`'
                        class='film-banner__button button'
                    >
                        Trailer
                    </button>
                    <a class='film-banner__button-reaction' aria-disabled="true" tabindex="-1">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            viewBox='0 0 44 44'
                            fill='none'
                        >
                            <path
                                d='M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z'
                                fill='none'
                            />
                            <path
                                d='M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z'
                                stroke='none'
                                stroke-linecap='round'
                            />
                            <path
                                d='M17.8333 21.1667L21.1667 13.6667C21.8297 13.6667 22.4656 13.93 22.9344 14.3989C23.4033 14.8677 23.6667 15.5036 23.6667 16.1667V19.5H28.3833C28.6249 19.4973 28.8642 19.5471 29.0846 19.646C29.3051 19.7449 29.5013 19.8906 29.6599 20.0729C29.8184 20.2552 29.9354 20.4698 30.0028 20.7019C30.0701 20.9339 30.0862 21.1778 30.05 21.4167L28.9 28.9167C28.8397 29.3141 28.6379 29.6763 28.3316 29.9367C28.0253 30.197 27.6353 30.3379 27.2333 30.3333H17.8333M17.8333 21.1667V30.3333M17.8333 21.1667H15.3333C14.8913 21.1667 14.4674 21.3423 14.1548 21.6548C13.8423 21.9674 13.6667 22.3913 13.6667 22.8333V28.6667C13.6667 29.1087 13.8423 29.5326 14.1548 29.8452C14.4674 30.1577 14.8913 30.3333 15.3333 30.3333H17.8333'
                                stroke='#F5F5F5'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </a>
                    <a class='film-banner__button-reaction' aria-disabled="true" tabindex="-1">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='48'
                            height='48'
                            viewBox='0 0 44 44'
                            fill='none'
                        >
                            <path
                                d='M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z'
                                fill='none'
                            />
                            <path
                                d='M22 0.5C33.8741 0.5 43.5 10.1259 43.5 22C43.5 33.8741 33.8741 43.5 22 43.5C10.1259 43.5 0.5 33.8741 0.5 22C0.5 10.1259 10.1259 0.5 22 0.5Z'
                                stroke='none'
                                stroke-linecap='round'
                            />
                            <path
                                d='M26.1667 22.8333L22.8333 30.3333C22.1703 30.3333 21.5344 30.0699 21.0656 29.6011C20.5967 29.1322 20.3333 28.4964 20.3333 27.8333V24.5H15.6167C15.3751 24.5027 15.1358 24.4529 14.9154 24.354C14.6949 24.255 14.4986 24.1094 14.3401 23.9271C14.1816 23.7447 14.0646 23.5301 13.9972 23.2981C13.9298 23.0661 13.9137 22.8222 13.95 22.5833L15.1 15.0833C15.1603 14.6859 15.3621 14.3236 15.6684 14.0633C15.9747 13.803 16.3647 13.6621 16.7667 13.6667H26.1667M26.1667 22.8333V13.6667M26.1667 22.8333H28.3917C28.8633 22.8417 29.3216 22.6765 29.6795 22.3693C30.0374 22.0621 30.2701 21.6341 30.3333 21.1667V15.3333C30.2701 14.8659 30.0374 14.4379 29.6795 14.1307C29.3216 13.8234 28.8633 13.6583 28.3917 13.6667H26.1667'
                                stroke='#F5F5F5'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    </section>

    <section class='description container'>
        <div class='description__content'>
            <div class='description__block'>
                <h3 class='description__title'>Directed by</h3>
                <h4 class='description__text'>Christopher Nolan</h4>
            </div>

            <div class='description__block'>
                <h3 class='description__title'>Written by</h3>
                <h4 class='description__text'>Christopher Nolan, Jonathan Nolan</h4>
            </div>

            <div class='description__block'>
                <h3 class='description__title'>Plot</h3>
                <h4 class='description__text'>
                    `+p((t=(t=u(r,"plot_summary")||(e!=null?u(e,"plot_summary"):e))!=null?t:o,typeof t===l?t.call(n,{name:"plot_summary",hash:{},data:s,loc:{start:{line:111,column:20},end:{line:111,column:36}}}):t))+`
                </h4>
            </div>
        </div>
    </section>

    <section class='stars-section container'>
        <h3 class='stars-section__title'>Starring</h3>
        <div class='stars-section__list' id='stars-section'>
        </div>
    </section>
</main>`},useData:!0}),Wt="/assets/poster-B0t_E9xX.png",We="/assets/star_photo-AemXFUaP.png",Yt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=e??(a.nullContext||{}),o=a.hooks.helperMissing,l="function",p=a.escapeExpression,u=a.lookupProperty||function(d,h){if(Object.prototype.hasOwnProperty.call(d,h))return d[h]};return`<div class='stars-section__item'>
    <a
        class='stars-section__image'
        href='/actor/`+p((t=(t=u(r,"id")||(e!=null?u(e,"id"):e))!=null?t:o,typeof t===l?t.call(n,{name:"id",hash:{},data:s,loc:{start:{line:4,column:21},end:{line:4,column:27}}}):t))+`'
        data-navigate
        id='starPageLink'
    >
        <img src=`+p((t=(t=u(r,"star_photo")||(e!=null?u(e,"star_photo"):e))!=null?t:o,typeof t===l?t.call(n,{name:"star_photo",hash:{},data:s,loc:{start:{line:8,column:17},end:{line:8,column:31}}}):t))+" alt="+p((t=(t=u(r,"star_name")||(e!=null?u(e,"star_name"):e))!=null?t:o,typeof t===l?t.call(n,{name:"star_name",hash:{},data:s,loc:{start:{line:8,column:36},end:{line:8,column:49}}}):t))+` loading='lazy' />
    </a>
    <h4 class='stars-section__name'>`+p((t=(t=u(r,"star_name")||(e!=null?u(e,"star_name"):e))!=null?t:o,typeof t===l?t.call(n,{name:"star_name",hash:{},data:s,loc:{start:{line:10,column:36},end:{line:10,column:49}}}):t))+`</h4>
    <p class='stars-section__role'>`+p((t=(t=u(r,"role_name")||(e!=null?u(e,"role_name"):e))!=null?t:o,typeof t===l?t.call(n,{name:"role_name",hash:{},data:s,loc:{start:{line:11,column:35},end:{line:11,column:48}}}):t))+`</p>
</div>`},useData:!0});class Jt{#e;#t;constructor(e,r){this.#e=e,this.#t=r}render(e){this.#e.innerHTML=Yt(e)}}class Xt{#e;#t;#n;constructor(e,r,i={}){this.#e=e,this.#t=r,this.params=i,this.#n=i.id}async render(){try{const e=await At(this.#n),r=e.genres?e.genres.map(n=>n.name).join(", ").toLowerCase():"",i=e.release_date?e.release_date.split("-")[0]:"",s=this.#r(e.duration_minutes),t=e.posters&&e.posters.length>0?e.posters[0]:"";this.#e.innerHTML=Zt({id:e.media_id,poster:t,title:e.title||"Unknown",description:e.description||"",genres:r,country:e.country||"",rating:e.rating?e.rating.toFixed(1):"—",release_date:i,duration:s,age_rating:e.age_rating?`${e.age_rating}+`:"—",plot_summary:e.plot_summary||e.description||""}),this.renderStarCards()}catch(e){this.#e.innerHTML='<h2 style="text-align:center; color:red;">Film not found</h2>',console.error("Failed to load film:",e)}}#r(e){if(!e)return"—";const r=Math.floor(e/60),i=e%60;return`${r}h ${i>0?i+"m":""}`.trim()}afterRender(){this.setupScrollButtons()}setupScrollButtons(){const e=this.#e.querySelector("#recommendations-section"),r=this.#e.querySelector(".films-recommendations__button--left"),i=this.#e.querySelector(".films-recommendations__button--right");if(!e||!r||!i)return;const s=300;r.addEventListener("click",()=>{e.scrollBy({left:-s,behavior:"smooth"})}),i.addEventListener("click",()=>{e.scrollBy({left:s,behavior:"smooth"})});const t=()=>{r.style.opacity=e.scrollLeft<=0?"0.5":"1",i.style.opacity=e.scrollLeft>=e.scrollWidth-e.clientWidth-10?"0.5":"1"};e.addEventListener("scroll",t),t()}async renderStarCards(){const e=this.#e.querySelector("#stars-section"),i=(await Rt(this.params.id)).actors;if(e.innerHTML="",!i||i.length===0){e.innerHTML="<p>Actors not found</p>";return}i.forEach(s=>{const t=document.createElement("div");e.appendChild(t);const n=new Jt(t,this.#t),o=s.image_urls&&s.image_urls.length>0?s.image_urls[0]:We;n.render({id:s.id,star_name:s.name,role_name:"",star_photo:o})})}#i(){const e=this.#e.querySelector(".film-banner__button-play");e&&e.addEventListener("click",async r=>{r.preventDefault();try{const s=(await fetchMedia(this.#n)).url;this.#t.navigate(`/player/${this.#n}`,{mediaUrl:s})}catch(i){console.error(i)}})}}const Kt=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=e??(a.nullContext||{}),o=a.hooks.helperMissing,l="function",p=a.escapeExpression,u=a.lookupProperty||function(d,h){if(Object.prototype.hasOwnProperty.call(d,h))return d[h]};return`<main class="content">
    <section class="description container">
        <div class="description__content">
            <div class="description__actor">
                <img class="description__actor-photo" src=`+p((t=(t=u(r,"photo")||(e!=null?u(e,"photo"):e))!=null?t:o,typeof t===l?t.call(n,{name:"photo",hash:{},data:s,loc:{start:{line:5,column:58},end:{line:5,column:67}}}):t))+' alt="'+p((t=(t=u(r,"name")||(e!=null?u(e,"name"):e))!=null?t:o,typeof t===l?t.call(n,{name:"name",hash:{},data:s,loc:{start:{line:5,column:73},end:{line:5,column:81}}}):t))+`">
                <h2 class="description__actor-name">`+p((t=(t=u(r,"name")||(e!=null?u(e,"name"):e))!=null?t:o,typeof t===l?t.call(n,{name:"name",hash:{},data:s,loc:{start:{line:6,column:52},end:{line:6,column:60}}}):t))+`</h2>
            </div>

            <div class="description__block">
                <h3 class="description__title">Overview</h3>
                <h4 class="description__text">Born: `+p((t=(t=u(r,"birth_date")||(e!=null?u(e,"birth_date"):e))!=null?t:o,typeof t===l?t.call(n,{name:"birth_date",hash:{},data:s,loc:{start:{line:11,column:52},end:{line:11,column:66}}}):t))+`</h4>
            </div>

            <div class="description__block">
                <h3 class="description__title">Biography</h3>
                <div class="description__bio">
                    <h4 class="description__text--hidden">
                        `+p((t=(t=u(r,"bio")||(e!=null?u(e,"bio"):e))!=null?t:o,typeof t===l?t.call(n,{name:"bio",hash:{},data:s,loc:{start:{line:19,column:24},end:{line:19,column:31}}}):t))+`
                    </h4>

                    <button class="description__button">
                        <h4 class="description__button-text">Show more ∨</h4>
                    </button>
                    </details>

                </div>
            </div>

            <div class='films' id='filmsContainer'></div>
    </section>
</main>

</html>`},useData:!0});function Qt(a){document.querySelectorAll(".description__button").forEach(e=>{e.addEventListener("click",()=>{const r=e.previousElementSibling,i=e.querySelector(".description__button-text");r.classList.toggle("description__text--expanded"),r.classList.contains("description__text--expanded")?i.textContent="Show less ∧":i.textContent="Show more ∨"})})}async function en(a){return await R(`/api/v1/actor/${a}`,{method:"GET"})}async function tn(a){return R(`/api/v1/actor/${a}/media`,{method:"GET"})}class nn{#e;#t;#n;constructor(e,r,i={}){this.#e=e,this.#t=r,this.params=i,this.#n=i.id}async render(){try{const e=await en(this.#n),r=e.image_urls?.length>0?e.image_urls[0]:We;this.#e.innerHTML=Kt({name:e.name,bio:e.bio,photo:r,birth_date:e.birth_date?.split("T")[0]}),this.afterRender(),this.renderFilmCards()}catch(e){console.error("Actor page error:",e),this.#e.innerHTML='<h2 style="color:red;text-align:center">Actor not found</h2>'}}afterRender(){Qt(this.#e)}async renderFilmCards(){const e=this.#e.querySelector("#filmsContainer");(await tn(this.#n)).medias.map(s=>({id:s.media_id,title:s.title,genres:s.genres?s.genres.map(t=>t.name).join(", ").toLowerCase():"",release_date:s.release_date.substr(0,4),poster:s.posters[0]})).forEach(s=>{const t=document.createElement("div");e.appendChild(t),new $e(t,this.#t).render(s)})}}const rn=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=e??(a.nullContext||{}),o=a.hooks.helperMissing,l="function",p=a.escapeExpression,u=a.lookupProperty||function(d,h){if(Object.prototype.hasOwnProperty.call(d,h))return d[h]};return`<main>
    <div class='video-container'>
        <video
            src="`+p((t=(t=u(r,"video")||(e!=null?u(e,"video"):e))!=null?t:o,typeof t===l?t.call(n,{name:"video",hash:{},data:s,loc:{start:{line:4,column:17},end:{line:4,column:26}}}):t))+`"
            poster=`+p((t=(t=u(r,"poster")||(e!=null?u(e,"poster"):e))!=null?t:o,typeof t===l?t.call(n,{name:"poster",hash:{},data:s,loc:{start:{line:5,column:19},end:{line:5,column:29}}}):t))+`
            class='video-player'
            id='video-player'
            preload='metadata'
        ></video>
        <div class='video-hud'>
            <div class='video-hud__progress'>
                <input
                    type='range'
                    id='video-hud__progress-bar'
                    class='video-hud__progress-bar'
                    min='0'
                    max='100'
                    value='0'
                    step='0.1'
                />
                <div
                    class='video-hud__curr-time'
                    id='video-hud__curr-time'
                >00:00</div>
                <span class='video-hud__separator'>/</span>
                <div
                    class='video-hud__duration'
                    id='video-hud__duration'
                >00:00</div>
            </div>

            <div class='video-hud__controls'>
                <div class='video-hud__controls-left'>
                    <button
                        class='video-hud__action-play'
                        id='video-hud__action'
                    >
                        <svg
                            class='icon-play'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M3 4.00386C3.00038 1.70101 5.48846 0.257225 7.48828 1.39937L21.4863 9.39351C22.4219 9.92792 22.9221 10.8407 22.9893 11.7802C23.021 11.9243 23.021 12.0737 22.9893 12.2177C22.9218 13.157 22.4215 14.0691 21.4863 14.6035L7.48828 22.5986C5.48831 23.7408 3 22.2963 3 19.9931V4.00386Z'
                                fill='#F5F5F5'
                                stroke='#F5F5F5'
                            />
                        </svg>
                        <svg
                            class='icon-pause'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M14.2857 3.11111C14.2857 2.49746 14.7974 2 15.4286 2H18.8571C19.4883 2 20 2.49746 20 3.11111V20.8889C20 21.5025 19.4883 22 18.8571 22H15.4286C14.7974 22 14.2857 21.5025 14.2857 20.8889V3.11111Z'
                                fill='#F5F5F5'
                            />
                            <path
                                d='M4 3.11111C4 2.49746 4.51167 2 5.14286 2H8.57143C9.20261 2 9.71429 2.49746 9.71429 3.11111V20.8889C9.71429 21.5025 9.20261 22 8.57143 22H5.14286C4.51167 22 4 21.5025 4 20.8889V3.11111Z'
                                fill='#F5F5F5'
                            />
                        </svg>
                    </button>
                </div>

                <div class='video-hud__controls-right'>
                    <div
                        class='video-hud__mute video-hud__mute-false'
                        id='video-hud__mute'
                    >
                        <svg
                            class='volume-high'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M21.8027 8C21.9334 9.31562 22.0002 10.65 22.0002 12C22.0002 13.35 21.9334 14.6844 21.8027 16'
                                stroke='white'
                                stroke-width='1.5'
                                stroke-linecap='round'
                            />
                            <path
                                d='M17.877 9C17.9586 9.9892 18.0002 10.9897 18.0002 12C18.0002 13.0103 17.9586 14.0108 17.877 15'
                                stroke='white'
                                stroke-width='1.5'
                                stroke-linecap='round'
                            />
                            <path
                                d='M13 12C13 9.45813 12.7849 6.9701 12.373 4.55567C12.2494 3.83122 11.4028 3.51321 10.8175 3.95772L7.53627 6.44984C7.18835 6.71409 6.76348 6.85714 6.3266 6.85714H3C1.89543 6.85714 1 7.75257 1 8.85714V15.1429C1 16.2474 1.89543 17.1429 3 17.1429H6.3266C6.76348 17.1429 7.18835 17.2859 7.53627 17.5502L10.8175 20.0423C11.4027 20.4868 12.2494 20.1688 12.373 19.4443C12.7849 17.0299 13 14.5419 13 12Z'
                                fill='white'
                                stroke='white'
                                stroke-linejoin='round'
                            />
                        </svg>
                        <svg
                            class='volume-mute'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M13 12C13 9.45813 12.7849 6.9701 12.373 4.55567C12.2494 3.83122 11.4028 3.51321 10.8175 3.95772L7.53627 6.44984C7.18835 6.71409 6.76348 6.85714 6.3266 6.85714H3C1.89543 6.85714 1 7.75257 1 8.85714V15.1429C1 16.2474 1.89543 17.1429 3 17.1429H6.3266C6.76348 17.1429 7.18835 17.2859 7.53627 17.5502L10.8175 20.0423C11.4027 20.4868 12.2494 20.1688 12.373 19.4443C12.7849 17.0299 13 14.5419 13 12Z'
                                fill='white'
                                stroke='white'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M17 9L23 15M17 15L23 9'
                                stroke='white'
                                stroke-width='1.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </div>
                    <input
                        type='range'
                        value='100'
                        max='100'
                        title='Volume'
                        class='video-hud__volume'
                        id='video-hud__volume'
                    />
                    <select
                        title='Speed'
                        class='video-hud__speed'
                        id='video-hud__speed'
                    >
                        <option value='25'>x0.25</option>
                        <option value='50'>x0.50</option>
                        <option value='75'>x0.75</option>
                        <option value='100' selected>x1.00</option>
                        <option value='125'>x1.25</option>
                        <option value='150'>x1.50</option>
                        <option value='175'>x1.75</option>
                        <option value='200'>x2.00</option>
                    </select>

                    <button
                        class='video-hud__action video-hud__fullscreen-false'
                        id='video-hud__fullscreen'
                        title='Fullscreen'
                    >
                        <svg
                            class='fullscreen-icon'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M4 9L4 6C4 4.89543 4.89543 4 6 4L9 4'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M20 15V18C20 19.1046 19.1046 20 18 20H15'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M15 4L18 4C19.1046 4 20 4.89543 20 6L20 9'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M9 20L6 20C4.89543 20 4 19.1046 4 18L4 15'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                        <svg
                            class='exit-fullscreen-icon'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M9 4V7C9 8.10457 8.10457 9 7 9H4'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M15 20L15 17C15 15.8954 15.8954 15 17 15L20 15'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M20 9L17 9C15.8954 9 15 8.10457 15 7L15 4'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M4 15L7 15C8.10457 15 9 15.8954 9 17L9 20'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>`},useData:!0});function an(){const a=document.getElementById("video-player"),e=document.getElementById("video-hud__progress-bar"),r=document.getElementById("video-hud__curr-time"),i=document.getElementById("video-hud__duration"),s=document.getElementById("video-hud__action"),t=document.getElementById("video-hud__mute"),n=document.getElementById("video-hud__volume"),o=document.getElementById("video-hud__speed"),l=document.getElementById("video-hud__fullscreen"),p=document.querySelector(".video-container");if(!a)return;s.setAttribute("class","video-hud__action video-hud__action-play");function u(){a.paused?(a.play(),s.className="video-hud__action video-hud__action-pause"):(a.pause(),s.className="video-hud__action video-hud__action-play"),i.innerHTML==="00:00"&&(i.innerHTML=d(a.duration))}function d(v){v=Math.floor(v);const M=Math.floor(v/60),c=Math.floor(v%60);return`${M.toString().padStart(2,"0")}:${c.toString().padStart(2,"0")}`}function h(){const v=Math.floor(a.currentTime)/(Math.floor(a.duration)/100);e.value=v,r.innerHTML=d(a.currentTime)}function x(v){const c=(v.pageX-e.offsetLeft)/(e.offsetWidth/100);a.currentTime=a.duration*(c/100)}function m(){const v=n.value/100;a.volume=v,t.className=v===0?"video-hud__mute video-hud__mute-true":"video-hud__mute video-hud__mute-false"}function C(){a.volume===0?(a.volume=n.value/100,t.className="video-hud__mute video-hud__mute-false"):(a.volume=0,t.className="video-hud__mute video-hud__mute-true")}function k(){const v=o.value/100;a.playbackRate=v}function g(){document.fullscreenElement?(document.exitFullscreen(),l.className="video-hud__fullscreen video-hud__fullscreen-false"):(p.requestFullscreen(),l.className="video-hud__fullscreen video-hud__fullscreen-true")}s.addEventListener("click",u),a.addEventListener("click",u),a.addEventListener("timeupdate",h),e.addEventListener("click",x),t.addEventListener("click",C),n.addEventListener("change",m),o.addEventListener("change",k),l.addEventListener("click",g),a.addEventListener("dblclick",g)}async function sn(a){return await R(`/api/v1/media/${a}`,{method:"GET"})}class on{#e;#t;#n;constructor(e,r,i={}){this.#e=e,this.#t=r,this.#n=i.id}async render(){const e=await sn(this.#n),r=e.trailers&&e.trailers.length>0?e.trailers[0]:null,i=e.posters&&e.posters.length>0?e.posters[0]:Wt;if(!r){this.#e.innerHTML='<p style="text-align:center; color:red;">Trailer not available</p>';return}this.#e.innerHTML=rn({video:r,poster:i}),requestAnimationFrame(()=>{an()})}}const ln=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n,o=a.lambda,l=a.escapeExpression,p=e??(a.nullContext||{}),u=a.hooks.helperMissing,d="function",h=a.lookupProperty||function(x,m){if(Object.prototype.hasOwnProperty.call(x,m))return x[m]};return`<main class="account__content">
    <form class="account__form">
        <div class="account__avatar">
            <img class="account__avatar-image" src="`+l(o((t=e!=null?h(e,"data"):e)!=null?h(t,"avatar_url"):t,e))+`" alt="User avatar" width="100" height="100">
            <button class="account__avatar-edit" type="button" aria-label="Edit avatar">
                <img class="account__avatar-icon" src="`+l((n=(n=h(r,"camera_icon")||(e!=null?h(e,"camera_icon"):e))!=null?n:u,typeof n===d?n.call(p,{name:"camera_icon",hash:{},data:s,loc:{start:{line:6,column:55},end:{line:6,column:70}}}):n))+`" alt="Edit avatar" width="24"
                    height="24">
            </button>
        </div>
        <div class="account__error account__error--avatar" hidden></div>
        <label class="account__label" for="username">Username</label>
        <div class="account__input-wrapper">
            <input class="account__input input" id="username" type="text" placeholder="Your username" value="`+l(o((t=e!=null?h(e,"data"):e)!=null?h(t,"username"):t,e))+`">
            <img class="account__input-icon" src="`+l((n=(n=h(r,"pencil_icon")||(e!=null?h(e,"pencil_icon"):e))!=null?n:u,typeof n===d?n.call(p,{name:"pencil_icon",hash:{},data:s,loc:{start:{line:14,column:50},end:{line:14,column:65}}}):n))+`" alt="Edit" width="24" height="24">
        </div>
        <div class="account__error account__error--username" hidden>Error message</div>
        <label class="account__label" for="email">Email</label>
        <div class="account__input-wrapper">
            <input class="account__input input" id="email" type="email" placeholder="Your email" value="`+l(o((t=e!=null?h(e,"data"):e)!=null?h(t,"email"):t,e))+`">
            <img class="account__input-icon" src="`+l((n=(n=h(r,"pencil_icon")||(e!=null?h(e,"pencil_icon"):e))!=null?n:u,typeof n===d?n.call(p,{name:"pencil_icon",hash:{},data:s,loc:{start:{line:20,column:50},end:{line:20,column:65}}}):n))+`" alt="Edit" width="24" height="24">
        </div>
        <div class="account__error account__error--email" hidden>Error message</div>
        <label class="account__label" for="birthdate">Date of birth</label>
        <div class="account__input-wrapper">
            <input class="account__input input" id="birthdate" type="text" placeholder="YYYY-MM-DD" value="`+l(o((t=e!=null?h(e,"data"):e)!=null?h(t,"date_of_birth"):t,e))+`">
            <img class="account__input-icon" src="`+l((n=(n=h(r,"pencil_icon")||(e!=null?h(e,"pencil_icon"):e))!=null?n:u,typeof n===d?n.call(p,{name:"pencil_icon",hash:{},data:s,loc:{start:{line:26,column:50},end:{line:26,column:65}}}):n))+`" alt="Edit" width="24" height="24">
        </div>
        <div class="account__error account__error--birthdate" hidden>Error message</div>
        <label class="account__label" for="phone">Phone</label>
        <div class="account__input-wrapper">
            <input class="account__input input" id="phone" type="tel" placeholder="Your phone number" value="`+l(o((t=e!=null?h(e,"data"):e)!=null?h(t,"phone_number"):t,e))+`">
            <img class="account__input-icon" src="`+l((n=(n=h(r,"pencil_icon")||(e!=null?h(e,"pencil_icon"):e))!=null?n:u,typeof n===d?n.call(p,{name:"pencil_icon",hash:{},data:s,loc:{start:{line:32,column:50},end:{line:32,column:65}}}):n))+`" alt="Edit" width="24" height="24">
        </div>
        <div class="account__error account__error--phone" hidden>Error message</div>
        <div class="account__success" hidden></div>
        <button class="account__button button" type="submit">Save</button>
    </form>
</main>`},useData:!0}),un=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<main class="security__content">
    <div class="security__success" hidden></div>
    <form class="security__form">
        <label class="security__label" for="old_password">Old password</label>
        <div class="security__password">
            <input class="security__input input" id="old_password" type="password" placeholder="Enter old password">
            <button class="security__eye" type="button" aria-label="Toggle password visibility">
                <svg class="security__eye-icon security__eye-icon--open" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg class="security__eye-icon security__eye-icon--closed" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                    </path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            </button>
        </div>
        <div class="security__error security__error--old" id="oldError" hidden>Error message</div>

        <label class="security__label" for="new_password">New password</label>
        <div class="security__password">
            <input class="security__input input" id="new_password" type="password" placeholder="Enter new password">
            <button class="security__eye" type="button" aria-label="Toggle password visibility">
                <svg class="security__eye-icon security__eye-icon--open" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg class="security__eye-icon security__eye-icon--closed" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                    </path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            </button>
        </div>
        <div class="security__error security__error--new" id="newError" hidden>Error message</div>

        <label class="security__label" for="repeat_password">Repeat password</label>
        <div class="security__password">
            <input class="security__input input" id="repeat_password" type="password" placeholder="Repeat new password">
            <button class="security__eye" type="button" aria-label="Toggle password visibility">
                <svg class="security__eye-icon security__eye-icon--open" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg class="security__eye-icon security__eye-icon--closed" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                    </path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            </button>
        </div>
        <div class="security__error security__error--repeat" id="repeatError" hidden>Error message</div>

        <button class="security__button button" type="submit">Save</button>
    </form>
</main>`},useData:!0}),cn="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23ffffff'%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%20590.336%20590.336'%20xml:space='preserve'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cg%3e%3cg%3e%3cpath%20d='M173.344,543.443l-96.632-75.35L367.4,95.302l96.631,75.349L173.344,543.443z%20M97.966,465.465l72.749,56.725%20L442.78,173.281l-72.749-56.726L97.966,465.465z'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M474.671,157.008l-96.63-75.349l23.081-29.601l96.631,75.349L474.671,157.008z%20M399.292,79.03l72.749,56.726l4.457-5.718%20l-72.747-56.726L399.292,79.03z'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M507.796,114.537L411.16,39.185l4.838-6.205C424.985,21.454,441.715,0,460.293,0c5.426,0,10.47,1.788,14.991,5.313%20l49.683,38.741c5.021,3.813,8.107,9.139,8.932,15.406c1.634,12.435-5.323,28.419-21.27,48.868L507.796,114.537z%20M432.464,36.593%20l72.593,56.605c13.128-18.232,14.372-27.63,13.828-31.765c-0.303-2.3-1.258-3.945-3.097-5.336l-0.091-0.069l-49.724-38.773%20c-1.849-1.441-3.653-2.112-5.681-2.112C451.266,15.143,439.857,27.54,432.464,36.593z'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M76.405,590.336c-5.983,0-11.641-2.662-15.521-7.307c-3.817-4.566-5.406-10.555-4.369-16.445l14.687-92.385l98.64,76.914%20l-86.11,37.842C81.362,589.873,78.897,590.336,76.405,590.336z%20M82.128,501.922l-10.695,67.266%20c-0.35,1.938,0.389,3.316,1.07,4.131c0.98,1.174,2.439,1.875,3.901,1.875c0.575,0,1.16-0.105,1.738-0.314l62.384-27.42%20L82.128,501.922z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",dn="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-2%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'%20fill='%23ffffff'%20stroke='%23ffffff'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3ctitle%3ecamera%3c/title%3e%3cdesc%3eCreated%20with%20Sketch%20Beta.%3c/desc%3e%3cdefs%3e%3c/defs%3e%3cg%20id='Page-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20sketch:type='MSPage'%3e%3cg%20id='Icon-Set'%20sketch:type='MSLayerGroup'%20transform='translate(-256.000000,%20-465.000000)'%20fill='%23ffffff'%3e%3cpath%20d='M272,487%20C268.687,487%20266,484.313%20266,481%20C266,477.687%20268.687,475%20272,475%20C275.313,475%20278,477.687%20278,481%20C278,484.313%20275.313,487%20272,487%20L272,487%20Z%20M272,473%20C267.582,473%20264,476.582%20264,481%20C264,485.418%20267.582,489%20272,489%20C276.418,489%20280,485.418%20280,481%20C280,476.582%20276.418,473%20272,473%20L272,473%20Z%20M286,489%20C286,490.104%20285.104,491%20284,491%20L260,491%20C258.896,491%20258,490.104%20258,489%20L258,473%20C258,471.896%20258.896,471%20260,471%20L264,471%20L265,469%20C265.707,467.837%20265.896,467%20267,467%20L277,467%20C278.104,467%20278.293,467.837%20279,469%20L280,471%20L284,471%20C285.104,471%20286,471.896%20286,473%20L286,489%20L286,489%20Z%20M284,469%20L281,469%20L280,467%20C279.411,465.837%20279.104,465%20278,465%20L266,465%20C264.896,465%20264.53,465.954%20264,467%20L263,469%20L260,469%20C257.791,469%20256,470.791%20256,473%20L256,489%20C256,491.209%20257.791,493%20260,493%20L284,493%20C286.209,493%20288,491.209%20288,489%20L288,473%20C288,470.791%20286.209,469%20284,469%20L284,469%20Z'%20id='camera'%20sketch:type='MSShapeGroup'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",pn=q.template({1:function(a,e,r,i,s){var t,n,o=e??(a.nullContext||{}),l=a.hooks.helperMissing,p="function",u=a.escapeExpression,d=a.lookupProperty||function(h,x){if(Object.prototype.hasOwnProperty.call(h,x))return h[x]};return`        <a 
            class="tabs__tab `+((t=d(r,"if").call(o,e!=null?d(e,"active"):e,{name:"if",hash:{},fn:a.program(2,s,0),inverse:a.noop,data:s,loc:{start:{line:4,column:29},end:{line:4,column:67}}}))!=null?t:"")+`"
            href="`+u((n=(n=d(r,"href")||(e!=null?d(e,"href"):e))!=null?n:l,typeof n===p?n.call(o,{name:"href",hash:{},data:s,loc:{start:{line:5,column:18},end:{line:5,column:26}}}):n))+`"
            data-navigate
            data-page="`+u((n=(n=d(r,"page")||(e!=null?d(e,"page"):e))!=null?n:l,typeof n===p?n.call(o,{name:"page",hash:{},data:s,loc:{start:{line:7,column:23},end:{line:7,column:31}}}):n))+`"
        >
            `+u((n=(n=d(r,"label")||(e!=null?d(e,"label"):e))!=null?n:l,typeof n===p?n.call(o,{name:"label",hash:{},data:s,loc:{start:{line:9,column:12},end:{line:9,column:21}}}):n))+`
        </a>
`},2:function(a,e,r,i,s){return"tabs__tab--active"},compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){var t,n=a.lookupProperty||function(o,l){if(Object.prototype.hasOwnProperty.call(o,l))return o[l]};return`<div class="tabs">
`+((t=n(r,"each").call(e??(a.nullContext||{}),e!=null?n(e,"tabs"):e,{name:"each",hash:{},fn:a.program(1,s,0),inverse:a.noop,data:s,loc:{start:{line:2,column:4},end:{line:11,column:13}}}))!=null?t:"")+`</div>
`},useData:!0});class hn{#e;#t;constructor(e,r=null){this.#e=e,this.#t=r}render(e){this.#e.innerHTML=pn({tabs:e}),this.#n()}#n(){this.#e.querySelectorAll(".tabs__tab").forEach(r=>{r.addEventListener("click",i=>{if(i.preventDefault(),this.#t){const s=r.dataset.page,t=r.getAttribute("href");this.#t(s,t)}})})}setActiveTab(e){this.#e.querySelectorAll(".tabs__tab").forEach(i=>{const s=i.dataset.page===e;i.classList.toggle("tabs__tab--active",s)})}}class fn{#e;#t;#n;activeTab;tabTemplates;constructor(e,r,i={}){this.#e=e,this.#t=r,this.activeTab=i.tab||"settings",this.user=this.#t.user,this.#t.updateUserInfo(),this.tabTemplates={settings:ln,security:un}}render(){this.#e.innerHTML=`
            <div id="accountTabs"></div>
            <div id="tabContent"></div>
        `,this.#r(),this.#a()}#r(){const e=this.#e.querySelector("#accountTabs"),r=[{label:"Settings",href:"/account/settings",page:"settings",active:this.activeTab==="settings"},{label:"Security",href:"/account/security",page:"security",active:this.activeTab==="security"}];this.#n=new hn(e,(i,s)=>this.#i(i,s)),this.#n.render(r)}#i(e,r){window.history.pushState({tab:e},"",r),this.activeTab=e,this.#n.setActiveTab(e),this.#a()}#a(){const e=this.#e.querySelector("#tabContent"),r=this.tabTemplates[this.activeTab],i={camera_icon:dn,pencil_icon:cn,data:this.user||{}};e.innerHTML=r(i),this.activeTab==="settings"?this.#c():this.activeTab==="security"&&this.#u()}#u(){const e=this.#e.querySelector(".security__form");if(!e)return;he(e);const r={old:this.#e.querySelector("#oldError"),new:this.#e.querySelector("#newError"),repeat:this.#e.querySelector("#repeatError")},i=(t,n)=>{const o=this.#e.querySelector(`#${t}Error`);o&&(o.textContent=n||"",o.style.display=n?"block":"none")},s=()=>{Object.values(r).forEach(t=>{t&&(t.textContent="",t.style.display="none")})};e.addEventListener("submit",async t=>{t.preventDefault(),s();const n=e.querySelector("#old_password").value,o=e.querySelector("#new_password").value,l=e.querySelector("#repeat_password").value,p={old:n?null:"Old password is required",new:ze(o),repeat:o!==l?"Passwords do not match":null};let u=!1;if(Object.entries(p).forEach(([d,h])=>{h&&(i(d,h),u=!0)}),!u)try{await St({current_password:n,new_password:o}),e.reset(),this.#l("Password changed successfully!")}catch(d){d.status===401||d.message?.toLowerCase().includes("current")?i("old","Incorrect old password"):i("repeat",d.message||"Failed to change password")}})}#c(){const e=this.#e.querySelector(".account__form");if(!e)return;const r=document.createElement("input");r.type="file",r.accept="image/png,image/jpeg,image/jpg",r.style.display="none",e.appendChild(r),e.querySelector(".account__avatar-edit").addEventListener("click",()=>{r.click()}),r.addEventListener("change",async()=>{this.#o();const s=r.files[0];if(!s)return;const t=["image/png","image/jpeg"],n=s.type;if(!t.includes(n)){this.#s("avatar","Please select a PNG or JPEG/JPG image"),r.value="";return}const o=10*1024*1024;if(s.size>o){this.#s("avatar","Image must be less than 5 MB"),r.value="";return}try{const l=await Mt(s);this.user.avatar_url=l.avatar_url,this.#t.user=this.user,this.#t.header.render(),this.#a()}catch(l){this.#s("avatar",l.message)}}),e.querySelector("#birthdate").addEventListener("input",s=>{let t=s.target.value.replace(/\D/g,"");t.length>4&&(t=t.slice(0,4)+"-"+t.slice(4)),t.length>7&&(t=t.slice(0,7)+"-"+t.slice(7,9)),s.target.value=t.slice(0,10)}),e.addEventListener("submit",async s=>{s.preventDefault(),this.#o();const t={username:e.querySelector("#username").value.trim(),email:e.querySelector("#email").value.trim(),date_of_birth:e.querySelector("#birthdate").value,phone_number:e.querySelector("#phone").value.trim()},n={},o=Ge(t.email);o&&(n.email=o);const l=Ze(t.username);l&&(n.username=l);const p=Nt(t.phone_number);p&&(n.phone=p);const u=Ut(t.date_of_birth);if(u&&(n.birthdate=u),Object.keys(n).length>0){Object.entries(n).forEach(([d,h])=>{this.#s(d,h)});return}try{await Lt(t),Object.assign(this.user,t),this.#t.user=this.user,this.#t.header.render(),this.#l()}catch(d){this.#s("form",d.message)}})}#s(e,r){const i=this.#e.querySelector(`.account__error--${e}, .security__error--${e}`);i&&(i.textContent=r,i.hidden=!1)}#o(){this.#e.querySelectorAll(".account__error").forEach(e=>{e.textContent="",e.hidden=!0})}#l(){const e=this.#e.querySelector(".account__success");e&&(e.textContent="Profile saved successfully!",e.hidden=!1,setTimeout(()=>{e.hidden=!0},3e3))}}const mn=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<div class="not-found">
    <h1>404 — Page Not Found</h1>
    <a class="not-found__link" data-navigate="/" href="/">Go to Home</a>
</div>`},useData:!0});class _n{#e;constructor(e){this.#e=e}render(){this.#e.innerHTML=mn({})}}const vn=q.template({compiler:[8,">= 4.3.0"],main:function(a,e,r,i,s){return`<main class='support__content'>
    <form class='support__form' id='support-form' enctype='multipart/form-data'>
        <h2 class='support__title'>Support Request</h2>

        <label class='support__label' for='support-tag'>Topic</label>
        <select class='support__input input' id='support-tag' required>
            <option value='' disabled selected>Select a topic</option>
            <option value='bug'>Report a bug</option>
            <option value='feature'>Feature request</option>
            <option value='product'>Product issue</option>
            <option value='other'>Other</option>
        </select>
        <div class='support__error' hidden>Error message</div>

        <label class='support__label' for='support-message'>Message</label>

        <textarea
            class='support__input support__textarea'
            id='support-message'
            placeholder='Describe your issue or request...'
            rows='5'
            required
        ></textarea>


        <div class='support__error' id='supportError' hidden>Error message</div>

        <button class='support__button button' type='submit'>Send Message</button>
    </form>
</main>
`},useData:!0});class gn{#e;#t;constructor(e,r=null){this.#e=e,this.#t=r}render(){this.#e.innerHTML=vn({}),this.#n()}#n(){const e=this.#e.querySelector("#support-form"),r=this.#e.querySelector("#supportError");e&&e.addEventListener("submit",async i=>{i.preventDefault();const s=e.querySelector("#support-tag").value,t=e.querySelector("#support-message").value.trim();if(e.querySelector("#support-file").files[0],r.textContent="",r.hidden=!0,!s){this.#r("Please select a topic.");return}if(!t){this.#r("Please write a message.");return}const o=new FormData;o.append("tag",s),o.append("message",t);try{(await submitSupportForm(o))?.success&&(this.#i(),e.reset(),this.#a())}catch(l){this.#r(l.message||"Failed to send message. Please try again.")}})}#r(e){const r=this.#e.querySelector("#supportError");r.textContent=e,r.hidden=!1}#i(){const e=this.#e.querySelector("#supportError");e.textContent="Thank you! Your message has been sent.",e.style.color="var(--color-green)",e.hidden=!1,setTimeout(()=>{e.hidden=!0,e.style.color=""},5e3)}#a(){const e=this.#e.querySelector(".support__file-label");e&&(e.textContent="Attach file (optional)")}}const $={"/":Dt,"/login":Vt,"/signup":zt,"/account/:tab":fn,"/film/:id":Xt,"/actor/:id":nn,"/player/:id":on,"/series":"/","/films":"/","*":_n,"/newAppeal":gn};class wn{#e;constructor(e){if(this.#e=e,this.root=document.getElementById("root"),!this.root)throw new Error("#root not found")}getParams(e,r){const i=e.split("/").filter(Boolean),s=r.split("/").filter(Boolean);if(i.length!==s.length)return null;const t={};for(let n=0;n<i.length;n++)if(i[n].startsWith(":"))t[i[n].slice(1)]=s[n];else if(i[n]!==s[n])return null;return t}matchRoute(e){if($[e]==="/")return{Page:$["/"],params:{}};for(const r in $){const i=this.getParams(r,e);if(i!==null)return{Page:$[r],params:i}}return{Page:$["*"],params:{}}}async navigate(e=window.location.pathname){const r=this.matchRoute(e);if(!r){console.error("Route not found:",e);return}const{Page:i,params:s}=r;this.root.innerHTML="";const t=document.createElement("div");this.root.appendChild(this.#e.renderWithContainer(t));const n=new i(t,this.#e,s);n.render(),n.afterRender&&n.afterRender(),window.location.pathname!==e&&window.history.pushState({path:e},"",e)}init(){document.body.addEventListener("click",e=>{const r=e.target;let i=null;r.hasAttribute("data-navigate")?i=r.getAttribute("data-navigate"):r.closest("a[data-navigate]")&&(i=r.closest("a[data-navigate]").getAttribute("href")),i&&i.startsWith("/")&&(e.preventDefault(),this.navigate(i))}),window.addEventListener("popstate",()=>{this.navigate(window.location.pathname)}),this.navigate()}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(a=>{console.log("SW registered:",a)}).catch(a=>{console.error("SW registration failed:",a)})});function yn(){document.getElementById("root");const a=new Tt;new wn(a).init()}document.addEventListener("DOMContentLoaded",yn);
