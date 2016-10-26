'use strict';

// src/services/submission/hooks/process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user.email;
    const text = hook.data.text
        .substring(0, 400)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    hook.data = {
      text,
      user,
      isQuestion: true
    }

    hook.process = true;

  };
};
