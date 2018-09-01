const EventEmitter = require('events');

class EmitterHelper extends EventEmitter {}

const myEmitter = new EmitterHelper();
myEmitter.setMaxListeners(0);

module.exports.emitter = myEmitter;