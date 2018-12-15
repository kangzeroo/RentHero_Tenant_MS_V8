const path = require('path')
const pathToTwilioConfig = path.join(__dirname, './', 'credentials', process.env.NODE_ENV, 'twilio_config.json')
const twilio_config = require(pathToTwilioConfig)
const twilio = require('twilio')

exports.generate_twilio_client = () => {
  return new twilio(twilio_config.accountSid, twilio_config.authToken)
}

exports.get_proxy_messaging_service_sid = () => {
  return twilio_config.proxyMessageServiceSid
}
exports.get_numbers_messaging_service_sid = () => {
  return twilio_config.numbersMessageServiceSid
}

exports.get_twiml_app_sid = () => {
  return twilio_config.twilioTwimlAppSid
}

exports.generate_new_capability = () => {
  return new twilio.jwt.ClientCapability({
    accountSid: twilio_config.accountSid,
    authToken: twilio_config.authToken,
  })
}
