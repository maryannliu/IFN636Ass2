const EventEmitter = require('events');

// Shared emitter instance
const emitter = new EventEmitter();

module.exports = emitter;
