var solid = typeof solid === "object" ? solid : {}; solid["data"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/AsyncGenerator.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/AsyncGenerator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AwaitValue = __webpack_require__(/*! ./AwaitValue */ "./node_modules/@babel/runtime/helpers/AwaitValue.js");

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

module.exports = AsyncGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/AwaitValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/AwaitValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _AwaitValue(value) {
  this.wrapped = value;
}

module.exports = _AwaitValue;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncIterator.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}

module.exports = _asyncIterator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/awaitAsyncGenerator.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/awaitAsyncGenerator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AwaitValue = __webpack_require__(/*! ./AwaitValue */ "./node_modules/@babel/runtime/helpers/AwaitValue.js");

function _awaitAsyncGenerator(value) {
  return new AwaitValue(value);
}

module.exports = _awaitAsyncGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/wrapAsyncGenerator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapAsyncGenerator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AsyncGenerator = __webpack_require__(/*! ./AsyncGenerator */ "./node_modules/@babel/runtime/helpers/AsyncGenerator.js");

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}

module.exports = _wrapAsyncGenerator;

/***/ }),

/***/ "./node_modules/@rdfjs/data-model/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DataFactory = __webpack_require__(/*! ./lib/data-factory */ "./node_modules/@rdfjs/data-model/lib/data-factory.js")

module.exports = DataFactory


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/blank-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/blank-node.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function BlankNode (id) {
  this.value = id || ('b' + (++BlankNode.nextId))
}

BlankNode.prototype.equals = function (other) {
  return !!other && other.termType === this.termType && other.value === this.value
}

BlankNode.prototype.termType = 'BlankNode'

BlankNode.nextId = 0

module.exports = BlankNode


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/data-factory.js":
/*!************************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/data-factory.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BlankNode = __webpack_require__(/*! ./blank-node */ "./node_modules/@rdfjs/data-model/lib/blank-node.js")
var DefaultGraph = __webpack_require__(/*! ./default-graph */ "./node_modules/@rdfjs/data-model/lib/default-graph.js")
var Literal = __webpack_require__(/*! ./literal */ "./node_modules/@rdfjs/data-model/lib/literal.js")
var NamedNode = __webpack_require__(/*! ./named-node */ "./node_modules/@rdfjs/data-model/lib/named-node.js")
var Quad = __webpack_require__(/*! ./quad */ "./node_modules/@rdfjs/data-model/lib/quad.js")
var Variable = __webpack_require__(/*! ./variable */ "./node_modules/@rdfjs/data-model/lib/variable.js")

function DataFactory () {}

DataFactory.namedNode = function (value) {
  return new NamedNode(value)
}

DataFactory.blankNode = function (value) {
  return new BlankNode(value)
}

DataFactory.literal = function (value, languageOrDatatype) {
  if (typeof languageOrDatatype === 'string') {
    if (languageOrDatatype.indexOf(':') === -1) {
      return new Literal(value, languageOrDatatype)
    }

    return new Literal(value, null, DataFactory.namedNode(languageOrDatatype))
  }

  return new Literal(value, null, languageOrDatatype)
}

DataFactory.defaultGraph = function () {
  return DataFactory.defaultGraphInstance
}

DataFactory.variable = function (value) {
  return new Variable(value)
}

DataFactory.triple = function (subject, predicate, object) {
  return DataFactory.quad(subject, predicate, object)
}

DataFactory.quad = function (subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph || DataFactory.defaultGraphInstance)
}

DataFactory.defaultGraphInstance = new DefaultGraph()

module.exports = DataFactory


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/default-graph.js":
/*!*************************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/default-graph.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function DefaultGraph () {
  this.value = ''
}

DefaultGraph.prototype.equals = function (other) {
  return !!other && other.termType === this.termType
}

DefaultGraph.prototype.termType = 'DefaultGraph'

module.exports = DefaultGraph


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/literal.js":
/*!*******************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/literal.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NamedNode = __webpack_require__(/*! ./named-node */ "./node_modules/@rdfjs/data-model/lib/named-node.js")

function Literal (value, language, datatype) {
  this.value = value
  this.datatype = Literal.stringDatatype
  this.language = ''

  if (language) {
    this.language = language
    this.datatype = Literal.langStringDatatype
  } else if (datatype) {
    this.datatype = datatype
  }
}

Literal.prototype.equals = function (other) {
  return !!other && other.termType === this.termType && other.value === this.value &&
    other.language === this.language && other.datatype.equals(this.datatype)
}

Literal.prototype.termType = 'Literal'
Literal.langStringDatatype = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
Literal.stringDatatype = new NamedNode('http://www.w3.org/2001/XMLSchema#string')

module.exports = Literal


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/named-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/named-node.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function NamedNode (iri) {
  this.value = iri
}

NamedNode.prototype.equals = function (other) {
  return !!other && other.termType === this.termType && other.value === this.value
}

NamedNode.prototype.termType = 'NamedNode'

module.exports = NamedNode


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/quad.js":
/*!****************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/quad.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DefaultGraph = __webpack_require__(/*! ./default-graph */ "./node_modules/@rdfjs/data-model/lib/default-graph.js")

function Quad (subject, predicate, object, graph) {
  this.subject = subject
  this.predicate = predicate
  this.object = object

  if (graph) {
    this.graph = graph
  } else {
    this.graph = new DefaultGraph()
  }
}

Quad.prototype.equals = function (other) {
  return !!other && other.subject.equals(this.subject) && other.predicate.equals(this.predicate) &&
    other.object.equals(this.object) && other.graph.equals(this.graph)
}

module.exports = Quad


/***/ }),

