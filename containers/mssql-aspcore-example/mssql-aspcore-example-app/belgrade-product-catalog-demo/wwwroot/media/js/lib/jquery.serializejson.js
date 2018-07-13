/*!
  SerializeJSON jQuery plugin.
  https://github.com/marioizquierdo/jquery.serializeJSON
  version 2.7.2 (Dec, 2015)

  Copyright (c) 2012, 2015 Mario Izquierdo
  Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
  and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/
!function(e){if("function"==typeof define&&define.amd)define(["jquery"],e);else if("object"==typeof exports){var n=require("jquery");module.exports=e(n)}else e(window.jQuery||window.Zepto||window.$)}(function(e){"use strict";e.fn.serializeJSON=function(n){var r,t,a,i,s,u,o,l,p,c,d;return r=e.serializeJSON,t=this,a=r.setupOpts(n),i=t.serializeArray(),r.readCheckboxUncheckedValues(i,a,t),s={},e.each(i,function(e,n){u=n.name,o=n.value,l=r.extractTypeAndNameWithNoType(u),p=l.nameWithNoType,c=l.type,c||(c=r.tryToFindTypeFromDataAttr(u,t)),r.validateType(u,c,a),"skip"!==c&&(d=r.splitInputNameIntoKeysArray(p),o=r.parseValue(o,u,c,a),r.deepSet(s,d,o,a))}),s},e.serializeJSON={defaultOptions:{checkboxUncheckedValue:void 0,parseNumbers:!1,parseBooleans:!1,parseNulls:!1,parseAll:!1,parseWithFunction:null,customTypes:{},defaultTypes:{string:function(e){return String(e)},number:function(e){return Number(e)},"boolean":function(e){var n=["false","null","undefined","","0"];return-1===n.indexOf(e)},"null":function(e){var n=["false","null","undefined","","0"];return-1===n.indexOf(e)?e:null},array:function(e){return JSON.parse(e)},object:function(e){return JSON.parse(e)},auto:function(n){return e.serializeJSON.parseValue(n,null,null,{parseNumbers:!0,parseBooleans:!0,parseNulls:!0})},skip:null},useIntKeysAsArrayIndex:!1},setupOpts:function(n){var r,t,a,i,s,u;u=e.serializeJSON,null==n&&(n={}),a=u.defaultOptions||{},t=["checkboxUncheckedValue","parseNumbers","parseBooleans","parseNulls","parseAll","parseWithFunction","customTypes","defaultTypes","useIntKeysAsArrayIndex"];for(r in n)if(-1===t.indexOf(r))throw new Error("serializeJSON ERROR: invalid option '"+r+"'. Please use one of "+t.join(", "));return i=function(e){return n[e]!==!1&&""!==n[e]&&(n[e]||a[e])},s=i("parseAll"),{checkboxUncheckedValue:i("checkboxUncheckedValue"),parseNumbers:s||i("parseNumbers"),parseBooleans:s||i("parseBooleans"),parseNulls:s||i("parseNulls"),parseWithFunction:i("parseWithFunction"),typeFunctions:e.extend({},i("defaultTypes"),i("customTypes")),useIntKeysAsArrayIndex:i("useIntKeysAsArrayIndex")}},parseValue:function(n,r,t,a){var i,s;return i=e.serializeJSON,s=n,a.typeFunctions&&t&&a.typeFunctions[t]?s=a.typeFunctions[t](n):a.parseNumbers&&i.isNumeric(n)?s=Number(n):!a.parseBooleans||"true"!==n&&"false"!==n?a.parseNulls&&"null"==n&&(s=null):s="true"===n,a.parseWithFunction&&!t&&(s=a.parseWithFunction(s,r)),s},isObject:function(e){return e===Object(e)},isUndefined:function(e){return void 0===e},isValidArrayIndex:function(e){return/^[0-9]+$/.test(String(e))},isNumeric:function(e){return e-parseFloat(e)>=0},optionKeys:function(e){if(Object.keys)return Object.keys(e);var n,r=[];for(n in e)r.push(n);return r},readCheckboxUncheckedValues:function(n,r,t){var a,i,s,u,o;null==r&&(r={}),o=e.serializeJSON,a="input[type=checkbox][name]:not(:checked):not([disabled])",i=t.find(a).add(t.filter(a)),i.each(function(t,a){s=e(a),u=s.attr("data-unchecked-value"),u?n.push({name:a.name,value:u}):o.isUndefined(r.checkboxUncheckedValue)||n.push({name:a.name,value:r.checkboxUncheckedValue})})},extractTypeAndNameWithNoType:function(e){var n;return(n=e.match(/(.*):([^:]+)$/))?{nameWithNoType:n[1],type:n[2]}:{nameWithNoType:e,type:null}},tryToFindTypeFromDataAttr:function(e,n){var r,t,a,i;return r=e.replace(/(:|\.|\[|\]|\s)/g,"\\$1"),t='[name="'+r+'"]',a=n.find(t).add(n.filter(t)),i=a.attr("data-value-type"),i||null},validateType:function(n,r,t){var a,i;if(i=e.serializeJSON,a=i.optionKeys(t?t.typeFunctions:i.defaultOptions.defaultTypes),r&&-1===a.indexOf(r))throw new Error("serializeJSON ERROR: Invalid type "+r+" found in input name '"+n+"', please use one of "+a.join(", "));return!0},splitInputNameIntoKeysArray:function(n){var r,t;return t=e.serializeJSON,r=n.split("["),r=e.map(r,function(e){return e.replace(/\]/g,"")}),""===r[0]&&r.shift(),r},deepSet:function(n,r,t,a){var i,s,u,o,l,p;if(null==a&&(a={}),p=e.serializeJSON,p.isUndefined(n))throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");if(!r||0===r.length)throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");i=r[0],1===r.length?""===i?n.push(t):n[i]=t:(s=r[1],""===i&&(o=n.length-1,l=n[o],i=p.isObject(l)&&(p.isUndefined(l[s])||r.length>2)?o:o+1),""===s?(p.isUndefined(n[i])||!e.isArray(n[i]))&&(n[i]=[]):a.useIntKeysAsArrayIndex&&p.isValidArrayIndex(s)?(p.isUndefined(n[i])||!e.isArray(n[i]))&&(n[i]=[]):(p.isUndefined(n[i])||!p.isObject(n[i]))&&(n[i]={}),u=r.slice(1),p.deepSet(n[i],u,t,a))}}});