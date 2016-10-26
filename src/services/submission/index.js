'use strict';

const service = require('feathers-mongoose');
const submission = require('./submission-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: submission,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/submissions', service(options));

  // Get our initialize service to that we can bind hooks
  const submissionService = app.service('/submissions');

  // Set up our before hooks
  submissionService.before(hooks.before);

  // Set up our after hooks
  submissionService.after(hooks.after);
};