/***/ "./node_modules/@rdfjs/data-model/lib/variable.js":
/*!********************************************************!*\
  !*** ./node_modules/@rdfjs/data-model/lib/variable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Variable (name) {
  this.value = name
}

Variable.prototype.equals = function (other) {
  return !!other && other.termType === this.termType && other.value === this.value
}

Variable.prototype.termType = 'Variable'

module.exports = Variable


/***/ }),

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/jsonld-context-parser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/jsonld-context-parser/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/ContextParser */ "./node_modules/jsonld-context-parser/lib/ContextParser.js"));
__export(__webpack_require__(/*! ./lib/FetchDocumentLoader */ "./node_modules/jsonld-context-parser/lib/FetchDocumentLoader.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/jsonld-context-parser/lib/ContextParser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/jsonld-context-parser/lib/ContextParser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
const relative_to_absolute_iri_1 = __webpack_require__(/*! relative-to-absolute-iri */ "./node_modules/relative-to-absolute-iri/index.js");
const FetchDocumentLoader_1 = __webpack_require__(/*! ./FetchDocumentLoader */ "./node_modules/jsonld-context-parser/lib/FetchDocumentLoader.js");
/**
 * Parses JSON-LD contexts.
 */
class ContextParser {
    constructor(options) {
        options = options || {};
        this.documentLoader = options.documentLoader || new FetchDocumentLoader_1.FetchDocumentLoader();
        this.documentCache = {};
        this.validate = !options.skipValidation;
        this.expandContentTypeToBase = options.expandContentTypeToBase;
    }
    /**
     * Get the prefix from the given term.
     * @see https://json-ld.org/spec/latest/json-ld/#compact-iris
     * @param {string} term A term that is an URL or a prefixed URL.
     * @param {IJsonLdContextNormalized} context A context.
     * @return {string} The prefix or null.
     */
    static getPrefix(term, context) {
        const separatorPos = term.indexOf(':');
        if (separatorPos >= 0) {
            // Suffix can not begin with two slashes
            if (term.length > separatorPos + 1
                && term.charAt(separatorPos + 1) === '/'
                && term.charAt(separatorPos + 2) === '/') {
                return null;
            }
            const prefix = term.substr(0, separatorPos);
            // Prefix can not be an underscore (this is a blank node)
            if (prefix === '_') {
                return null;
            }
            // Prefix must match a term in the active context
            if (context[prefix]) {
                return prefix;
            }
        }
        return null;
    }
    /**
     * From a given context entry value, get the string value, or the @id field.
     * @param contextValue A value for a term in a context.
     * @return {string} The id value, or null.
     */
    static getContextValueId(contextValue) {
        if (contextValue === null || typeof contextValue === 'string') {
            return contextValue;
        }
        const id = contextValue['@id'];
        return id ? id : null;
    }
    /**
     * Expand the term or prefix of the given term if it has one,
     * otherwise return the term as-is.
     *
     * Iff in vocab-mode, then other references to other terms in the context can be used,
     * such as to `myTerm`:
     * ```
     * {
     *   "myTerm": "http://example.org/myLongTerm"
     * }
     * ```
     *
     * @param {string} term A term that is an URL or a prefixed URL.
     * @param {IJsonLdContextNormalized} context A context.
     * @param {boolean} vocab If the term is a predicate or type and should be expanded based on @vocab,
     *                        otherwise it is considered a regular term that is expanded based on @base.
     * @return {string} The expanded term, the term as-is, or null if it was explicitly disabled in the context.
     */
    static expandTerm(term, context, vocab) {
        const contextValue = context[term];
        // Immediately return if the term was disabled in the context
        if (contextValue === null || (contextValue && contextValue['@id'] === null)) {
            return null;
        }
        // Check the @id
        if (contextValue && vocab) {
            const value = this.getContextValueId(contextValue);
            if (value && value !== term) {
                return value;
            }
        }
        // Check if the term is prefixed
        const prefix = ContextParser.getPrefix(term, context);
        if (prefix) {
            const value = this.getContextValueId(context[prefix]);
            if (value) {
                return value + term.substr(prefix.length + 1);
            }
        }
        else if (vocab && context['@vocab'] && term.charAt(0) !== '@' && term.indexOf(':') < 0) {
            return context['@vocab'] + term;
        }
        else if (!vocab && context['@base'] && term.charAt(0) !== '@' && term.indexOf(':') < 0) {
            return relative_to_absolute_iri_1.resolve(term, context['@base']);
        }
        return term;
    }
    /**
     * Check if the given context value can be a prefix value.
     * @param value A context value.
     * @return {boolean} If it can be a prefix value.
     */
    static isPrefixValue(value) {
        return value && (typeof value === 'string' || value['@id'] || value['@type']);
    }
    /**
     * Check if the given IRI is valid.
     * @param {string} iri A potential IRI.
     * @return {boolean} If the given IRI is valid.
     */
    static isValidIri(iri) {
        return ContextParser.IRI_REGEX.test(iri);
    }
    /**
     * Add an @id term for all @reverse terms.
     * @param {IJsonLdContextNormalized} context A context.
     * @return {IJsonLdContextNormalized} The mutated input context.
     */
    static idifyReverseTerms(context) {
        for (const key of Object.keys(context)) {
            const value = context[key];
            if (value && typeof value === 'object') {
                if (value['@reverse'] && !value['@id']) {
                    if (typeof value['@reverse'] !== 'string') {
                        throw new Error(`Invalid @reverse value: '${value['@reverse']}'`);
                    }
                    value['@id'] = value['@reverse'];
                    value['@reverse'] = true;
                }
            }
        }
        return context;
    }
    /**
     * Expand all prefixed terms in the given context.
     * @param {IJsonLdContextNormalized} context A context.
     * @param {boolean} expandContentTypeToBase If @type inside the context may be expanded
     *                                          via @base if @vocab is set to null.
     * @return {IJsonLdContextNormalized} The mutated input context.
     */
    static expandPrefixedTerms(context, expandContentTypeToBase) {
        for (const key of Object.keys(context)) {
            // Only expand allowed keys
            if (ContextParser.EXPAND_KEYS_BLACKLIST.indexOf(key) < 0) {
                // Error if we try to alias a keyword to something else.
                if (key[0] === '@' && ContextParser.ALIAS_KEYS_BLACKLIST.indexOf(key) >= 0) {
                    throw new Error(`Keywords can not be aliased to something else.
Tried mapping ${key} to ${context[key]}`);
                }
                // Loop because prefixes might be nested
                while (ContextParser.isPrefixValue(context[key])) {
                    const value = context[key];
                    let changed = false;
                    if (typeof value === 'string') {
                        context[key] = ContextParser.expandTerm(value, context, true);
                        changed = changed || value !== context[key];
                    }
                    else {
                        const id = value['@id'];
                        const type = value['@type'];
                        if (id) {
                            context[key]['@id'] = ContextParser.expandTerm(id, context, true);
                            changed = changed || id !== context[key]['@id'];
                        }
                        if (type && type !== '@vocab') {
                            // First check @vocab, then fallback to @base
                            context[key]['@type'] = ContextParser.expandTerm(type, context, true);
                            if (expandContentTypeToBase && type === context[key]['@type']) {
                                context[key]['@type'] = ContextParser.expandTerm(type, context, false);
                            }
                            changed = changed || type !== context[key]['@type'];
                        }
                    }
                    if (!changed) {
                        break;
                    }
                }
            }
        }
        return context;
    }
    /**
     * Validate the entries of the given context.
     * @param {IJsonLdContextNormalized} context A context.
     */
    static validate(context) {
        for (const key of Object.keys(context)) {
            const value = context[key];
            const valueType = typeof value;
            // First check if the key is a keyword
            if (key[0] === '@') {
                switch (key.substr(1)) {
                    case 'vocab':
                        if (value !== null && valueType !== 'string') {
                            throw new Error(`Found an invalid @vocab IRI: ${value}`);
                        }
                        break;
                    case 'base':
                        if (value !== null && valueType !== 'string') {
                            throw new Error(`Found an invalid @base IRI: ${context[key]}`);
                        }
                        break;
                    case 'language':
                        if (value !== null && valueType !== 'string') {
                            throw new Error(`Found an invalid @language string: ${value}`);
                        }
                        break;
                }
            }
            // Otherwise, consider the key a term
            if (value !== null) {
                switch (valueType) {
                    case 'string':
                        // Always valid
                        break;
                    case 'object':
                        if (key.indexOf(':') < 0 && !('@id' in value)
                            && (value['@type'] === '@id' ? !context['@base'] : !context['@vocab'])) {
                            throw new Error(`Missing @id in context entry: '${key}': '${JSON.stringify(value)}'`);
                        }
                        for (const objectKey of Object.keys(value)) {
                            const objectValue = value[objectKey];
                            if (!objectValue) {
                                continue;
                            }
                            switch (objectKey) {
                                case '@id':
                                    if (objectValue[0] === '@' && objectValue !== '@type' && objectValue !== '@id') {
                                        throw new Error(`Illegal keyword alias in term value, found: '${key}': '${JSON.stringify(value)}'`);
                                    }
                                    break;
                                case '@type':
                                    if (objectValue !== '@id' && objectValue !== '@vocab'
                                        && (objectValue[0] === '_' || !ContextParser.isValidIri(objectValue))) {
                                        throw new Error(`A context @type must be an absolute IRI, found: '${key}': '${objectValue}'`);
                                    }
                                    break;
                                case '@reverse':
                                    if (typeof objectValue === 'string' && value['@id'] && value['@id'] !== objectValue) {
                                        throw new Error(`Found non-matching @id and @reverse term values in '${key}':\
'${objectValue}' and '${value['@id']}'`);
                                    }
                                    break;
                                case '@container':
                                    if (objectValue === '@list' && value['@reverse']) {
                                        throw new Error(`Term value can not be @container: @list and @reverse at the same time on '${key}'`);
                                    }
                                    if (ContextParser.CONTAINERS.indexOf(objectValue) < 0) {
                                        throw new Error(`Invalid term @container for '${key}' ('${objectValue}'), \
must be one of ${ContextParser.CONTAINERS.join(', ')}`);
                                    }
                                    break;
                                case '@language':
                                    if (objectValue !== null && typeof objectValue !== 'string') {
                                        throw new Error(`Found an invalid term @language string in: '${key}': '${JSON.stringify(value)}'`);
                                    }
                                    break;
                            }
                        }
                        break;
                    default:
                        throw new Error(`Found an invalid term value: '${key}': '${value}'`);
                }
            }
        }
    }
    /**
     * Parse a JSON-LD context in any form.
     * @param {JsonLdContext} context A context, URL to a context, or an array of contexts/URLs.
     * @param {IParseOptions} options Optional parsing options.
     * @return {Promise<IJsonLdContextNormalized>} A promise resolving to the context.
     */
    parse(context, { baseIri, parentContext, external } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context === null || context === undefined) {
                // Context that are explicitly set to null are empty.
                return baseIri ? { '@base': baseIri } : {};
            }
            else if (typeof context === 'string') {
                // Resolve relative context URIs
                if (!ContextParser.isValidIri(context)) {
                    context = relative_to_absolute_iri_1.resolve(context, baseIri);
                    if (!ContextParser.isValidIri(context)) {
                        throw new Error(`Invalid context IRI: ${context}`);
                    }
                }
                return this.parse(yield this.load(context), { baseIri, parentContext, external: true });
            }
            else if (Array.isArray(context)) {
                // As a performance consideration, first load all external contexts in parallel.
                const contexts = yield Promise.all(context.map((subContext) => {
                    if (typeof subContext === 'string') {
                        return this.load(subContext);
                    }
                    else {
                        return subContext;
                    }
                }));
                return contexts.reduce((accContextPromise, contextEntry) => accContextPromise
                    .then((accContext) => this.parse(contextEntry, { baseIri, parentContext: accContext, external })), Promise.resolve(parentContext));
            }
            else if (typeof context === 'object') {
                if (context['@context']) {
                    return yield this.parse(context['@context'], { baseIri, parentContext, external });
                }
                // We have an actual context object.
                let newContext = {};
                // According to the JSON-LD spec, @base must be ignored from external contexts.
                if (external) {
                    delete context['@base'];
                }
                // Override the base IRI if provided.
                if (baseIri && !('@base' in newContext)) {
                    newContext['@base'] = baseIri;
                }
                newContext = Object.assign({}, newContext, parentContext, context);
                ContextParser.idifyReverseTerms(newContext);
                ContextParser.expandPrefixedTerms(newContext, this.expandContentTypeToBase);
                if (this.validate) {
                    ContextParser.validate(newContext);
                }
                return newContext;
            }
            else {
                throw new Error(`Tried parsing a context that is not a string, array or object, but got ${context}`);
            }
        });
    }
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = this.documentCache[url];
            if (cached) {
                return Array.isArray(cached) ? cached.slice() : Object.assign({}, cached);
            }
            return this.documentCache[url] = (yield this.documentLoader.load(url))['@context'];
        });
    }
}
// Regex for valid IRIs
ContextParser.IRI_REGEX = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^ "<>{}|\\^~\[\]`]*$/;
// Keys in the contexts that will not be expanded based on the base IRI
ContextParser.EXPAND_KEYS_BLACKLIST = [
    '@base',
    '@vocab',
    '@language',
];
// Keys in the contexts that may not be aliased
ContextParser.ALIAS_KEYS_BLACKLIST = [
    '@container',
    '@graph',
    '@id',
    '@index',
    '@list',
    '@nest',
    '@none',
    '@prefix',
    '@reverse',
    '@set',
    '@type',
    '@value',
];
// All valid @container values
ContextParser.CONTAINERS = [
    '@list',
    '@set',
    '@index',
    '@language',
];
exports.ContextParser = ContextParser;
//# sourceMappingURL=ContextParser.js.map

/***/ }),

/***/ "./node_modules/jsonld-context-parser/lib/FetchDocumentLoader.js":
/*!***********************************************************************!*\
  !*** ./node_modules/jsonld-context-parser/lib/FetchDocumentLoader.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/**
 * Loads documents via the fetch API.
 */
class FetchDocumentLoader {
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, { headers: { accept: 'application/ld+json' } });
            if (response.ok) {
                return (yield response.json());
            }
            else {
                throw new Error(`No valid context was found at ${url}: ${response.statusText}`);
            }
        });
    }
}
exports.FetchDocumentLoader = FetchDocumentLoader;
//# sourceMappingURL=FetchDocumentLoader.js.map

/***/ }),

/***/ "./node_modules/ldflex-comunica/lib/ComunicaEngine.js":
/*!************************************************************!*\
  !*** ./node_modules/ldflex-comunica/lib/ComunicaEngine.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const DefaultEngine = __webpack_require__(/*! ../lib/comunica-engine */ "./node_modules/ldflex-comunica/lib/comunica-engine.js");
/**
 * Asynchronous iterator wrapper for the Comunica SPARQL query engine.
 */


class ComunicaEngine {
  /**
   * Create a ComunicaEngine to query the given subject.
   *
   * The source can be a single URL, an RDF/JS Datasource,
   * or an array with any of these.
   * If undefined, it defaults to dereferencing the subject.
   */
  constructor(subject, source) {
    this._subject = subject;
    this._source = source;
    this._engine = DefaultEngine;
  }
  /**
   * Creates an asynchronous iterable
   * of results for the given SPARQL query.
   */


