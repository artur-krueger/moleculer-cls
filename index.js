"use strict";

const context = require('cls-hooked');
const uuid = require('uuid').v4;

const  namespace = context.createNamespace(uuid());

const middleware = (handler) => {
  return async (ctx) => namespace.runAndReturn(() => handler(ctx));
};

const set = (key,  value) => {
  if (namespace && namespace.active) {
    namespace.set(key, value);
  }
};

const get = (key) => {
  if (namespace && namespace.active) {
    return namespace.get(key);
  }
};

const ns = () => {
  return !!(namespace && namespace.active);
};

module.exports = {
  namespace,
  set,
  get,
  ns,
  middleware: {
    name: "CLS",
    localAction: middleware
  }
};