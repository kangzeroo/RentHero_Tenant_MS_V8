const TenantQueries = require('../Postgres/Queries/TenantQueries')

exports.register_tenant_phone = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const phone_number = info.phone_number
  const national_format = info.national_format
  const country_code = info.country_code
  const email = info.email

  TenantQueries.register_tenant_phone(tenant_id, phone_number, national_format, country_code, email)
    .then((data) => {
      if (data.account_exists) {
        TenantQueries.get_tenant(tenant_id)
          .then((tenantData) => {
            res.json({
              message: data.message,
              tenant: tenantData,
            })
          })
      } else {
        res.json({
          message: data.message,
          tenant: data.tenant,
        })
      }
    })
    .catch((err) => {
      console.log('ERROR In tenant_registration_routes-update_tenant_phone: ', err)
      res.status(500).send(err)
    })
}

exports.register_tenant_email = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const email = info.email

  TenantQueries.register_tenant_email(tenant_id, email)
    .then((data) => {
      if (data.account_exists) {
        TenantQueries.get_tenant(tenant_id)
          .then((tenantData) => {
            res.json({
              message: data.message,
              tenant: tenantData,
            })
          })
      } else {
        res.json({
          message: data.message,
          tenant: data.tenant,
        })
      }
    })
    .catch((err) => {
      console.log('ERROR In tenant_registration_routes-update_tenant_phone: ', err)
      res.status(500).send(err)
    })
}

exports.update_tenant_name = (req, res, next) => {
  const info = req.body
  const tenant_id = info.tenant_id
  const first_name = info.first_name
  const authenticated = info.authenticated

  TenantQueries.upsert_tenant_name(tenant_id, first_name, authenticated)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log('ERROR IN tenant_registration_routes-update_tenant_name')
      res.status(500).send(err)
    })
}