  execute(sparql) {
    // Comunica does not support SPARQL UPDATE queries yet,
    // so we temporarily throw an error for them.
    if (sparql.startsWith('INSERT') || sparql.startsWith('DELETE')) return this.executeUpdate(sparql); // Create an iterator function that reads the next binding

    let bindings;

    const next = async () => {
      if (!bindings) {
        // If no source was chosen, dereference the subject
        const source = (await this._source) || this.getDocument((await this._subject)); // Create Comunica sources for every source entry

        const sources = (Array.isArray(source) ? await Promise.all(source) : [source]).map(value => ({
          type: typeof value === 'string' ? 'file' : 'rdfjsSource',
          value
        })); // Execute the query and retrieve the bindings

        const queryResult = await this._engine.query(sparql, {
          sources
        });
        bindings = queryResult.bindingsStream;
      }

      return new Promise(readNextBinding);
    };

    return {
      next,

      [Symbol.asyncIterator]() {
        return this;
      }

    }; // Reads the next binding

    function readNextBinding(resolve) {
      const done = () => resolve({
        done: true
      }); // Mark the iterator as done when the source has ended


      if (bindings.ended) {
        done();
      } else {
        // Wait for either the data or the end event
        bindings.once('data', data => {
          resolve({
            value: data
          });
          bindings.removeListener('end', done);
        });
        bindings.on('end', done);
      }
    }
  }
  /**
   * Throws an error for update queries.
   */


  executeUpdate(sparql) {
    throw new Error(`Comunica does not support SPARQL UPDATE queries, received: ${sparql}`);
  }

  getDocument(subject) {
    return subject.value.replace(/#.*/, '');
  }

}

exports.default = ComunicaEngine;

/***/ }),

/***/ "./node_modules/ldflex-comunica/lib/comunica-engine.js":
/*!*************************************************************!*\
  !*** ./node_modules/ldflex-comunica/lib/comunica-engine.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/ldflex-comunica/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ldflex-comunica/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ComunicaEngine = _interopRequireDefault(__webpack_require__(/*! ./ComunicaEngine */ "./node_modules/ldflex-comunica/lib/ComunicaEngine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ComunicaEngine.default;
exports.default = _default;

/***/ }),

/***/ "./node_modules/ldflex/lib/DataHandler.js":
/*!************************************************!*\
  !*** ./node_modules/ldflex/lib/DataHandler.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Resolves to the given item in the path data.
 * For example, new DataHandler({}, 'foo', 'bar')
 * will return pathData.foo.bar.
 *
 * Resolution can optionally be async,
 * and/or be behind a function call.
 */
class DataHandler {
  constructor(options, ...dataProperties) {
    this._isAsync = options.async;
    this._isFunction = options.function;
    this._dataProperties = dataProperties;
  }

  static sync(...dataProperties) {
    return new DataHandler({
      async: false
    }, ...dataProperties);
  }

  static syncFunction(...dataProperties) {
    return new DataHandler({
      async: false,
      function: true
    }, ...dataProperties);
  }

  static async(...dataProperties) {
    return new DataHandler({
      async: true
    }, ...dataProperties);
  }

  static asyncFunction(...dataProperties) {
    return new DataHandler({
      async: true,
      function: true
    }, ...dataProperties);
  }
  /**
   * Resolve the data path.
   */


  handle(pathData) {
    return !this._isFunction ? this._resolveDataPath(pathData) : () => this._resolveDataPath(pathData);
  }

  _resolveDataPath(data) {
    // Resolve synchronous property access
    if (!this._isAsync) {
      for (const property of this._dataProperties) data = data && data[property];

      return data;
    } // Resolve asynchronous property access


    return new Promise(async resolve => {
      for (const property of this._dataProperties) data = data && (await data[property]);

      resolve(data);
    });
  }

}

exports.default = DataHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/DeleteFunctionHandler.js":
/*!**********************************************************!*\
  !*** ./node_modules/ldflex/lib/DeleteFunctionHandler.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MutationFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./MutationFunctionHandler */ "./node_modules/ldflex/lib/MutationFunctionHandler.js"));

/**
 * A MutationFunctionHandler for deletions.
 */
class DeleteFunctionHandler extends _MutationFunctionHandler.default {
  constructor() {
    super('DELETE', true);
  }

}

exports.default = DeleteFunctionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/ExecuteQueryHandler.js":
/*!********************************************************!*\
  !*** ./node_modules/ldflex/lib/ExecuteQueryHandler.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awaitAsyncGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/awaitAsyncGenerator */ "./node_modules/@babel/runtime/helpers/awaitAsyncGenerator.js"));

var _wrapAsyncGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapAsyncGenerator */ "./node_modules/@babel/runtime/helpers/wrapAsyncGenerator.js"));

var _asyncIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncIterator */ "./node_modules/@babel/runtime/helpers/asyncIterator.js"));

/**
 * Executes the query represented by a path.
 *
 * Requires:
 * - a queryEngine property in the path settings
 * - a sparql property on the path proxy
 */
class ExecuteQueryHandler {
  handle(pathData, path) {
    var _this = this;

    return (0, _wrapAsyncGenerator2.default)(function* () {
      // Retrieve the query engine and query
      const {
        queryEngine
      } = pathData.settings;
      if (!queryEngine) throw new Error(`${pathData} has no queryEngine setting`);
      const query = yield (0, _awaitAsyncGenerator2.default)(path.sparql);
      if (!query) throw new Error(`${pathData} has no sparql property`); // Extract the term from every query result

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = (0, _asyncIterator2.default)(queryEngine.execute(query)), _step, _value; _step = yield (0, _awaitAsyncGenerator2.default)(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield (0, _awaitAsyncGenerator2.default)(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
          const bindings = _value;
          yield _this.extractTerm(bindings, pathData);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            yield (0, _awaitAsyncGenerator2.default)(_iterator.return());
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    })();
  }
  /**
   * Extracts the first term from a query result binding as a new path.
   */


  extractTerm(binding, pathData) {
    // Extract the first term from the binding map
    if (binding.size !== 1) throw new Error('Only single-variable queries are supported');
    const term = binding.values().next().value; // Each result is a new path that starts from the given term as subject

    return pathData.extendPath({
      subject: term
    }, null);
  }

}

exports.default = ExecuteQueryHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/InsertFunctionHandler.js":
/*!**********************************************************!*\
  !*** ./node_modules/ldflex/lib/InsertFunctionHandler.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MutationFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./MutationFunctionHandler */ "./node_modules/ldflex/lib/MutationFunctionHandler.js"));

/**
 * A MutationFunctionHandler for insertions.
 */
class InsertFunctionHandler extends _MutationFunctionHandler.default {
  constructor() {
    super('INSERT', false);
  }

}

exports.default = InsertFunctionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/JSONLDResolver.js":
/*!***************************************************!*\
  !*** ./node_modules/ldflex/lib/JSONLDResolver.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonldContextParser = __webpack_require__(/*! jsonld-context-parser */ "./node_modules/jsonld-context-parser/index.js");

var _dataModel = __webpack_require__(/*! @rdfjs/data-model */ "./node_modules/@rdfjs/data-model/index.js");

var _promiseUtils = __webpack_require__(/*! ./promiseUtils */ "./node_modules/ldflex/lib/promiseUtils.js");

/**
 * Resolves property names of a path
 * to their corresponding IRIs through a JSON-LD context.
 */
class JSONLDResolver {
  constructor(context) {
    this._context = new _jsonldContextParser.ContextParser().parse(context);
  }
  /**
   * The JSON-LD resolver supports all string properties.
   */


  supports(property) {
    return typeof property === 'string';
  }
  /**
   * Resolves the property by extending the query path with it.
   */


  resolve(property, pathData) {
    const predicate = {
      then: (0, _promiseUtils.getThen)(() => this.expandProperty(property))
    };
    return pathData.extendPath({
      property,
      predicate
    });
  }
  /**
   * Expands a JSON property key into a full IRI.
   */


  async expandProperty(property) {
    // JavaScript requires keys containing colons to be quoted,
    // so prefixed names would need to written as path['foaf:knows'].
    // We thus allow writing path.foaf_knows or path.foaf$knows instead.
    property = property.replace(/[_$]/, ':'); // Expand the property to a full IRI

    const expandedProperty = _jsonldContextParser.ContextParser.expandTerm(property, (await this._context), true);

    if (!_jsonldContextParser.ContextParser.isValidIri(expandedProperty)) throw new Error(`The JSON-LD context cannot expand the '${property}' property`);
    return (0, _dataModel.namedNode)(expandedProperty);
  }

}

exports.default = JSONLDResolver;

/***/ }),

/***/ "./node_modules/ldflex/lib/MutationExpressionsHandler.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldflex/lib/MutationExpressionsHandler.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Traverses a path to collect mutationExpressions into an expression.
 * This is needed because mutations can be chained.
 *
 * Requires:
 * - a mutationExpressions property on the path proxy
 */
class MutationExpressionsHandler {
  async handle(pathData) {
    const mutationExpressions = []; // Add all mutationExpressions to the path

    let current = pathData;

    while (current) {
      // Obtain and store mutationExpressions
      if (current.mutationExpressions) mutationExpressions.unshift(...(await current.mutationExpressions)); // Move to parent link

      current = current.parent;
    }

    return mutationExpressions;
  }

}

exports.default = MutationExpressionsHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/MutationFunctionHandler.js":
/*!************************************************************!*\
  !*** ./node_modules/ldflex/lib/MutationFunctionHandler.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataModel = __webpack_require__(/*! @rdfjs/data-model */ "./node_modules/@rdfjs/data-model/index.js");

var _promiseUtils = __webpack_require__(/*! ./promiseUtils */ "./node_modules/ldflex/lib/promiseUtils.js");

/**
 * Returns a function that, when called with arguments,
 * extends the path with mutationExpressions.
 *
 * It uses the current path expression as domain expression
 * and the given arguments as range expression.
 * These arguments can either be raw, or other path expressions.
 *
 * Requires:
 * - a pathExpression property on the path proxy and all non-raw arguments.
 */
class MutationFunctionHandler {
  constructor(mutationType, allowZeroArgs) {
    this._mutationType = mutationType;
    this._allowZeroArgs = allowZeroArgs;
  }

