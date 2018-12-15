const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

// GET /test
exports.test = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}

// POST /auth_test
exports.auth_test = function(req, res, next){
  res.json({
    message: "Auth test says alive and well"
  })
}

exports.buy_test = (req, res, next) => {
  require('../api/messaging_service_api').buy_new_number('CA', '647')
    .then((data) => {
      console.log(data)
    })
}

exports.lookup_number = (req, res, next) => {
  require('../api/lookup_api').lookup_number(req.body.number)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Invalid Phone Number!')
    })
}

exports.record_call_test = (req, res, next) => {
  console.log(req.body)
  const To = req.body.To
  // const From = req.body.From

  console.log('To: ', To)
  // console.log('From: ', From)

  const voiceResponse = new VoiceResponse()
  const dial = voiceResponse.dial({
    // action: `/outgoing_dial_callback/operator_id/${req.body.operator_id}`,
    method: 'POST',
    // callerId: '+15195726998',
    record: 'record-from-answer'
  })
  dial.number(To)
  voiceResponse.say({
      voice: 'alice',
      language: 'en-US'
  }, 'Hello, this is Pat from Zolo. This call may be recorded for quality and training purposes');

  res.type('text/xml')
  res.send(voiceResponse.toString())
}
