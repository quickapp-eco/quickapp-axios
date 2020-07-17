const injectRef = Object.getPrototypeOf(global) || global;
injectRef.regeneratorRuntime = require('@babel/runtime/regenerator');