  handle(pathData, path) {
    return (...args) => {
      // Check if the given arguments are valid
      if (!this._allowZeroArgs && !args.length) throw new Error(`Mutation on ${pathData} can not be invoked without arguments`); // Create a lazy Promise to the mutation expressions

      const then = (0, _promiseUtils.getThen)(() => this.createMutationExpressions(pathData, path, args));
      return pathData.extendPath({
        mutationExpressions: {
          then
        }
      });
    };
  }

  async createMutationExpressions(pathData, path, args) {
    // Check if we have a valid path
    const domainExpression = await path.pathExpression;
    if (!Array.isArray(domainExpression)) throw new Error(`${pathData} has no pathExpression property`); // Require at least a subject and a link

    if (domainExpression.length < 2) throw new Error(`${pathData} should at least contain a subject and a predicate`); // If we have args, each arg defines a mutation expression with a certain range expression.

    if (args.length) {
      // The last path segment represents the predicate of the triple to insert
      const {
        predicate
      } = domainExpression.pop();
      if (!predicate) throw new Error(`Expected predicate in ${pathData}`); // Determine right variables and patterns

      const mutationExpressions = [];

      for (let argument of args) {
        // If an argument does not expose a pathExpression, we consider it a raw value.
        let rangeExpression = await argument.pathExpression;

        if (!Array.isArray(rangeExpression)) {
          // If the argument is not an RDFJS term, assume it is a literal
          if (!argument.termType) argument = (0, _dataModel.literal)(argument);
          rangeExpression = [{
            subject: argument
          }];
        } // Store the domain, predicate and range in the insert expression.


        mutationExpressions.push({
          mutationType: this._mutationType,
          domainExpression,
          predicate,
          rangeExpression
        });
      }

      return mutationExpressions;
    } // If we don't have args, the range simply corresponds to the domain,
    // so we don't store the range and predicate explicitly.


    return [{
      mutationType: this._mutationType,
      domainExpression
    }];
  }

}

exports.default = MutationFunctionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/PathExpressionHandler.js":
/*!**********************************************************!*\
  !*** ./node_modules/ldflex/lib/PathExpressionHandler.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Traverses a path to collect links and nodes into an expression.
 */
class PathExpressionHandler {
  async handle(pathData) {
    const segments = [];
    let current = pathData; // Add all predicates to the path

    while (current.parent) {
      // Obtain and store predicate
      if (current.predicate) {
        const predicate = await current.predicate;
        segments.unshift({
          predicate
        });
      } // Move to parent link


      current = current.parent;
    } // Add the root subject to the path


    if (!current.subject) throw new Error(`Expected root subject in ${current}`);
    const subject = await current.subject;
    segments.unshift({
      subject
    });
    return segments;
  }

}

exports.default = PathExpressionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/PathFactory.js":
/*!************************************************!*\
  !*** ./node_modules/ldflex/lib/PathFactory.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHandler = toHandler;
exports.toResolver = toResolver;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js"));

var _PathProxy = _interopRequireDefault(__webpack_require__(/*! ./PathProxy */ "./node_modules/ldflex/lib/PathProxy.js"));

var _JSONLDResolver = _interopRequireDefault(__webpack_require__(/*! ./JSONLDResolver */ "./node_modules/ldflex/lib/JSONLDResolver.js"));

var _defaultHandlers = _interopRequireDefault(__webpack_require__(/*! ./defaultHandlers */ "./node_modules/ldflex/lib/defaultHandlers.js"));

/**
 * A PathFactory creates paths with default settings.
 */
class PathFactory {
  constructor(settings, data) {
    // Store settings and data
    this._settings = settings = (0, _objectSpread2.default)({}, settings);
    this._data = data = (0, _objectSpread2.default)({}, data); // Prepare the handlers

    const handlers = settings.handlers || _defaultHandlers.default;

    for (const key in handlers) handlers[key] = toHandler(handlers[key]);

    for (const key of Object.getOwnPropertySymbols(handlers)) handlers[key] = toHandler(handlers[key]); // Prepare the resolvers


    const resolvers = (settings.resolvers || []).map(toResolver);
    if (settings.context) resolvers.push(new _JSONLDResolver.default(settings.context)); // Instantiate PathProxy that will create the paths

    this._pathProxy = new _PathProxy.default({
      handlers,
      resolvers
    }); // Remove PathProxy settings from the settings object

    delete settings.handlers;
    delete settings.resolvers;
    delete settings.context;
  }
  /**
   * Creates a path with the given (optional) settings and data.
   */


  create(settings = {}, data) {
    // The settings parameter is optional
    if (!data) [data, settings] = [settings, null]; // Apply defaults on settings and data

    return this._pathProxy.createPath(Object.assign(Object.create(null), this._settings, settings), Object.assign(Object.create(null), this._data, data));
  }

}

exports.default = PathFactory;
PathFactory.defaultHandlers = _defaultHandlers.default;
/**
 * Converts a handler function into a handler object.
 */

function toHandler(handle) {
  return typeof handle.handle === 'function' ? handle : {
    handle
  };
}
/**
 * Converts a resolver function into a catch-all resolver object.
 */


function toResolver(resolve) {
  return typeof resolve.resolve === 'function' ? resolve : {
    supports,
    resolve
  };
} // Catch-all resolvers support everything


function supports() {
  return true;
}

/***/ }),

/***/ "./node_modules/ldflex/lib/PathProxy.js":
/*!**********************************************!*\
  !*** ./node_modules/ldflex/lib/PathProxy.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js"));

const EMPTY = Object.create(null);
/**
 * A PathProxy creates path expressions,
 * to which functionality can be attached.
 *
 * To users, these paths act as regular JavaScript objects
 * (such as `path.foo.bar.prop`) thanks to Proxy.
 * Behind the scenes, they carry around internal data
 * that can be used to influence their functionality.
 *
 * A path's functionality is realized by:
 * - handlers, which handle a specific named property
 * - resolvers, which can handle arbitrary properties
 * Only handlers and resolvers see the internal data.
 *
 * A path can have arbitrary internal data fields, but these are reserved:
 * - settings, an object that is passed on as-is to child paths
 * - proxy, a reference to the proxied object the user sees
 * - parent, a reference to the parent path
 * - extendPath, a method to create a child path with this path as parent
 */

class PathProxy {
  constructor({
    handlers = EMPTY,
    resolvers = []
  } = {}) {
    this._handlers = handlers;
    this._resolvers = resolvers;
  }
  /**
   * Creates a path Proxy with the given settings and internal data fields.
   */


  createPath(settings = {}, data) {
    // The settings parameter is optional
    if (data === undefined) [data, settings] = [settings, {}]; // Create the path's internal data object and the proxy that wraps it

    const path = (0, _objectSpread2.default)({
      settings
    }, data);
    const proxy = path.proxy = new Proxy(path, this); // Add an extendPath method to create child paths

    if (!path.extendPath) {
      const pathProxy = this;

      path.extendPath = function extendPath(newData, parent = this) {
        return pathProxy.createPath(settings, (0, _objectSpread2.default)({
          parent,
          extendPath
        }, newData));
      };
    } // Return the proxied path


    return proxy;
  }
  /**
   * Handles access to a property
   */


  get(pathData, property) {
    // Handlers provide functionality for a specific property,
    // so check if we find a handler first
    const handler = this._handlers[property];
    if (handler && typeof handler.handle === 'function') return handler.handle(pathData, pathData.proxy); // Resolvers provide functionality for arbitrary properties,
    // so find a resolver that can handle this property

    for (const resolver of this._resolvers) {
      if (resolver.supports(property)) return resolver.resolve(property, pathData, pathData.proxy);
    } // Otherwise, the property does not exist


    return undefined;
  }

}

exports.default = PathProxy;

/***/ }),

/***/ "./node_modules/ldflex/lib/ReplaceFunctionHandler.js":
/*!***********************************************************!*\
  !*** ./node_modules/ldflex/lib/ReplaceFunctionHandler.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Returns a function that deletes the given value
 * for the path, and then adds the given values to the path.
 *
 * Requires:
 * - a delete function on the path proxy.
 * - an add function on the path proxy.
 */
class ReplaceFunctionHandler {
  handle(pathData, path) {
    return function (oldValue, ...newValues) {
      if (!oldValue || !newValues.length) throw new Error('Replacing values requires at least two arguments, old value followed by all new values');
      return path.delete(oldValue).add(...newValues);
    };
  }

}

exports.default = ReplaceFunctionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/SetFunctionHandler.js":
/*!*******************************************************!*\
  !*** ./node_modules/ldflex/lib/SetFunctionHandler.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Returns a function that deletes all existing values
 * for the path, and then adds the given values to the path.
 *
 * Requires:
 * - a delete function on the path proxy.
 * - an add function on the path proxy.
 */
class SetFunctionHandler {
  handle(pathData, path) {
    return (...args) => path.delete().add(...args);
  }

}

exports.default = SetFunctionHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/SparqlHandler.js":
/*!**************************************************!*\
  !*** ./node_modules/ldflex/lib/SparqlHandler.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Expresses a path or mutation as a SPARQL query.
 *
 * Requires:
 * - a mutationExpressions or pathExpression property on the path proxy
 */
class SparqlHandler {
  async handle(pathData, path) {
    // First check if we have a mutation expression
    const mutationExpressions = await path.mutationExpressions;
    if (Array.isArray(mutationExpressions) && mutationExpressions.length) return this.evaluateMutationExpression(pathData, path, mutationExpressions); // Otherwise, fall back to checking for a path expression

    const pathExpression = await path.pathExpression;
    if (!Array.isArray(pathExpression)) throw new Error(`${pathData} has no pathExpression property`);
    return this.evaluatePathExpression(pathData, path, pathExpression);
  }

  evaluatePathExpression(pathData, path, pathExpression) {
    // Require at least a subject and a link
    if (pathExpression.length < 2) throw new Error(`${pathData} should at least contain a subject and a predicate`); // Determine the query variable name

    const queryVar = pathData.property.match(/[a-z0-9]*$/i)[0] || 'result'; // Build basic graph pattern

    const clauses = this.expressionToTriplePatterns(pathExpression, queryVar); // Embed the basic graph pattern into a SPARQL query

    const joinedClauses = clauses.join('\n  ');
    return `SELECT ?${queryVar} WHERE {\n  ${joinedClauses}\n}`;
  }

  evaluateMutationExpression(pathData, path, mutationExpressions) {
    return mutationExpressions.map(mutationExpression => this.mutationExpressionToQuery(mutationExpression)).join('\n;\n');
  }

