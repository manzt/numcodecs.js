
var blosc_codec = (function() {
  var _scriptDir = import.meta.url;
  
  return (
function(blosc_codec) {
  blosc_codec = blosc_codec || {};


var d;d||(d=typeof blosc_codec !== 'undefined' ? blosc_codec : {});var r={},t;for(t in d)d.hasOwnProperty(t)&&(r[t]=d[t]);var aa="./this.program",u="";document.currentScript&&(u=document.currentScript.src);_scriptDir&&(u=_scriptDir);0!==u.indexOf("blob:")?u=u.substr(0,u.lastIndexOf("/")+1):u="";var ba=d.print||console.log.bind(console),v=d.printErr||console.warn.bind(console);for(t in r)r.hasOwnProperty(t)&&(d[t]=r[t]);r=null;d.thisProgram&&(aa=d.thisProgram);var w;d.wasmBinary&&(w=d.wasmBinary);
var noExitRuntime;d.noExitRuntime&&(noExitRuntime=d.noExitRuntime);"object"!==typeof WebAssembly&&v("no native wasm support detected");var y,ca=new WebAssembly.Table({initial:86,maximum:86,element:"anyfunc"}),da=!1,ea="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function fa(a,b,c){var e=b+c;for(c=b;a[c]&&!(c>=e);)++c;if(16<c-b&&a.subarray&&ea)return ea.decode(a.subarray(b,c));for(e="";b<c;){var f=a[b++];if(f&128){var g=a[b++]&63;if(192==(f&224))e+=String.fromCharCode((f&31)<<6|g);else{var m=a[b++]&63;f=224==(f&240)?(f&15)<<12|g<<6|m:(f&7)<<18|g<<12|m<<6|a[b++]&63;65536>f?e+=String.fromCharCode(f):(f-=65536,e+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else e+=String.fromCharCode(f)}return e}
function ha(a,b,c){var e=z;if(0<c){c=b+c-1;for(var f=0;f<a.length;++f){var g=a.charCodeAt(f);if(55296<=g&&57343>=g){var m=a.charCodeAt(++f);g=65536+((g&1023)<<10)|m&1023}if(127>=g){if(b>=c)break;e[b++]=g}else{if(2047>=g){if(b+1>=c)break;e[b++]=192|g>>6}else{if(65535>=g){if(b+2>=c)break;e[b++]=224|g>>12}else{if(b+3>=c)break;e[b++]=240|g>>18;e[b++]=128|g>>12&63}e[b++]=128|g>>6&63}e[b++]=128|g&63}}e[b]=0}}var ia="undefined"!==typeof TextDecoder?new TextDecoder("utf-16le"):void 0;
function ja(a){var b;for(b=a>>1;A[b];)++b;b<<=1;if(32<b-a&&ia)return ia.decode(z.subarray(a,b));b=0;for(var c="";;){var e=A[a+2*b>>1];if(0==e)return c;++b;c+=String.fromCharCode(e)}}function ka(a,b,c){void 0===c&&(c=2147483647);if(2>c)return 0;c-=2;var e=b;c=c<2*a.length?c/2:a.length;for(var f=0;f<c;++f)A[b>>1]=a.charCodeAt(f),b+=2;A[b>>1]=0;return b-e}function la(a){return 2*a.length}
function ma(a){for(var b=0,c="";;){var e=B[a+4*b>>2];if(0==e)return c;++b;65536<=e?(e-=65536,c+=String.fromCharCode(55296|e>>10,56320|e&1023)):c+=String.fromCharCode(e)}}function na(a,b,c){void 0===c&&(c=2147483647);if(4>c)return 0;var e=b;c=e+c-4;for(var f=0;f<a.length;++f){var g=a.charCodeAt(f);if(55296<=g&&57343>=g){var m=a.charCodeAt(++f);g=65536+((g&1023)<<10)|m&1023}B[b>>2]=g;b+=4;if(b+4>c)break}B[b>>2]=0;return b-e}
function oa(a){for(var b=0,c=0;c<a.length;++c){var e=a.charCodeAt(c);55296<=e&&57343>=e&&++c;b+=4}return b}var C,D,z,A,E,B,F,pa,qa;function ra(a){C=a;d.HEAP8=D=new Int8Array(a);d.HEAP16=A=new Int16Array(a);d.HEAP32=B=new Int32Array(a);d.HEAPU8=z=new Uint8Array(a);d.HEAPU16=E=new Uint16Array(a);d.HEAPU32=F=new Uint32Array(a);d.HEAPF32=pa=new Float32Array(a);d.HEAPF64=qa=new Float64Array(a)}var sa=d.INITIAL_MEMORY||16777216;d.wasmMemory?y=d.wasmMemory:y=new WebAssembly.Memory({initial:sa/65536,maximum:32768});
y&&(C=y.buffer);sa=C.byteLength;ra(C);B[7968]=5274912;function G(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(d);else{var c=b.ba;"number"===typeof c?void 0===b.Y?d.dynCall_v(c):d.dynCall_vi(c,b.Y):c(void 0===b.Y?null:b.Y)}}}var ta=[],ua=[],va=[],wa=[];function xa(){var a=d.preRun.shift();ta.unshift(a)}var H=0,ya=null,L=null;d.preloadedImages={};d.preloadedAudios={};
function za(a){if(d.onAbort)d.onAbort(a);ba(a);v(a);da=!0;throw new WebAssembly.RuntimeError("abort("+a+"). Build with -s ASSERTIONS=1 for more info.");}function Aa(){var a=M;return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")}var M="blosc_codec.wasm";if(!Aa()){var Ba=M;M=d.locateFile?d.locateFile(Ba,u):u+Ba}
function Ca(){try{if(w)return new Uint8Array(w);throw"both async and sync fetching of the wasm failed";}catch(a){za(a)}}function Da(){return w||"function"!==typeof fetch?new Promise(function(a){a(Ca())}):fetch(M,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+M+"'";return a.arrayBuffer()}).catch(function(){return Ca()})}ua.push({ba:function(){Ea()}});function N(){return 0<N.$}
function Fa(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}var Ga=void 0;function P(a){for(var b="";z[a];)b+=Ga[z[a++]];return b}var Q={},R={},S={};function Ha(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?"_"+a:a}
function Ia(a,b){a=Ha(a);return(new Function("body","return function "+a+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b)}function Ja(a){var b=Error,c=Ia(a,function(e){this.name=a;this.message=e;e=Error(e).stack;void 0!==e&&(this.stack=this.toString()+"\n"+e.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(b.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c}
var Ka=void 0;function T(a){throw new Ka(a);}var La=void 0;function Ma(a,b){function c(h){h=b(h);if(h.length!==e.length)throw new La("Mismatched type converter count");for(var l=0;l<e.length;++l)U(e[l],h[l])}var e=[];e.forEach(function(h){S[h]=a});var f=Array(a.length),g=[],m=0;a.forEach(function(h,l){R.hasOwnProperty(h)?f[l]=R[h]:(g.push(h),Q.hasOwnProperty(h)||(Q[h]=[]),Q[h].push(function(){f[l]=R[h];++m;m===g.length&&c(f)}))});0===g.length&&c(f)}
function U(a,b,c){c=c||{};if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");var e=b.name;a||T('type "'+e+'" must have a positive integer typeid pointer');if(R.hasOwnProperty(a)){if(c.ca)return;T("Cannot register type '"+e+"' twice")}R[a]=b;delete S[a];Q.hasOwnProperty(a)&&(b=Q[a],delete Q[a],b.forEach(function(f){f()}))}var Na=[],V=[{},{value:void 0},{value:null},{value:!0},{value:!1}];
function Pa(a){4<a&&0===--V[a].Z&&(V[a]=void 0,Na.push(a))}function Qa(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var b=Na.length?Na.pop():V.length;V[b]={Z:1,value:a};return b}}function Ra(a){return this.fromWireType(F[a>>2])}function Sa(a){if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a}
function Ta(a,b){switch(b){case 2:return function(c){return this.fromWireType(pa[c>>2])};case 3:return function(c){return this.fromWireType(qa[c>>3])};default:throw new TypeError("Unknown float type: "+a);}}function Ua(a){var b=Function;if(!(b instanceof Function))throw new TypeError("new_ called with constructor type "+typeof b+" which is not a function");var c=Ia(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
function Va(a){for(;a.length;){var b=a.pop();a.pop()(b)}}function Wa(a,b){var c=d;if(void 0===c[a].W){var e=c[a];c[a]=function(){c[a].W.hasOwnProperty(arguments.length)||T("Function '"+b+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+c[a].W+")!");return c[a].W[arguments.length].apply(this,arguments)};c[a].W=[];c[a].W[e.aa]=e}}
function Xa(a,b,c){d.hasOwnProperty(a)?((void 0===c||void 0!==d[a].W&&void 0!==d[a].W[c])&&T("Cannot register public name '"+a+"' twice"),Wa(a,a),d.hasOwnProperty(c)&&T("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),d[a].W[c]=b):(d[a]=b,void 0!==c&&(d[a].ea=c))}function Ya(a,b){for(var c=[],e=0;e<a;e++)c.push(B[(b>>2)+e]);return c}
function Za(a,b){a=P(a);var c=d["dynCall_"+a];for(var e=[],f=1;f<a.length;++f)e.push("a"+f);f="return function dynCall_"+(a+"_"+b)+"("+e.join(", ")+") {\n";f+="    return dynCall(rawFunction"+(e.length?", ":"")+e.join(", ")+");\n";c=(new Function("dynCall","rawFunction",f+"};\n"))(c,b);"function"!==typeof c&&T("unknown function pointer with signature "+a+": "+b);return c}var $a=void 0;function ab(a){a=bb(a);var b=P(a);W(a);return b}
function cb(a,b){function c(g){f[g]||R[g]||(S[g]?S[g].forEach(c):(e.push(g),f[g]=!0))}var e=[],f={};b.forEach(c);throw new $a(a+": "+e.map(ab).join([", "]));}function db(a,b,c){switch(b){case 0:return c?function(e){return D[e]}:function(e){return z[e]};case 1:return c?function(e){return A[e>>1]}:function(e){return E[e>>1]};case 2:return c?function(e){return B[e>>2]}:function(e){return F[e>>2]};default:throw new TypeError("Unknown integer type: "+a);}}var eb={};
function fb(){if(!gb){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"===typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:aa||"./this.program"},b;for(b in eb)a[b]=eb[b];var c=[];for(b in a)c.push(b+"="+a[b]);gb=c}return gb}for(var gb,hb=[null,[],[]],ib=Array(256),X=0;256>X;++X)ib[X]=String.fromCharCode(X);Ga=ib;Ka=d.BindingError=Ja("BindingError");La=d.InternalError=Ja("InternalError");
d.count_emval_handles=function(){for(var a=0,b=5;b<V.length;++b)void 0!==V[b]&&++a;return a};d.get_first_emval=function(){for(var a=5;a<V.length;++a)if(void 0!==V[a])return V[a];return null};$a=d.UnboundTypeError=Ja("UnboundTypeError");
var jb={p:function(a){return Y(a)},o:function(a){"uncaught_exception"in N?N.$++:N.$=1;throw a;},u:function(a,b,c,e,f){var g=Fa(c);b=P(b);U(a,{name:b,fromWireType:function(m){return!!m},toWireType:function(m,h){return h?e:f},argPackAdvance:8,readValueFromPointer:function(m){if(1===c)var h=D;else if(2===c)h=A;else if(4===c)h=B;else throw new TypeError("Unknown boolean type size: "+b);return this.fromWireType(h[m>>g])},X:null})},s:function(a,b){b=P(b);U(a,{name:b,fromWireType:function(c){var e=V[c].value;
Pa(c);return e},toWireType:function(c,e){return Qa(e)},argPackAdvance:8,readValueFromPointer:Ra,X:null})},g:function(a,b,c){c=Fa(c);b=P(b);U(a,{name:b,fromWireType:function(e){return e},toWireType:function(e,f){if("number"!==typeof f&&"boolean"!==typeof f)throw new TypeError('Cannot convert "'+Sa(f)+'" to '+this.name);return f},argPackAdvance:8,readValueFromPointer:Ta(b,c),X:null})},e:function(a,b,c,e,f,g){var m=Ya(b,c);a=P(a);f=Za(e,f);Xa(a,function(){cb("Cannot call "+a+" due to unbound types",
m)},b-1);Ma(m,function(h){var l=a,k=a;h=[h[0],null].concat(h.slice(1));var p=f,q=h.length;2>q&&T("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var I=null!==h[1]&&!1,x=!1,n=1;n<h.length;++n)if(null!==h[n]&&void 0===h[n].X){x=!0;break}var J="void"!==h[0].name,K="",O="";for(n=0;n<q-2;++n)K+=(0!==n?", ":"")+"arg"+n,O+=(0!==n?", ":"")+"arg"+n+"Wired";k="return function "+Ha(k)+"("+K+") {\nif (arguments.length !== "+(q-2)+") {\nthrowBindingError('function "+k+" called with ' + arguments.length + ' arguments, expected "+
(q-2)+" args!');\n}\n";x&&(k+="var destructors = [];\n");var Oa=x?"destructors":"null";K="throwBindingError invoker fn runDestructors retType classParam".split(" ");p=[T,p,g,Va,h[0],h[1]];I&&(k+="var thisWired = classParam.toWireType("+Oa+", this);\n");for(n=0;n<q-2;++n)k+="var arg"+n+"Wired = argType"+n+".toWireType("+Oa+", arg"+n+"); // "+h[n+2].name+"\n",K.push("argType"+n),p.push(h[n+2]);I&&(O="thisWired"+(0<O.length?", ":"")+O);k+=(J?"var rv = ":"")+"invoker(fn"+(0<O.length?", ":"")+O+");\n";
if(x)k+="runDestructors(destructors);\n";else for(n=I?1:2;n<h.length;++n)q=1===n?"thisWired":"arg"+(n-2)+"Wired",null!==h[n].X&&(k+=q+"_dtor("+q+"); // "+h[n].name+"\n",K.push(q+"_dtor"),p.push(h[n].X));J&&(k+="var ret = retType.fromWireType(rv);\nreturn ret;\n");K.push(k+"}\n");h=Ua(K).apply(null,p);n=b-1;if(!d.hasOwnProperty(l))throw new La("Replacing nonexistant public symbol");void 0!==d[l].W&&void 0!==n?d[l].W[n]=h:(d[l]=h,d[l].aa=n);return[]})},b:function(a,b,c,e,f){function g(k){return k}b=
P(b);-1===f&&(f=4294967295);var m=Fa(c);if(0===e){var h=32-8*c;g=function(k){return k<<h>>>h}}var l=-1!=b.indexOf("unsigned");U(a,{name:b,fromWireType:g,toWireType:function(k,p){if("number"!==typeof p&&"boolean"!==typeof p)throw new TypeError('Cannot convert "'+Sa(p)+'" to '+this.name);if(p<e||p>f)throw new TypeError('Passing a number "'+Sa(p)+'" from JS side to C/C++ side to an argument of type "'+b+'", which is outside the valid range ['+e+", "+f+"]!");return l?p>>>0:p|0},argPackAdvance:8,readValueFromPointer:db(b,
m,0!==e),X:null})},a:function(a,b,c){function e(g){g>>=2;var m=F;return new f(C,m[g+1],m[g])}var f=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=P(c);U(a,{name:c,fromWireType:e,argPackAdvance:8,readValueFromPointer:e},{ca:!0})},h:function(a,b){b=P(b);var c="std::string"===b;U(a,{name:b,fromWireType:function(e){var f=F[e>>2];if(c){var g=z[e+4+f],m=0;0!=g&&(m=g,z[e+4+f]=0);var h=e+4;for(g=0;g<=f;++g){var l=e+4+g;if(0==z[l]){h=h?fa(z,h,void 0):"";
if(void 0===k)var k=h;else k+=String.fromCharCode(0),k+=h;h=l+1}}0!=m&&(z[e+4+f]=m)}else{k=Array(f);for(g=0;g<f;++g)k[g]=String.fromCharCode(z[e+4+g]);k=k.join("")}W(e);return k},toWireType:function(e,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var g="string"===typeof f;g||f instanceof Uint8Array||f instanceof Uint8ClampedArray||f instanceof Int8Array||T("Cannot pass non-string to std::string");var m=(c&&g?function(){for(var k=0,p=0;p<f.length;++p){var q=f.charCodeAt(p);55296<=q&&57343>=q&&
(q=65536+((q&1023)<<10)|f.charCodeAt(++p)&1023);127>=q?++k:k=2047>=q?k+2:65535>=q?k+3:k+4}return k}:function(){return f.length})(),h=Y(4+m+1);F[h>>2]=m;if(c&&g)ha(f,h+4,m+1);else if(g)for(g=0;g<m;++g){var l=f.charCodeAt(g);255<l&&(W(h),T("String has UTF-16 code units that do not fit in 8 bits"));z[h+4+g]=l}else for(g=0;g<m;++g)z[h+4+g]=f[g];null!==e&&e.push(W,h);return h},argPackAdvance:8,readValueFromPointer:Ra,X:function(e){W(e)}})},d:function(a,b,c){c=P(c);if(2===b){var e=ja;var f=ka;var g=la;
var m=function(){return E};var h=1}else 4===b&&(e=ma,f=na,g=oa,m=function(){return F},h=2);U(a,{name:c,fromWireType:function(l){var k=F[l>>2],p=m(),q=p[l+4+k*b>>h],I=0;0!=q&&(I=q,p[l+4+k*b>>h]=0);var x=l+4;for(q=0;q<=k;++q){var n=l+4+q*b;if(0==p[n>>h]){x=e(x);if(void 0===J)var J=x;else J+=String.fromCharCode(0),J+=x;x=n+b}}0!=I&&(p[l+4+k*b>>h]=I);W(l);return J},toWireType:function(l,k){"string"!==typeof k&&T("Cannot pass non-string to C++ string type "+c);var p=g(k),q=Y(4+p+b);F[q>>2]=p>>h;f(k,q+
4,p+b);null!==l&&l.push(W,q);return q},argPackAdvance:8,readValueFromPointer:Ra,X:function(l){W(l)}})},v:function(a,b){b=P(b);U(a,{da:!0,name:b,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},n:Pa,t:function(a){4<a&&(V[a].Z+=1)},B:function(a,b){var c=R[a];void 0===c&&T("_emval_take_value has unknown type "+ab(a));a=c.readValueFromPointer(b);return Qa(a)},w:function(){za()},r:function(a,b,c){z.copyWithin(a,b,b+c)},c:function(a){a>>>=0;var b=z.length;if(2147483648<a)return!1;for(var c=
1;4>=c;c*=2){var e=b*(1+.2/c);e=Math.min(e,a+100663296);e=Math.max(16777216,a,e);0<e%65536&&(e+=65536-e%65536);a:{try{y.grow(Math.min(2147483648,e)-C.byteLength+65535>>>16);ra(y.buffer);var f=1;break a}catch(g){}f=void 0}if(f)return!0}return!1},x:function(a,b){var c=0;fb().forEach(function(e,f){var g=b+c;f=B[a+4*f>>2]=g;for(g=0;g<e.length;++g)D[f++>>0]=e.charCodeAt(g);D[f>>0]=0;c+=e.length+1});return 0},y:function(a,b){var c=fb();B[a>>2]=c.length;var e=0;c.forEach(function(f){e+=f.length+1});B[b>>
2]=e;return 0},z:function(){return 0},q:function(){},i:function(a,b,c,e){for(var f=0,g=0;g<c;g++){for(var m=B[b+8*g>>2],h=B[b+(8*g+4)>>2],l=0;l<h;l++){var k=z[m+l],p=hb[a];0===k||10===k?((1===a?ba:v)(fa(p,0)),p.length=0):p.push(k)}f+=h}B[e>>2]=f;return 0},memory:y,l:function(){return 0},k:function(){return 0},j:function(){},A:function(){return 6},m:function(){},f:function(){},table:ca},kb=function(){function a(f){d.asm=f.exports;H--;d.monitorRunDependencies&&d.monitorRunDependencies(H);0==H&&(null!==
ya&&(clearInterval(ya),ya=null),L&&(f=L,L=null,f()))}function b(f){a(f.instance)}function c(f){return Da().then(function(g){return WebAssembly.instantiate(g,e)}).then(f,function(g){v("failed to asynchronously prepare wasm: "+g);za(g)})}var e={a:jb};H++;d.monitorRunDependencies&&d.monitorRunDependencies(H);if(d.instantiateWasm)try{return d.instantiateWasm(e,a)}catch(f){return v("Module.instantiateWasm callback failed with error: "+f),!1}(function(){if(w||"function"!==typeof WebAssembly.instantiateStreaming||
Aa()||"function"!==typeof fetch)return c(b);fetch(M,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,e).then(b,function(g){v("wasm streaming compile failed: "+g);v("falling back to ArrayBuffer instantiation");c(b)})})})();return{}}();d.asm=kb;
var Ea=d.___wasm_call_ctors=function(){return(Ea=d.___wasm_call_ctors=d.asm.C).apply(null,arguments)},Y=d._malloc=function(){return(Y=d._malloc=d.asm.D).apply(null,arguments)},W=d._free=function(){return(W=d._free=d.asm.E).apply(null,arguments)},bb=d.___getTypeName=function(){return(bb=d.___getTypeName=d.asm.F).apply(null,arguments)};d.___embind_register_native_and_builtin_types=function(){return(d.___embind_register_native_and_builtin_types=d.asm.G).apply(null,arguments)};
d.dynCall_ii=function(){return(d.dynCall_ii=d.asm.H).apply(null,arguments)};d.dynCall_vi=function(){return(d.dynCall_vi=d.asm.I).apply(null,arguments)};d.dynCall_iii=function(){return(d.dynCall_iii=d.asm.J).apply(null,arguments)};d.dynCall_vii=function(){return(d.dynCall_vii=d.asm.K).apply(null,arguments)};d.dynCall_viii=function(){return(d.dynCall_viii=d.asm.L).apply(null,arguments)};d.dynCall_iiii=function(){return(d.dynCall_iiii=d.asm.M).apply(null,arguments)};
d.dynCall_iiiiiii=function(){return(d.dynCall_iiiiiii=d.asm.N).apply(null,arguments)};d.dynCall_viiiiii=function(){return(d.dynCall_viiiiii=d.asm.O).apply(null,arguments)};d.dynCall_v=function(){return(d.dynCall_v=d.asm.P).apply(null,arguments)};d.dynCall_iiiii=function(){return(d.dynCall_iiiii=d.asm.Q).apply(null,arguments)};d.dynCall_jiiiii=function(){return(d.dynCall_jiiiii=d.asm.R).apply(null,arguments)};d.dynCall_viiii=function(){return(d.dynCall_viiii=d.asm.S).apply(null,arguments)};
d.dynCall_iiiiii=function(){return(d.dynCall_iiiiii=d.asm.T).apply(null,arguments)};d.dynCall_jiji=function(){return(d.dynCall_jiji=d.asm.U).apply(null,arguments)};d.dynCall_viiiii=function(){return(d.dynCall_viiiii=d.asm.V).apply(null,arguments)};d.asm=kb;var Z;d.then=function(a){if(Z)a(d);else{var b=d.onRuntimeInitialized;d.onRuntimeInitialized=function(){b&&b();a(d)}}return d};L=function lb(){Z||mb();Z||(L=lb)};
function mb(){function a(){if(!Z&&(Z=!0,d.calledRun=!0,!da)){G(ua);G(va);if(d.onRuntimeInitialized)d.onRuntimeInitialized();if(d.postRun)for("function"==typeof d.postRun&&(d.postRun=[d.postRun]);d.postRun.length;){var b=d.postRun.shift();wa.unshift(b)}G(wa)}}if(!(0<H)){if(d.preRun)for("function"==typeof d.preRun&&(d.preRun=[d.preRun]);d.preRun.length;)xa();G(ta);0<H||(d.setStatus?(d.setStatus("Running..."),setTimeout(function(){setTimeout(function(){d.setStatus("")},1);a()},1)):a())}}d.run=mb;
if(d.preInit)for("function"==typeof d.preInit&&(d.preInit=[d.preInit]);0<d.preInit.length;)d.preInit.pop()();noExitRuntime=!0;mb();


  return blosc_codec
}
);
})();
export default blosc_codec;