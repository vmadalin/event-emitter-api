var express = require('express');
var router = express.Router();

const sseHelper = require('../helpers/sse-helper');
const eventHelper = require('../helpers/event-helper');

router.post('/:controllerId', function(req, res) {
    eventHelper.emitter.emit('eventAction', req.params.controllerId, req.body.data);
    res.status(200).json({status:'ok'});
});

router.get('/:controllerId', function(req, res) {
    const sse = sseHelper(res);
    eventHelper.emitter.on('eventAction', (emitterControllerId, emitterData) => {
        if (req.params.controllerId === emitterControllerId) {
            sse.sendEvent('eventAction', function () {
                return emitterData;
            });
        }
    });
});

module.exports = router;