  expressionToTriplePatterns([root, ...pathExpression], queryVar, variableScope = {}) {
    const last = pathExpression.length - 1;
    let object = this.termToQueryString(root.subject);
    return pathExpression.map((segment, index) => {
      // Obtain triple pattern components
      const subject = object;
      const {
        predicate
      } = segment;
      object = index !== last ? `?${this.getQueryVar(`v${index}`, variableScope)}` : `?${queryVar}`; // Generate triple pattern

      return `${subject} ${this.termToQueryString(predicate)} ${object}.`;
    });
  }

  mutationExpressionToQuery({
    mutationType,
    domainExpression,
    predicate,
    rangeExpression
  }) {
    // Determine the patterns that should appear in the WHERE clause
    const variableScope = {};
    let clauses = [];
    let insertPattern;
    const {
      queryVar: domainQueryVar,
      clauses: domainClauses
    } = this.getQueryVarAndClauses(domainExpression, variableScope);
    if (domainClauses.length) clauses = domainClauses;

    if (rangeExpression) {
      const {
        queryVar: rangeQueryVar,
        clauses: rangeClauses
      } = this.getQueryVarAndClauses(rangeExpression, variableScope);

      if (rangeClauses.length) {
        if (clauses.length) clauses = clauses.concat(rangeClauses);else clauses = rangeClauses;
      } // If we have a range, the mutation is on <domainVar> <predicate> <rangeVar>


      insertPattern = `${domainQueryVar} ${this.termToQueryString(predicate)} ${rangeQueryVar}`;
    } else {
      // If we don't have a range, assume that the mutation is on the last segment of the domain
      insertPattern = domainClauses[domainClauses.length - 1].slice(0, -1);
    } // If we don't have any WHERE clauses, we just insert raw data


    if (!clauses.length) return `${mutationType} DATA {\n  ${insertPattern}\n}`; // Otherwise, return an INSERT ... WHERE ... query

    return `${mutationType} {\n  ${insertPattern}\n} WHERE {\n  ${clauses.join('\n  ')}\n}`;
  }

  getQueryVarAndClauses(expression, variableScope) {
    const lastSegment = expression[expression.length - 1];

    if (expression.length === 1) {
      return {
        queryVar: this.termToQueryString(lastSegment.subject),
        clauses: []
      };
    }

    const queryVar = this.getQueryVar(lastSegment.predicate.value.match(/[a-z0-9]*$/i)[0] || 'result', variableScope);
    return {
      queryVar: `?${queryVar}`,
      clauses: this.expressionToTriplePatterns(expression, queryVar, variableScope)
    };
  } // Creates a unique query variable label within the given scope based on the given suggestion


  getQueryVar(labelSuggestion, variableScope) {
    let label = labelSuggestion;
    let counter = 0;

    while (variableScope[label]) label = `${labelSuggestion}_${counter++}`;

    variableScope[label] = true;
    return label;
  } // Converts an RDFJS term to a string that we can use in a query


  termToQueryString(term) {
    switch (term.termType) {
      case 'NamedNode':
        return `<${term.value}>`;

      case 'BlankNode':
        return `_:${term.value}`;

      case 'Literal':
        return `"${term.value.replace(/"/g, '\\"')}"`;

      default:
        throw new Error(`Could not convert a term of type ${term.termType}`);
    }
  }

}

exports.default = SparqlHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/StringToLDflexHandler.js":
/*!**********************************************************!*\
  !*** ./node_modules/ldflex/lib/StringToLDflexHandler.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Yields a function that interprets a string expression as an LDflex path.
 */
class StringToLDflexHandler {
  handle(pathData, path) {
    // Resolves the given string expression against the LDflex object
    return (expression = '', ldflex = path) => {
      // An expression starts with a property access in dot or bracket notation
      const propertyPath = expression // Add the starting dot if omitted
      .replace(/^(?=[a-z$_])/i, '.') // Add quotes inside of brackets if omitted
      .replace(/\[([^'"`\](]*)\]/g, '["$1"]'); // Create a function to evaluate the expression

      const body = `"use strict";return ldflex${propertyPath}`;
      let evaluator;

      try {
        /* eslint no-new-func: off */
        evaluator = Function('ldflex', body);
      } catch ({
        message
      }) {
        throw new Error(`Expression "${expression}" is invalid: ${message}`);
      } // Evaluate the function


      return evaluator(ldflex);
    };
  }

}

exports.default = StringToLDflexHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/SubjectHandler.js":
/*!***************************************************!*\
  !*** ./node_modules/ldflex/lib/SubjectHandler.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Returns a new path starting from the subject of the current path.
 *
 * Requires:
 * - (optional) a subject property on the path proxy
 * - (optional) a parent property on the path proxy
 */
class SubjectHandler {
  handle(pathData) {
    // Traverse parents until we find a subject
    let {
      subject,
      parent
    } = pathData;

    while (!subject && parent) ({
      subject,
      parent
    } = parent); // Resolve the subject if it exists,
    // and return a path starting from that subject


    return !subject ? undefined : Promise.resolve(subject).then(value => pathData.extendPath({
      subject: value
    }, null));
  }

}

exports.default = SubjectHandler;

/***/ }),

/***/ "./node_modules/ldflex/lib/defaultHandlers.js":
/*!****************************************************!*\
  !*** ./node_modules/ldflex/lib/defaultHandlers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataHandler = _interopRequireDefault(__webpack_require__(/*! ./DataHandler */ "./node_modules/ldflex/lib/DataHandler.js"));

var _SubjectHandler = _interopRequireDefault(__webpack_require__(/*! ./SubjectHandler */ "./node_modules/ldflex/lib/SubjectHandler.js"));

var _PathExpressionHandler = _interopRequireDefault(__webpack_require__(/*! ./PathExpressionHandler */ "./node_modules/ldflex/lib/PathExpressionHandler.js"));

var _SparqlHandler = _interopRequireDefault(__webpack_require__(/*! ./SparqlHandler */ "./node_modules/ldflex/lib/SparqlHandler.js"));

var _ExecuteQueryHandler = _interopRequireDefault(__webpack_require__(/*! ./ExecuteQueryHandler */ "./node_modules/ldflex/lib/ExecuteQueryHandler.js"));

var _MutationExpressionsHandler = _interopRequireDefault(__webpack_require__(/*! ./MutationExpressionsHandler */ "./node_modules/ldflex/lib/MutationExpressionsHandler.js"));

var _InsertFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./InsertFunctionHandler */ "./node_modules/ldflex/lib/InsertFunctionHandler.js"));

var _SetFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./SetFunctionHandler */ "./node_modules/ldflex/lib/SetFunctionHandler.js"));

var _ReplaceFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./ReplaceFunctionHandler */ "./node_modules/ldflex/lib/ReplaceFunctionHandler.js"));

var _DeleteFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./DeleteFunctionHandler */ "./node_modules/ldflex/lib/DeleteFunctionHandler.js"));

var _StringToLDflexHandler = _interopRequireDefault(__webpack_require__(/*! ./StringToLDflexHandler */ "./node_modules/ldflex/lib/StringToLDflexHandler.js"));

var _iterableUtils = __webpack_require__(/*! ./iterableUtils */ "./node_modules/ldflex/lib/iterableUtils.js");

var _promiseUtils = __webpack_require__(/*! ./promiseUtils */ "./node_modules/ldflex/lib/promiseUtils.js");

/**
 * A map with default property handlers.
 */
var _default = {
  // Flag to loaders that exported paths are not ES6 modules
  __esModule: () => undefined,
  // Add Promise behavior
  then: ({
    subject
  }, pathProxy) => {
    // If a direct subject is set (zero-length path), resolve it
    if (subject) // If the subject is not a promise, it has already been resolved;
      // consumers should not await it, but access its properties directly.
      // This avoids infinite `then` chains when awaiting this path.
      return subject.then && (0, _promiseUtils.getThen)(() => pathProxy.subject); // Otherwise, return the first result of this path

    return (0, _promiseUtils.getThen)(() => (0, _iterableUtils.getFirstItem)(pathProxy.results));
  },
  // Add async iterable behavior
  [Symbol.asyncIterator]: ({
    subject
  }, pathProxy) => // Return a one-item iterator of the subject or,
  // if no subject is present, all results of this path
  () => subject ? (0, _iterableUtils.iteratorFor)(pathProxy.subject) : pathProxy.results[Symbol.asyncIterator](),
  // Add read and query functionality
  subject: new _SubjectHandler.default(),
  pathExpression: new _PathExpressionHandler.default(),
  sparql: new _SparqlHandler.default(),
  results: new _ExecuteQueryHandler.default(),
  // Add write functionality
  mutationExpressions: new _MutationExpressionsHandler.default(),
  add: new _InsertFunctionHandler.default(),
  set: new _SetFunctionHandler.default(),
  replace: new _ReplaceFunctionHandler.default(),
  delete: new _DeleteFunctionHandler.default(),
  // Add RDFJS term handling
  termType: _DataHandler.default.sync('subject', 'termType'),
  value: _DataHandler.default.sync('subject', 'value'),
  equals: _DataHandler.default.sync('subject', 'equals'),
  language: _DataHandler.default.sync('subject', 'language'),
  datatype: _DataHandler.default.sync('subject', 'datatype'),
  toString: _DataHandler.default.syncFunction('subject', 'value'),
  toPrimitive: _DataHandler.default.syncFunction('subject', 'value'),
  // Parse a string into an LDflex object
  resolve: new _StringToLDflexHandler.default()
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/ldflex/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/ldflex/lib/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataHandler", {
  enumerable: true,
  get: function () {
    return _DataHandler.default;
  }
});
Object.defineProperty(exports, "DeleteFunctionHandler", {
  enumerable: true,
  get: function () {
    return _DeleteFunctionHandler.default;
  }
});
Object.defineProperty(exports, "ExecuteQueryHandler", {
  enumerable: true,
  get: function () {
    return _ExecuteQueryHandler.default;
  }
});
Object.defineProperty(exports, "InsertFunctionHandler", {
  enumerable: true,
  get: function () {
    return _InsertFunctionHandler.default;
  }
});
Object.defineProperty(exports, "JSONLDResolver", {
  enumerable: true,
  get: function () {
    return _JSONLDResolver.default;
  }
});
Object.defineProperty(exports, "MutationExpressionsHandler", {
  enumerable: true,
  get: function () {
    return _MutationExpressionsHandler.default;
  }
});
Object.defineProperty(exports, "MutationFunctionHandler", {
  enumerable: true,
  get: function () {
    return _MutationFunctionHandler.default;
  }
});
Object.defineProperty(exports, "PathExpressionHandler", {
  enumerable: true,
  get: function () {
    return _PathExpressionHandler.default;
  }
});
Object.defineProperty(exports, "PathProxy", {
  enumerable: true,
  get: function () {
    return _PathProxy.default;
  }
});
Object.defineProperty(exports, "PathFactory", {
  enumerable: true,
  get: function () {
    return _PathFactory.default;
  }
});
Object.defineProperty(exports, "ReplaceFunctionHandler", {
  enumerable: true,
  get: function () {
    return _ReplaceFunctionHandler.default;
  }
});
Object.defineProperty(exports, "SetFunctionHandler", {
  enumerable: true,
  get: function () {
    return _SetFunctionHandler.default;
  }
});
Object.defineProperty(exports, "SparqlHandler", {
  enumerable: true,
  get: function () {
    return _SparqlHandler.default;
  }
});
Object.defineProperty(exports, "SubjectHandler", {
  enumerable: true,
  get: function () {
    return _SubjectHandler.default;
  }
});
Object.defineProperty(exports, "StringToLDflexHandler", {
  enumerable: true,
  get: function () {
    return _StringToLDflexHandler.default;
  }
});
Object.defineProperty(exports, "defaultHandlers", {
  enumerable: true,
  get: function () {
    return _defaultHandlers.default;
  }
});
Object.defineProperty(exports, "getFirstItem", {
  enumerable: true,
  get: function () {
    return _iterableUtils.getFirstItem;
  }
});
Object.defineProperty(exports, "iteratorFor", {
  enumerable: true,
  get: function () {
    return _iterableUtils.iteratorFor;
  }
});
Object.defineProperty(exports, "getThen", {
  enumerable: true,
  get: function () {
    return _promiseUtils.getThen;
  }
});
Object.defineProperty(exports, "toIterablePromise", {
  enumerable: true,
  get: function () {
    return _promiseUtils.toIterablePromise;
  }
});

