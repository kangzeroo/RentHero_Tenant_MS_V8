

exports.voicemail = (response) => {
  const p = new Promise((res, rej) => {
    const voicemail_message = `Sorry I can't come to the phone right now, please leave your name and number and I will get back to you as soon as possible! Thanks!`
    response.say({
      voice: 'man',
      language: 'en',
    }, voicemail_message)
    response.record({
      action: '/voicemail_callback',
      method: 'POST',
      maxLength: 20,
      finishOnKey: '*',
    })
    response.say('I did not receive a recording')
    res(response)
  })
  return p
}
