const LookupAPI = require('../api/lookup_api')

exports.verify_phone = (req, res, next) => {
  const info = req.body
  const phone = info.phone

  LookupAPI.lookup_number(phone)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('ERROR IN phone_routes-verify_phone: ', err)
      res.status(500).send('An Error Ocurred')
    })
}