var _DataHandler = _interopRequireDefault(__webpack_require__(/*! ./DataHandler */ "./node_modules/ldflex/lib/DataHandler.js"));

var _DeleteFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./DeleteFunctionHandler */ "./node_modules/ldflex/lib/DeleteFunctionHandler.js"));

var _ExecuteQueryHandler = _interopRequireDefault(__webpack_require__(/*! ./ExecuteQueryHandler */ "./node_modules/ldflex/lib/ExecuteQueryHandler.js"));

var _InsertFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./InsertFunctionHandler */ "./node_modules/ldflex/lib/InsertFunctionHandler.js"));

var _JSONLDResolver = _interopRequireDefault(__webpack_require__(/*! ./JSONLDResolver */ "./node_modules/ldflex/lib/JSONLDResolver.js"));

var _MutationExpressionsHandler = _interopRequireDefault(__webpack_require__(/*! ./MutationExpressionsHandler */ "./node_modules/ldflex/lib/MutationExpressionsHandler.js"));

var _MutationFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./MutationFunctionHandler */ "./node_modules/ldflex/lib/MutationFunctionHandler.js"));

var _PathExpressionHandler = _interopRequireDefault(__webpack_require__(/*! ./PathExpressionHandler */ "./node_modules/ldflex/lib/PathExpressionHandler.js"));

var _PathProxy = _interopRequireDefault(__webpack_require__(/*! ./PathProxy */ "./node_modules/ldflex/lib/PathProxy.js"));

var _PathFactory = _interopRequireDefault(__webpack_require__(/*! ./PathFactory */ "./node_modules/ldflex/lib/PathFactory.js"));

var _ReplaceFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./ReplaceFunctionHandler */ "./node_modules/ldflex/lib/ReplaceFunctionHandler.js"));

var _SetFunctionHandler = _interopRequireDefault(__webpack_require__(/*! ./SetFunctionHandler */ "./node_modules/ldflex/lib/SetFunctionHandler.js"));

var _SparqlHandler = _interopRequireDefault(__webpack_require__(/*! ./SparqlHandler */ "./node_modules/ldflex/lib/SparqlHandler.js"));

var _SubjectHandler = _interopRequireDefault(__webpack_require__(/*! ./SubjectHandler */ "./node_modules/ldflex/lib/SubjectHandler.js"));

var _StringToLDflexHandler = _interopRequireDefault(__webpack_require__(/*! ./StringToLDflexHandler */ "./node_modules/ldflex/lib/StringToLDflexHandler.js"));

var _defaultHandlers = _interopRequireDefault(__webpack_require__(/*! ./defaultHandlers */ "./node_modules/ldflex/lib/defaultHandlers.js"));

var _iterableUtils = __webpack_require__(/*! ./iterableUtils */ "./node_modules/ldflex/lib/iterableUtils.js");

var _promiseUtils = __webpack_require__(/*! ./promiseUtils */ "./node_modules/ldflex/lib/promiseUtils.js");

/***/ }),

/***/ "./node_modules/ldflex/lib/iterableUtils.js":
/*!**************************************************!*\
  !*** ./node_modules/ldflex/lib/iterableUtils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstItem = getFirstItem;
exports.iteratorFor = iteratorFor;
const done = {};
/**
 * Gets the first element of the iterable.
 */

function getFirstItem(iterable) {
  const iterator = iterable[Symbol.asyncIterator]();
  return iterator.next().then(item => item.value);
}
/**
 * Creates an async iterator with the item as only element.
 */


function iteratorFor(item) {
  return {
    async next() {
      if (item !== done) {
        const value = await item;
        item = done;
        return {
          value
        };
      }

      return {
        done: true
      };
    }

  };
}

/***/ }),

/***/ "./node_modules/ldflex/lib/promiseUtils.js":
/*!*************************************************!*\
  !*** ./node_modules/ldflex/lib/promiseUtils.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThen = getThen;
exports.toIterablePromise = toIterablePromise;
exports.memoizeIterable = memoizeIterable;

var _iterableUtils = __webpack_require__(/*! ./iterableUtils */ "./node_modules/ldflex/lib/iterableUtils.js");

/**
 * Lazily returns the `then` function of the created promise.
 */
function getThen(createPromise) {
  return (onResolved, onRejected) => createPromise().then(onResolved, onRejected);
}
/**
 * Returns an iterable that is also a promise to the first element.
 */


function toIterablePromise(iterable) {
  // If called with a generator function,
  // memoize it to enable multiple iterations
  if (typeof iterable === 'function') iterable = memoizeIterable(iterable()); // Return an object that is iterable and a promise

  return {
    [Symbol.asyncIterator]() {
      return iterable[Symbol.asyncIterator]();
    },

    get then() {
      return getThen(() => (0, _iterableUtils.getFirstItem)(this));
    },

    catch(onRejected) {
      return this.then(null, onRejected);
    },

    finally(callback) {
      return this.then().finally(callback);
    }

  };
}
/**
 * Returns a memoized version of the iterable
 * that can be iterated over as many times as needed.
 */


function memoizeIterable(iterable) {
  const cache = [];
  let iterator = iterable[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      let i = 0;
      return {
        async next() {
          // Return the item if it has been read already
          if (i < cache.length) return cache[i++]; // Stop if there are no more items

          if (!iterator) return {
            done: true
          }; // Read and cache an item from the iterable otherwise

          const item = cache[i++] = iterator.next();
          if ((await item).done) iterator = null;
          return item;
        }

      };
    }

  };
}

/***/ }),

/***/ "./node_modules/relative-to-absolute-iri/index.js":
/*!********************************************************!*\
  !*** ./node_modules/relative-to-absolute-iri/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/Resolve */ "./node_modules/relative-to-absolute-iri/lib/Resolve.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/relative-to-absolute-iri/lib/Resolve.js":
/*!**************************************************************!*\
  !*** ./node_modules/relative-to-absolute-iri/lib/Resolve.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert the given relative IRI to an absolute IRI
 * by taking into account the given optional baseIRI.
 *
 * @param {string} relativeIRI The relative IRI to convert to an absolute IRI.
 * @param {string} baseIRI The optional base IRI.
 * @return {string} an absolute IRI.
 */
function resolve(relativeIRI, baseIRI) {
    baseIRI = baseIRI || '';
    const baseFragmentPos = baseIRI.indexOf('#');
    // Ignore any fragments in the base IRI
    if (baseFragmentPos > 0) {
        baseIRI = baseIRI.substr(0, baseFragmentPos);
    }
    // Convert empty value directly to base IRI
    if (!relativeIRI.length) {
        return baseIRI;
    }
    // If the value starts with a query character, concat directly (but strip the existing query)
    if (relativeIRI.startsWith('?')) {
        const baseQueryPos = baseIRI.indexOf('?');
        if (baseQueryPos > 0) {
            baseIRI = baseIRI.substr(0, baseQueryPos);
        }
        return baseIRI + relativeIRI;
    }
    // If the value starts with a fragment character, concat directly
    if (relativeIRI.startsWith('#')) {
        return baseIRI + relativeIRI;
    }
    // Ignore baseIRI if it is empty
    if (!baseIRI.length) {
        return removeDotSegmentsOfPath(relativeIRI, relativeIRI.indexOf(':'));
    }
    // Ignore baseIRI if the value is absolute
    const valueColonPos = relativeIRI.indexOf(':');
    if (valueColonPos >= 0) {
        return removeDotSegmentsOfPath(relativeIRI, valueColonPos);
    }
    // At this point, the baseIRI MUST be absolute, otherwise we error
    const baseColonPos = baseIRI.indexOf(':');
    if (baseColonPos < 0) {
        throw new Error(`Found invalid baseIRI '${baseIRI}' for value '${relativeIRI}'`);
    }
    const baseIRIScheme = baseIRI.substr(0, baseColonPos + 1);
    // Inherit the baseIRI scheme if the value starts with '//'
    if (relativeIRI.indexOf('//') === 0) {
        return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
    }
    // Check cases where '://' occurs in the baseIRI, and where there is no '/' after a ':' anymore.
    let baseSlashAfterColonPos;
    if (baseIRI.indexOf('//', baseColonPos) === baseColonPos + 1) {
        // If there is no additional '/' after the '//'.
        baseSlashAfterColonPos = baseIRI.indexOf('/', baseColonPos + 3);
        if (baseSlashAfterColonPos < 0) {
            // If something other than a '/' follows the '://', append the value after a '/',
            // otherwise, prefix the value with only the baseIRI scheme.
            if (baseIRI.length > baseColonPos + 3) {
                return baseIRI + '/' + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
            }
            else {
                return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
            }
        }
    }
    else {
        // If there is not even a single '/' after the ':'
        baseSlashAfterColonPos = baseIRI.indexOf('/', baseColonPos + 1);
        // Always true: baseSlashAfterColonPos < 0
        // If something other than a '/' follows the ':', append the value after a '/',
        // otherwise, prefix the value with only the baseIRI scheme.
        if (baseIRI.length > baseColonPos + 1) {
            return baseIRI + '/' + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
        }
        else {
            return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
        }
    }
    // If the value starts with a '/', then prefix it with everything before the first effective slash of the base IRI.
    if (relativeIRI.indexOf('/') === 0) {
        return baseIRI.substr(0, baseSlashAfterColonPos) + removeDotSegments(relativeIRI);
    }
    let baseIRIPath = baseIRI.substr(baseSlashAfterColonPos);
    const baseIRILastSlashPos = baseIRIPath.lastIndexOf('/');
    // Ignore everything after the last '/' in the baseIRI path
    if (baseIRILastSlashPos >= 0 && baseIRILastSlashPos < baseIRIPath.length - 1) {
        baseIRIPath = baseIRIPath.substr(0, baseIRILastSlashPos + 1);
        // Also remove the first character of the relative path if it starts with '.' (and not '..' or './')
        // This change is only allowed if there is something else following the path
        if (relativeIRI[0] === '.' && relativeIRI[1] !== '.' && relativeIRI[1] !== '/' && relativeIRI[2]) {
            relativeIRI = relativeIRI.substr(1);
        }
    }
    // Prefix the value with the baseIRI path where
    relativeIRI = baseIRIPath + relativeIRI;
    // Remove dot segment from the IRI
    relativeIRI = removeDotSegments(relativeIRI);
    // Prefix our transformed value with the part of the baseIRI until the first '/' after the first ':'.
    return baseIRI.substr(0, baseSlashAfterColonPos) + relativeIRI;
}
exports.resolve = resolve;
/**
 * Remove dot segments from the given path,
 * as described in https://www.ietf.org/rfc/rfc3986.txt (page 32).
 * @param {string} path An IRI path.
 * @return {string} A path, will always start with a '/'.
 */
