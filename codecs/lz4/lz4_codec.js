// @ts-nocheck
var lz4_codec = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;

  return (
function(moduleArg = {}) {

var f=moduleArg,aa,t;f.ready=new Promise((a,b)=>{aa=a;t=b});var ba=Object.assign({},f),u=f.printErr||console.error.bind(console);Object.assign(f,ba);ba=null;var v;f.wasmBinary&&(v=f.wasmBinary);"object"!=typeof WebAssembly&&x("no native wasm support detected");var z,da=!1,C,D,E,F,G,H,ea,fa;
function ha(){var a=z.buffer;f.HEAP8=C=new Int8Array(a);f.HEAP16=E=new Int16Array(a);f.HEAPU8=D=new Uint8Array(a);f.HEAPU16=F=new Uint16Array(a);f.HEAP32=G=new Int32Array(a);f.HEAPU32=H=new Uint32Array(a);f.HEAPF32=ea=new Float32Array(a);f.HEAPF64=fa=new Float64Array(a)}var ia=[],ja=[],ka=[];function la(){var a=f.preRun.shift();ia.unshift(a)}var I=0,J=null,L=null;
function x(a){f.onAbort?.(a);a="Aborted("+a+")";u(a);da=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");t(a);throw a;}var ma=a=>a.startsWith("data:application/octet-stream;base64,"),na=a=>a.startsWith("file://"),M;M="lz4_codec.wasm";if(!ma(M)){var oa=M;M=f.locateFile?f.locateFile(oa,""):""+oa}function pa(a){return Promise.resolve().then(()=>{if(a==M&&v)var b=new Uint8Array(v);else throw"both async and sync fetching of the wasm failed";return b})}
function qa(a,b,c){return pa(a).then(d=>WebAssembly.instantiate(d,b)).then(d=>d).then(c,d=>{u(`failed to asynchronously prepare wasm: ${d}`);x(d)})}function ra(a,b){var c=M;return v||"function"!=typeof WebAssembly.instantiateStreaming||ma(c)||na(c)||"function"!=typeof fetch?qa(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){u(`wasm streaming compile failed: ${e}`);u("falling back to ArrayBuffer instantiation");return qa(c,a,b)}))}
var N=a=>{for(;0<a.length;)a.shift()(f)};function sa(a){this.D=a-24;this.K=function(b){H[this.D+4>>2]=b};this.J=function(b){H[this.D+8>>2]=b};this.F=function(b,c){this.G();this.K(b);this.J(c)};this.G=function(){H[this.D+16>>2]=0}}
var ta=0,ua=0,va,O=a=>{for(var b="";D[a];)b+=va[D[a++]];return b},P={},Q={},R={},S,wa=a=>{throw new S(a);},T,xa=(a,b)=>{function c(l){l=b(l);if(l.length!==d.length)throw new T("Mismatched type converter count");for(var g=0;g<d.length;++g)U(d[g],l[g])}var d=[];d.forEach(function(l){R[l]=a});var e=Array(a.length),h=[],k=0;a.forEach((l,g)=>{Q.hasOwnProperty(l)?e[g]=Q[l]:(h.push(l),P.hasOwnProperty(l)||(P[l]=[]),P[l].push(()=>{e[g]=Q[l];++k;k===h.length&&c(e)}))});0===h.length&&c(e)};
function ya(a,b,c={}){var d=b.name;if(!a)throw new S(`type "${d}" must have a positive integer typeid pointer`);if(Q.hasOwnProperty(a)){if(c.M)return;throw new S(`Cannot register type '${d}' twice`);}Q[a]=b;delete R[a];P.hasOwnProperty(a)&&(b=P[a],delete P[a],b.forEach(e=>e()))}function U(a,b,c={}){if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");ya(a,b,c)}function za(){this.B=[void 0];this.H=[]}
var V=new za,Aa=a=>{a>=V.D&&0===--V.get(a).I&&V.G(a)},Ba=a=>{switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:return V.F({I:1,value:a})}};function Ca(a){return this.fromWireType(G[a>>2])}
var Da=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ea[c>>2])};case 8:return function(c){return this.fromWireType(fa[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},Ga=(a,b)=>Object.defineProperty(b,"name",{value:a}),Ha=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function Ia(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].C)return!0;return!1}
function Ja(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=Ga(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
var Ka=(a,b)=>{if(void 0===f[a].A){var c=f[a];f[a]=function(){if(!f[a].A.hasOwnProperty(arguments.length))throw new S(`Function '${b}' called with an invalid number of arguments (${arguments.length}) - expects one of (${f[a].A})!`);return f[a].A[arguments.length].apply(this,arguments)};f[a].A=[];f[a].A[c.L]=c}},La=(a,b,c)=>{if(f.hasOwnProperty(a)){if(void 0===c||void 0!==f[a].A&&void 0!==f[a].A[c])throw new S(`Cannot register public name '${a}' twice`);Ka(a,a);if(f.hasOwnProperty(c))throw new S(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
f[a].A[c]=b}else f[a]=b,void 0!==c&&(f[a].O=c)},Ma=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(H[b+4*d>>2]);return c},Na,Oa=(a,b)=>{var c=[];return function(){c.length=0;Object.assign(c,arguments);if(a.includes("j")){var d=f["dynCall_"+a];d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)}else d=Na.get(b).apply(null,c);return d}},Pa=(a,b)=>{a=O(a);var c=a.includes("j")?Oa(a,b):Na.get(b);if("function"!=typeof c)throw new S(`unknown function pointer with signature ${a}: ${b}`);return c},Qa,Sa=a=>
{a=Ra(a);var b=O(a);W(a);return b},Ta=(a,b)=>{function c(h){e[h]||Q[h]||(R[h]?R[h].forEach(c):(d.push(h),e[h]=!0))}var d=[],e={};b.forEach(c);throw new Qa(`${a}: `+d.map(Sa).join([", "]));},Ua=a=>{a=a.trim();const b=a.indexOf("(");return-1!==b?a.substr(0,b):a},Va=(a,b,c)=>{switch(b){case 1:return c?d=>C[d>>0]:d=>D[d>>0];case 2:return c?d=>E[d>>1]:d=>F[d>>1];case 4:return c?d=>G[d>>2]:d=>H[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}};
function Wa(a){return this.fromWireType(H[a>>2])}
for(var Xa="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,Ya="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0,Za=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&F[c];)++c;c<<=1;if(32<c-a&&Ya)return Ya.decode(D.subarray(a,c));c="";for(d=0;!(d>=b/2);++d){var e=E[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},$a=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)E[b>>1]=a.charCodeAt(e),b+=2;E[b>>1]=0;return b-
d},ab=a=>2*a.length,bb=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=G[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},cb=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var h=a.charCodeAt(e);if(55296<=h&&57343>=h){var k=a.charCodeAt(++e);h=65536+((h&1023)<<10)|k&1023}G[b>>2]=h;b+=4;if(b+4>c)break}G[b>>2]=0;return b-d},db=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);
55296<=d&&57343>=d&&++c;b+=4}return b},eb=Array(256),X=0;256>X;++X)eb[X]=String.fromCharCode(X);va=eb;S=f.BindingError=class extends Error{constructor(a){super(a);this.name="BindingError"}};T=f.InternalError=class extends Error{constructor(a){super(a);this.name="InternalError"}};Object.assign(za.prototype,{get(a){return this.B[a]},has(a){return void 0!==this.B[a]},F(a){var b=this.H.pop()||this.B.length;this.B[b]=a;return b},G(a){this.B[a]=void 0;this.H.push(a)}});
V.B.push({value:void 0},{value:null},{value:!0},{value:!1});V.D=V.B.length;f.count_emval_handles=()=>{for(var a=0,b=V.D;b<V.B.length;++b)void 0!==V.B[b]&&++a;return a};
Qa=f.UnboundTypeError=((a,b)=>{var c=Ga(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,"UnboundTypeError");
var gb={n:(a,b,c)=>{(new sa(a)).F(b,c);ta=a;ua++;throw ta;},o:()=>{},l:(a,b,c,d)=>{b=O(b);U(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,h){return h?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(D[e])},C:null})},k:(a,b)=>{b=O(b);U(a,{name:b,fromWireType:c=>{if(!c)throw new S("Cannot use deleted val. handle = "+c);var d=V.get(c).value;Aa(c);return d},toWireType:(c,d)=>Ba(d),argPackAdvance:8,readValueFromPointer:Ca,C:null})},i:(a,b,c)=>{b=O(b);
U(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:Da(b,c),C:null})},d:(a,b,c,d,e,h,k)=>{var l=Ma(b,c);a=O(a);a=Ua(a);e=Pa(d,e);La(a,function(){Ta(`Cannot call ${a} due to unbound types`,l)},b-1);xa(l,function(g){var n=a;var p=a;g=[g[0],null].concat(g.slice(1));var q=e,m=g.length;if(2>m)throw new S("argTypes array size mismatch! Must at least get return value and 'this' types!");var r=null!==g[1]&&!1,y=Ia(g),A="void"!==g[0].name;q=[wa,q,h,Ha,g[0],g[1]];for(var w=
0;w<m-2;++w)q.push(g[w+2]);if(!y)for(w=r?1:2;w<g.length;++w)null!==g[w].C&&q.push(g[w].C);y=Ia(g);w=g.length;var B="",K="";for(m=0;m<w-2;++m)B+=(0!==m?", ":"")+"arg"+m,K+=(0!==m?", ":"")+"arg"+m+"Wired";B=`\n        return function (${B}) {\n        if (arguments.length !== ${w-2}) {\n          throwBindingError('function ${p} called with ' + arguments.length + ' arguments, expected ${w-2}');\n        }`;y&&(B+="var destructors = [];\n");var Ea=y?"destructors":"null",ca="throwBindingError invoker fn runDestructors retType classParam".split(" ");
r&&(B+="var thisWired = classParam['toWireType']("+Ea+", this);\n");for(m=0;m<w-2;++m)B+="var arg"+m+"Wired = argType"+m+"['toWireType']("+Ea+", arg"+m+"); // "+g[m+2].name+"\n",ca.push("argType"+m);r&&(K="thisWired"+(0<K.length?", ":"")+K);B+=(A||k?"var rv = ":"")+"invoker(fn"+(0<K.length?", ":"")+K+");\n";if(y)B+="runDestructors(destructors);\n";else for(m=r?1:2;m<g.length;++m)r=1===m?"thisWired":"arg"+(m-2)+"Wired",null!==g[m].C&&(B+=r+"_dtor("+r+"); // "+g[m].name+"\n",ca.push(r+"_dtor"));A&&
(B+="var ret = retType['fromWireType'](rv);\nreturn ret;\n");let [Fa,hb]=[ca,B+"}\n"];Fa.push(hb);g=Ja(Fa).apply(null,q);p=Ga(p,g);g=b-1;if(!f.hasOwnProperty(n))throw new T("Replacing nonexistant public symbol");void 0!==f[n].A&&void 0!==g?f[n].A[g]=p:(f[n]=p,f[n].L=g);return[]})},b:(a,b,c,d,e)=>{b=O(b);-1===e&&(e=4294967295);e=l=>l;if(0===d){var h=32-8*c;e=l=>l<<h>>>h}var k=b.includes("unsigned")?function(l,g){return g>>>0}:function(l,g){return g};U(a,{name:b,fromWireType:e,toWireType:k,argPackAdvance:8,
readValueFromPointer:Va(b,c,0!==d),C:null})},a:(a,b,c)=>{function d(h){return new e(C.buffer,H[h+4>>2],H[h>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=O(c);U(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{M:!0})},e:(a,b)=>{b=O(b);var c="std::string"===b;U(a,{name:b,fromWireType:function(d){var e=H[d>>2],h=d+4;if(c)for(var k=h,l=0;l<=e;++l){var g=h+l;if(l==e||0==D[g]){if(k){var n=k;var p=D,q=n+(g-k);for(k=n;p[k]&&
!(k>=q);)++k;if(16<k-n&&p.buffer&&Xa)n=Xa.decode(p.subarray(n,k));else{for(q="";n<k;){var m=p[n++];if(m&128){var r=p[n++]&63;if(192==(m&224))q+=String.fromCharCode((m&31)<<6|r);else{var y=p[n++]&63;m=224==(m&240)?(m&15)<<12|r<<6|y:(m&7)<<18|r<<12|y<<6|p[n++]&63;65536>m?q+=String.fromCharCode(m):(m-=65536,q+=String.fromCharCode(55296|m>>10,56320|m&1023))}}else q+=String.fromCharCode(m)}n=q}}else n="";if(void 0===A)var A=n;else A+=String.fromCharCode(0),A+=n;k=g+1}}else{A=Array(e);for(l=0;l<e;++l)A[l]=
String.fromCharCode(D[h+l]);A=A.join("")}W(d);return A},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var h,k="string"==typeof e;if(!(k||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new S("Cannot pass non-string to std::string");var l;if(c&&k)for(h=l=0;h<e.length;++h){var g=e.charCodeAt(h);127>=g?l++:2047>=g?l+=2:55296<=g&&57343>=g?(l+=4,++h):l+=3}else l=e.length;h=l;l=fb(4+h+1);g=l+4;H[l>>2]=h;if(c&&k){if(k=g,g=h+1,h=D,0<g){g=k+
g-1;for(var n=0;n<e.length;++n){var p=e.charCodeAt(n);if(55296<=p&&57343>=p){var q=e.charCodeAt(++n);p=65536+((p&1023)<<10)|q&1023}if(127>=p){if(k>=g)break;h[k++]=p}else{if(2047>=p){if(k+1>=g)break;h[k++]=192|p>>6}else{if(65535>=p){if(k+2>=g)break;h[k++]=224|p>>12}else{if(k+3>=g)break;h[k++]=240|p>>18;h[k++]=128|p>>12&63}h[k++]=128|p>>6&63}h[k++]=128|p&63}}h[k]=0}}else if(k)for(k=0;k<h;++k){n=e.charCodeAt(k);if(255<n)throw W(g),new S("String has UTF-16 code units that do not fit in 8 bits");D[g+k]=
n}else for(k=0;k<h;++k)D[g+k]=e[k];null!==d&&d.push(W,l);return l},argPackAdvance:8,readValueFromPointer:Wa,C(d){W(d)}})},c:(a,b,c)=>{c=O(c);if(2===b){var d=Za;var e=$a;var h=ab;var k=()=>F;var l=1}else 4===b&&(d=bb,e=cb,h=db,k=()=>H,l=2);U(a,{name:c,fromWireType:g=>{for(var n=H[g>>2],p=k(),q,m=g+4,r=0;r<=n;++r){var y=g+4+r*b;if(r==n||0==p[y>>l])m=d(m,y-m),void 0===q?q=m:(q+=String.fromCharCode(0),q+=m),m=y+b}W(g);return q},toWireType:(g,n)=>{if("string"!=typeof n)throw new S(`Cannot pass non-string to C++ string type ${c}`);
var p=h(n),q=fb(4+p+b);H[q>>2]=p>>l;e(n,q+4,p+b);null!==g&&g.push(W,q);return q},argPackAdvance:8,readValueFromPointer:Ca,C(g){W(g)}})},m:(a,b)=>{b=O(b);U(a,{N:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})},g:Aa,j:a=>{4<a&&(V.get(a).I+=1)},f:(a,b)=>{var c=Q[a];if(void 0===c)throw a="_emval_take_value has unknown type "+Sa(a),new S(a);a=c;a=a.readValueFromPointer(b);return Ba(a)},h:()=>{x("")},q:(a,b,c)=>D.copyWithin(a,b,b+c),p:a=>{var b=D.length;a>>>=0;if(2147483648<a)return!1;
for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-z.buffer.byteLength+65535)/65536;try{z.grow(e);ha();var h=1;break a}catch(k){}h=void 0}if(h)return!0}return!1}},Y=function(){function a(c){Y=c.exports;z=Y.r;ha();Na=Y.w;ja.unshift(Y.s);I--;f.monitorRunDependencies?.(I);0==I&&(null!==J&&(clearInterval(J),J=null),L&&(c=L,L=null,c()));return Y}var b={a:gb};I++;f.monitorRunDependencies?.(I);if(f.instantiateWasm)try{return f.instantiateWasm(b,
a)}catch(c){u(`Module.instantiateWasm callback failed with error: ${c}`),t(c)}ra(b,function(c){a(c.instance)}).catch(t);return{}}(),fb=a=>(fb=Y.t)(a),W=a=>(W=Y.u)(a),Ra=a=>(Ra=Y.v)(a),Z;L=function ib(){Z||jb();Z||(L=ib)};
function jb(){function a(){if(!Z&&(Z=!0,f.calledRun=!0,!da)){N(ja);aa(f);if(f.onRuntimeInitialized)f.onRuntimeInitialized();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=[f.postRun]);f.postRun.length;){var b=f.postRun.shift();ka.unshift(b)}N(ka)}}if(!(0<I)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)la();N(ia);0<I||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1);a()},1)):a())}}
if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();jb();


  return moduleArg.ready
}
);
})();
;
export default lz4_codec;