function removeDotSegments(path) {
    // Prepare a buffer with segments between each '/.
    // Each segment represents an array of characters.
    const segmentBuffers = [];
    let i = 0;
    while (i < path.length) {
        // Remove '/.' or '/..'
        switch (path[i]) {
            case '/':
                if (path[i + 1] === '.') {
                    if (path[i + 2] === '.') {
                        // Append the remaining path as-is if we find an invalid character after the '.'
                        if (!isCharacterAllowedAfterRelativePathSegment(path[i + 3])) {
                            segmentBuffers[segmentBuffers.length - 1].push(path.substr(i));
                            i = path.length;
                            break;
                        }
                        // Go to parent directory,
                        // so we remove a parent segment
                        segmentBuffers.pop();
                        // Ensure that we end with a slash if there is a trailing '/..'
                        if (!path[i + 3]) {
                            segmentBuffers.push([]);
                        }
                        i += 3;
                    }
                    else {
                        // Append the remaining path as-is if we find an invalid character after the '.'
                        if (!isCharacterAllowedAfterRelativePathSegment(path[i + 2])) {
                            segmentBuffers[segmentBuffers.length - 1].push(path.substr(i));
                            i = path.length;
                            break;
                        }
                        // Ensure that we end with a slash if there is a trailing '/.'
                        if (!path[i + 2]) {
                            segmentBuffers.push([]);
                        }
                        // Go to the current directory,
                        // so we do nothing
                        i += 2;
                    }
                }
                else {
                    // Start a new segment
                    segmentBuffers.push([]);
                    i++;
                }
                break;
            case '#':
            case '?':
                // Query and fragment string should be appended unchanged
                if (!segmentBuffers.length) {
                    segmentBuffers.push([]);
                }
                segmentBuffers[segmentBuffers.length - 1].push(path.substr(i));
                // Break the while loop
                i = path.length;
                break;
            default:
                // Not a special character, just append it to our buffer
                if (!segmentBuffers.length) {
                    segmentBuffers.push([]);
                }
                segmentBuffers[segmentBuffers.length - 1].push(path[i]);
                i++;
                break;
        }
    }
    return '/' + segmentBuffers.map((buffer) => buffer.join('')).join('/');
}
exports.removeDotSegments = removeDotSegments;
/**
 * Removes dot segments of the given IRI.
 * @param {string} iri An IRI (or part of IRI).
 * @param {number} colonPosition The position of the first ':' in the IRI.
 * @return {string} The IRI where dot segments were removed.
 */
function removeDotSegmentsOfPath(iri, colonPosition) {
    // Determine where we should start looking for the first '/' that indicates the start of the path
    let searchOffset = colonPosition + 1;
    if (colonPosition >= 0) {
        if (iri[colonPosition + 1] === '/' && iri[colonPosition + 2] === '/') {
            searchOffset = colonPosition + 3;
        }
    }
    else {
        if (iri[0] === '/' && iri[1] === '/') {
            searchOffset = 2;
        }
    }
    // Determine the path
    const pathSeparator = iri.indexOf('/', searchOffset);
    if (pathSeparator < 0) {
        return iri;
    }
    const base = iri.substr(0, pathSeparator);
    const path = iri.substr(pathSeparator);
    // Remove dot segments from the path
    return base + removeDotSegments(path);
}
exports.removeDotSegmentsOfPath = removeDotSegmentsOfPath;
function isCharacterAllowedAfterRelativePathSegment(character) {
    return !character || character === '#' || character === '?' || character === '/';
}
//# sourceMappingURL=Resolve.js.map

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),

/***/ "./src/ComunicaUpdateEngine.js":
/*!*************************************!*\
  !*** ./src/ComunicaUpdateEngine.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComunicaUpdateEngine; });
/* harmony import */ var ldflex_comunica__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ldflex-comunica */ "./node_modules/ldflex-comunica/lib/index.js");
/* harmony import */ var ldflex_comunica__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ldflex_comunica__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! solid-auth-client */ "solid-auth-client");
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(solid_auth_client__WEBPACK_IMPORTED_MODULE_1__);


/**
 * An extension of ComunicaEngine that delegates
 * SPARQL UPDATE queries directly to the documents
 * using authenticated request.
 */

class ComunicaUpdateEngine extends ldflex_comunica__WEBPACK_IMPORTED_MODULE_0___default.a {
  /**
   * Delegates SPARQL UPDATE queries directly to the document.
   */
  executeUpdate(sparql) {
    if (this._source) throw new Error('Updates on non-subject sources not yet supported.');
    let executed = false;

    const next = async () => {
      if (!executed) {
        executed = true; // Send authenticated PATCH request to the document

        const document = this.getDocument((await this._subject));
        const response = await solid_auth_client__WEBPACK_IMPORTED_MODULE_1___default.a.fetch(document, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/sparql-update'
          },
          body: sparql
        }); // Error if the server response was not ok

        if (!response.ok) throw new Error(`Update query failed (${response.status}): ${response.statusText}`); // Mock Comunica's response for bindings as a Immutable.js object.

        return {
          value: {
            size: 1,
            values: () => ({
              next: () => ({
                value: {
                  ok: true
                }
              })
            })
          }
        };
      }

      return {
        done: true
      };
    };

    return {
      next,

      [Symbol.asyncIterator]() {
        return this;
      }

    };
  }

}

/***/ }),

/***/ "./src/CreateActivityHandler.js":
/*!**************************************!*\
  !*** ./src/CreateActivityHandler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateActivityHandler; });
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! solid-auth-client */ "solid-auth-client");
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(solid_auth_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.json */ "./src/context.json");
var _context_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./context.json */ "./src/context.json", 1);
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ldflex */ "./node_modules/ldflex/lib/index.js");
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ldflex__WEBPACK_IMPORTED_MODULE_3__);
function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol === "function") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }






/* babel-plugin-inline-import './activity.ttl' */
const activityTemplate = "_:activity a _:type;\n    <https://www.w3.org/ns/activitystreams#actor> _:actor;\n    <https://www.w3.org/ns/activitystreams#object> _:object;\n    <https://www.w3.org/ns/activitystreams#published> _:published.\n";
const _context$Context = _context_json__WEBPACK_IMPORTED_MODULE_2__['@context'],
      as = _context$Context.as,
      xsd = _context$Context.xsd;
/**
 * Handler that creates an activity in the user's data pod
 * Requires:
 * - the `root.user` handler
 * - the `root[...]` resolver
 */

class CreateActivityHandler {
  constructor({
    type = `${as}#Like`,
    path = '/public/activities'
  } = {}) {
    this._type = type;
    this._path = path;
  }

  handle(path, proxy) {
    const self = this;
    const root = proxy.root;
    const user = root.user; // Return an iterator over the new activity URLs

    return () => Object(ldflex__WEBPACK_IMPORTED_MODULE_3__["toIterablePromise"])(
    /*#__PURE__*/
    _wrapAsyncGenerator(function* () {
      // Create an activity for each object on the path
      const activities = [];
      const inserts = [];
      const type = self._type;
      const actor = yield _awaitAsyncGenerator(user);
      const time = new Date().toISOString();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(proxy), _step, _value; _step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
          const object = _value;

          if (typeof object === 'string' || object.termType === 'NamedNode') {
            const id = `#${uuid_v4__WEBPACK_IMPORTED_MODULE_1___default()()}`;
            const props = {
              id,
              type,
              actor,
              object,
              time
            };
            activities.push(id);
            inserts.push(self._createActivity(props));
          }
        } // Send the activity as a patch

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            yield _awaitAsyncGenerator(_iterator.return());
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      const location = new URL(self._path, (yield _awaitAsyncGenerator(user.pim_storage)));
      yield _awaitAsyncGenerator(self._sendPatch(location, {
        insert: inserts.join('')
      })); // Return the URLs of the new activities

      for (const id of activities) yield root[new URL(id, location)];
    }));
  } // Creates a Turtle snippet representing the activity


  _createActivity({
    id,
    type,
    actor,
    object,
    time
  }) {
    return activityTemplate.replace(/_:activity/, `<${id}>`).replace(/_:type/, `<${type}>`).replace(/_:actor/g, `<${actor}>`).replace(/_:object/g, `<${object}>`).replace(/_:published/g, `"${time}"^^<${xsd}dateTime>`);
  } // Sends a PATCH request to create the activity


  _sendPatch(resource, {
    insert
  }) {
    const patch = `INSERT {\n${insert}\n}`;
    return solid_auth_client__WEBPACK_IMPORTED_MODULE_0___default.a.fetch(resource, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/sparql-update'
      },
      body: patch
    });
  }

}

/***/ }),

/***/ "./src/SourcePathHandler.js":
/*!**********************************!*\
  !*** ./src/SourcePathHandler.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SourcePathHandler; });
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ldflex */ "./node_modules/ldflex/lib/index.js");
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ldflex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubjectPathResolver */ "./src/SubjectPathResolver.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SourcePathHandler {
  constructor(pathFactory) {
    this._paths = pathFactory;
  }

  handle() {
    return source => this._createSourcePathFactory(source);
  }

  _createSourcePathFactory(source) {
    return new ldflex__WEBPACK_IMPORTED_MODULE_0__["PathFactory"]({
      handlers: _objectSpread({}, ldflex__WEBPACK_IMPORTED_MODULE_0__["defaultHandlers"]),
      resolvers: [new _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this._paths, source)]
    }).create();
  }

}

/***/ }),

/***/ "./src/SubjectPathResolver.js":
/*!************************************!*\
  !*** ./src/SubjectPathResolver.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SubjectPathResolver; });
/* harmony import */ var _rdfjs_data_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rdfjs/data-model */ "./node_modules/@rdfjs/data-model/index.js");
/* harmony import */ var _rdfjs_data_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rdfjs_data_model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ComunicaUpdateEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComunicaUpdateEngine */ "./src/ComunicaUpdateEngine.js");


/**
 * LDflex property resolver that returns a new path
 * starting from the property name as a subject.
 *
 * For example, when triggered as
 *     data['http://person.example/#me'].friends.firstName
 * it will create a path with `http://person.example/#me` as subject
 * and then resolve `friends` and `firstName` against the JSON-LD context.
 *
 * In case a source object is given as input, data will be pulled from there.
 */

class SubjectPathResolver {
  constructor(pathFactory, source) {
    this._paths = pathFactory;
    this._source = source;
  }
  /** Resolve all string properties (not Symbols) */


  supports(property) {
    return typeof property === 'string';
  }

  resolve(property) {
    return this._createSubjectPath(Object(_rdfjs_data_model__WEBPACK_IMPORTED_MODULE_0__["namedNode"])(property));
  }

  _createSubjectPath(subject) {
    const queryEngine = new _ComunicaUpdateEngine__WEBPACK_IMPORTED_MODULE_1__["default"](subject, this._source);
    return this._paths.create({
      queryEngine
    }, {
      subject
    });
  }

}

/***/ }),

/***/ "./src/UserPathHandler.js":
/*!********************************!*\
  !*** ./src/UserPathHandler.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserPathHandler; });
/* harmony import */ var _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubjectPathResolver */ "./src/SubjectPathResolver.js");
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! solid-auth-client */ "solid-auth-client");
/* harmony import */ var solid_auth_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(solid_auth_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rdfjs_data_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rdfjs/data-model */ "./node_modules/@rdfjs/data-model/index.js");
/* harmony import */ var _rdfjs_data_model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rdfjs_data_model__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Creates a path with the current user as a subject.
 */

class UserPathHandler extends _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_0__["default"] {
  handle() {
    const subject = this.getWebId().then(_rdfjs_data_model__WEBPACK_IMPORTED_MODULE_2__["namedNode"]);
    return this._createSubjectPath(subject);
  }
  /** Gets the WebID of the logged in user */


  async getWebId() {
    const session = await solid_auth_client__WEBPACK_IMPORTED_MODULE_1___default.a.currentSession();
    if (!session) throw new Error('Cannot resolve user path: no user logged in');
    return session.webId;
  }

}

/***/ }),

/***/ "./src/context.json":
/*!**************************!*\
  !*** ./src/context.json ***!
  \**************************/
/*! exports provided: @context, default */
/***/ (function(module) {

module.exports = {"@context":{"acl":"http://www.w3.org/ns/auth/acl#","app":"http://www.w3.org/ns/solid/app#","as":"https://www.w3.org/ns/activitystreams#","cert":"http://www.w3.org/ns/auth/cert#","dc":"http://purl.org/dc/elements/1.1/","dct":"http://purl.org/dc/terms/","foaf":"http://xmlns.com/foaf/0.1/","ldp":"http://www.w3.org/ns/ldp#","owl":"http://www.w3.org/2002/07/owl#","pim":"http://www.w3.org/ns/pim/space#","rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","schema":"http://schema.org/","sioc":"http://rdfs.org/sioc/ns#","solid":"http://www.w3.org/ns/solid/terms#","stat":"http://www.w3.org/ns/posix/stat#","vcard":"http://www.w3.org/2006/vcard/ns#","xsd":"http://www.w3.org/2001/XMLSchema#","accessControl":"acl:accessControl","accessTo":"acl:accessTo","accessToClass":"acl:accessToClass","agent":"acl:agent","agents":"acl:agent","agentClass":"acl:agentClass","agentClasses":"acl:agentClass","agentGroup":"acl:agentGroup","agentGroups":"acl:agentGroup","defaultAcl":"acl:default","defaultAclForNew":"acl:defaultForNew","delegates":"acl:delegates","mode":"acl:mode","modes":"acl:mode","origin":"acl:origin","origins":"acl:origin","actor":"as:actor","attachment":"as:attachment","attributedTo":"as:attributedTo","author":"as:author","bcc":"as:bcc","bto":"as:bto","cc":"as:cc","inReplyTo":"as:inReplyTo","object":"as:object","publicationDate":"as:published","subject":"as:subject","summary":"as:summary","target":"as:target","to":"as:to","abstract":"dc:abstract","abstracts":"dc:abstract","created":"dc:created","license":"dc:license","modified":"dc:modified","title":"dc:title","titles":"dc:title","account":"foaf:account","accounts":"foaf:account","age":"foaf:age","basedNear":"foaf:based_near","birthday":"foaf:birthday","blog":"foaf:weblog","depiction":"foaf:depiction","depicts":"foaf:depicts","email":"foaf:mbox","familyName":"foaf:familyName","firstName":"foaf:givenName","friend":"foaf:knows","friends":"foaf:knows","gender":"foaf:gender","givenName":"foaf:givenName","homepage":"foaf:homepage","image":"foaf:img","images":"foaf:img","interest":"foaf:topic_interest","interests":"foaf:topic_interest","knows":"foaf:knows","lastName":"foaf:familyName","logo":"foaf:logo","made":"foaf:made","maker":"foaf:maker","member":"foaf:member","name":"foaf:name","nick":"foaf:nick","page":"foaf:page","pages":"foaf:page","primaryTopic":"foaf:primaryTopic","primaryTopicOf":"foaf:primaryTopicOf","publication":"foaf:publications","publications":"foaf:publications","thumbnail":"foaf:thumbnail","thumbnails":"foaf:thumbnail","topic":"foaf:topic","topics":"foaf:topic","inbox":"ldp:inbox","inboxes":"ldp:inbox","storage":"pim:storage","preferences":"pim:preferencesFile","workspace":"pim:workspace","type":"rdf:type","types":"rdf:type","comment":"rdfs:comment","comments":"rdfs:comment","label":"rdfs:label","labels":"rdfs:label","seeAlso":"rdfs:seeAlso","definedBy":"rdfs:isDefinedBy","oidcIssuer":"solid:oidcIssuer","publicTypeIndex":"solid:publicTypeIndex","publicTypeIndexes":"solid:publicTypeIndex","privateTypeIndex":"solid:privateTypeIndex","privateTypeIndexes":"solid:privateTypeIndex"}};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ldflex */ "./node_modules/ldflex/lib/index.js");
/* harmony import */ var ldflex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ldflex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.json */ "./src/context.json");
var _context_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./context.json */ "./src/context.json", 1);
/* harmony import */ var _UserPathHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserPathHandler */ "./src/UserPathHandler.js");
/* harmony import */ var _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubjectPathResolver */ "./src/SubjectPathResolver.js");
/* harmony import */ var _CreateActivityHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CreateActivityHandler */ "./src/CreateActivityHandler.js");
/* harmony import */ var _SourcePathHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SourcePathHandler */ "./src/SourcePathHandler.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const as = _context_json__WEBPACK_IMPORTED_MODULE_1__['@context'].as;
let rootPath; // Creates data paths that start from a given subject

const subjectPathFactory = new ldflex__WEBPACK_IMPORTED_MODULE_0__["PathFactory"]({
  context: _context_json__WEBPACK_IMPORTED_MODULE_1__,
  handlers: _objectSpread({}, ldflex__WEBPACK_IMPORTED_MODULE_0__["defaultHandlers"], {
    // Activities on paths
    like: new _CreateActivityHandler__WEBPACK_IMPORTED_MODULE_4__["default"]({
      type: `${as}Like`
    }),
    dislike: new _CreateActivityHandler__WEBPACK_IMPORTED_MODULE_4__["default"]({
      type: `${as}Dislike`
    }),
    follow: new _CreateActivityHandler__WEBPACK_IMPORTED_MODULE_4__["default"]({
      type: `${as}Follow`
    }),
    // The `root` property restarts the path from the root
    root: () => rootPath
  })
}); // Export the root path that resolves the first property access

/* harmony default export */ __webpack_exports__["default"] = (rootPath = new ldflex__WEBPACK_IMPORTED_MODULE_0__["PathFactory"]({
  // Handlers of specific named properties
  handlers: _objectSpread({}, ldflex__WEBPACK_IMPORTED_MODULE_0__["defaultHandlers"], {
    // The `from` property takes a source URI as input
    from: new _SourcePathHandler__WEBPACK_IMPORTED_MODULE_5__["default"](subjectPathFactory),
    // The `user` property starts a path with the current user as subject
    user: new _UserPathHandler__WEBPACK_IMPORTED_MODULE_2__["default"](subjectPathFactory)
  }),
  // Handlers of all remaining properties
  resolvers: [// `data[url]` starts a path with the property as subject
  new _SubjectPathResolver__WEBPACK_IMPORTED_MODULE_3__["default"](subjectPathFactory)]
}).create());

/***/ }),

/***/ "solid-auth-client":
/*!*********************************!*\
  !*** external ["solid","auth"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = solid["auth"];

/***/ })

/******/ })["default"];
//# sourceMappingURL=solid-query-ldflex.bundle.js.map